import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Keyboard, Alert, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { useFocusEffect, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, Provider } from 'react-native-paper';
import { MapaStyles as styles } from '../styles/MapaStyles';
import LocationModal from '../modals/LocationModals';
import { ColorSchemeName, useColorScheme } from 'react-native';  // Importe ColorSchemeName aqui

interface Location {
  id: string;
  local: string;
  latitude: number;
  longitude: number;
  nivel_de_sujeira: string;
  ph_da_agua: number;
  temperatura: number;
  potavel: boolean;
  observacoes: string;
  cadastradoPor: string;
  publicado: boolean;
}

const Mapa: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<Location[]>([]);
  const [filteredData, setFilteredData] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [user, setUser] = useState({ nome: '', email: '' });
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const mapRef = useRef<MapView | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const router = useRouter();
  const colorScheme: ColorSchemeName = useColorScheme();  

  useEffect(() => {
    const obterUsuario = async () => {
      try {
        const usuario = await AsyncStorage.getItem('usuario');
        if (usuario) {
          setUser(JSON.parse(usuario));
        }
      } catch (error) {
        console.error("Erro ao obter os dados do usuário:", error);
      }
    };
    obterUsuario();
  }, []);

  const fetchLocations = useCallback(() => {
    axios.get('https://experienceia-default-rtdb.firebaseio.com/locais.json')
      .then(response => {
        const fetchedData = response.data;
        const formattedData = Object.keys(fetchedData).map(key => ({
          id: key,
          ...fetchedData[key],
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchLocations();
    }, [fetchLocations])
  );

  useEffect(() => {
    if (searchQuery) {
      const normalizedQuery = searchQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const results = data.filter(location => {
        const normalizedLocal = location.local.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return normalizedLocal.includes(normalizedQuery);
      });
      setFilteredData(results);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  useEffect(() => {
    if (selectedLocation) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedLocation]);

  const handleSelectLocation = (location: Location) => {
    setSearchQuery(location.local); 
    setFilteredData([]); 
    Keyboard.dismiss();
    mapRef.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09,
    }, 3000);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredData(data);
  };

  const handleCloseModal = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSelectedLocation(null));
  };

  const handleResetZoom = () => {
    mapRef.current?.animateToRegion({
      latitude: -10.333333, 
      longitude: -50.2, 
      latitudeDelta: 100, 
      longitudeDelta: 100, 
    }, 1000);
  };

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const navigateToCadastro = () => {
    closeMenu();
    router.push('../Cadastro'); 
  };
  const navigateToPerfil = () => {
    closeMenu();
    router.push('../Perfil'); 
  };

  const handleDelete = () => {
    if (selectedLocation) {
      Alert.alert(
        "Confirmação de Exclusão",
        "Você tem certeza que deseja excluir este local?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Excluir",
            onPress: () => {
              axios.delete(`https://experienceia-default-rtdb.firebaseio.com/locais/${selectedLocation.id}.json`)
                .then(() => {
                  fetchLocations();
                  handleCloseModal();
                })
                .catch(error => {
                  console.error("Erro ao excluir o local: ", error);
                });
            },
            style: "destructive"
          }
        ]
      );
    }
  };

  const handleEdit = () => {
    if (selectedLocation) {
      const locationData = JSON.stringify(selectedLocation);
      router.push({
        pathname: '../EditarLocal',
        params: { location: locationData },
      });
      handleCloseModal();
    }
  };
  
  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
                <Icon name="ellipsis-vertical" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={navigateToPerfil} title="Perfil" />
            <Menu.Item onPress={navigateToCadastro} title="Cadastro" />
          </Menu>
        </View>

        <TouchableOpacity onPress={handleResetZoom} style={styles.titleContainer}>
          <Text style={[styles.title, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Mapas </Text>
        </TouchableOpacity>
        <View style={[styles.searchBarContainer, { backgroundColor: colorScheme === 'dark' ? 'rgba(51, 51, 51, 0.7)' : 'rgba(240, 240, 240, 0.7)' }]}>
          <TextInput
            style={[
              styles.searchBar,
              {
                color: colorScheme === 'dark' ? 'white' : 'black',
              },
            ]}
            placeholder="Pesquise por alguma praia, rio ou represa..."
            placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'darkgray'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => {
              if (filteredData.length > 0) {
                handleSelectLocation(filteredData[0]);
              }
            }}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <Icon name="close-circle" size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
          ) : null}
        </View>
        {searchQuery && filteredData.length > 0 ? (
          <FlatList
            style={[styles.suggestions, { backgroundColor: colorScheme === 'dark' ? '#333' : 'white' }]}
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectLocation(item)}>
                <Text style={[styles.suggestionItem, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{item.local}</Text>
              </TouchableOpacity>
            )}
          />
        ) : null}
        <MapView
          style={styles.map}
          ref={mapRef}
        >
          {filteredData.map((location) => (
            <Marker
              key={location.id}
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={location.local}
              pinColor={location.cadastradoPor === user.nome ? 'blue' : 'red'}
              onPress={() => setSelectedLocation(location)}
            />
          ))}
        </MapView>
        <Modal
          visible={!!selectedLocation}
          transparent={true}
          animationType="none"
          onRequestClose={handleCloseModal}
        >
          <LocationModal
            selectedLocation={selectedLocation}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleCloseModal={handleCloseModal}
            scaleAnim={scaleAnim}
            colorScheme={colorScheme}
            user={user}
          />
        </Modal>
      </View>
    </Provider>
  );
};

export default Mapa;
