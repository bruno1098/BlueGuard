import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, Modal, ScrollView, Button, Animated, Keyboard, useColorScheme } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { useFocusEffect, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, Provider } from 'react-native-paper';

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
  const colorScheme = useColorScheme();

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
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }], backgroundColor: colorScheme === 'dark' ? '#333' : 'white' }]}>
              <ScrollView contentContainerStyle={styles.modalContentInner}>
                {selectedLocation && (
                  <>
                    <Text style={[styles.modalTitle, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{selectedLocation.local}</Text>
                    <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Nível de sujeira: {selectedLocation.nivel_de_sujeira}</Text>
                    <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>pH da água: {selectedLocation.ph_da_agua}</Text>
                    <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Temperatura: {selectedLocation.temperatura}°C</Text>
                    <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Potável: {selectedLocation.potavel ? 'Sim' : 'Não'}</Text>
                    <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Observações: {selectedLocation.observacoes}</Text>
                    <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black', fontSize: 12 }]}>Cadastrado por: {selectedLocation.cadastradoPor || 'Sistema'}</Text>
                    <Button title="Fechar" onPress={handleCloseModal} />
                  </>
                )}
              </ScrollView>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 80, 
    left: 10,
    right: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
  },
  clearButton: {
    marginLeft: 10,
  },
  suggestions: {
    position: 'absolute',
    top: 130, 
    left: 10,
    right: 10,
    backgroundColor: 'white',
    zIndex: 1,
    borderRadius: 5,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalContentInner: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 2,
  },
  menuButton: {
    padding: 10,
  },
});

export default Mapa;
