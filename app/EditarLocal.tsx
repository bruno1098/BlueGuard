import React, { useState, useEffect } from 'react';
import { View, Alert, Modal, ScrollView, TouchableOpacity, TextInput, Switch, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { editarLocalStyles as styles } from './styles/editarLocalStyles';

const EditarLocal: React.FC = () => {
  const route = useRoute();
  const { location } = route.params as any;
  const parsedLocation = JSON.parse(location);

  const [local, setLocal] = useState(parsedLocation.local || '');
  const [latitude, setLatitude] = useState<number | null>(parsedLocation.latitude || null);
  const [longitude, setLongitude] = useState<number | null>(parsedLocation.longitude || null);
  const [nivelDeSujeira, setNivelDeSujeira] = useState(parsedLocation.nivel_de_sujeira || '');
  const [phDaAgua, setPhDaAgua] = useState(parsedLocation.ph_da_agua?.toString() || '');
  const [temperatura, setTemperatura] = useState(parsedLocation.temperatura?.toString() || '');
  const [potavel, setPotavel] = useState(parsedLocation.potavel || false);
  const [observacoes, setObservacoes] = useState(parsedLocation.observacoes || '');
  const [imagemLocal, setImagemLocal] = useState<string | null>(parsedLocation.imagemLocal || null);
  const [mapVisible, setMapVisible] = useState(false);
  const [user, setUser] = useState({ nome: '', email: '' });

  const navigation = useNavigation();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'tabIconDefault');
  const primaryColor = useThemeColor({}, 'tint');

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

  const handleEditar = () => {
    if (!local || latitude === null || longitude === null) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const updatedLocal = {
      local,
      latitude,
      longitude,
      nivel_de_sujeira: nivelDeSujeira,
      ph_da_agua: parseFloat(phDaAgua),
      temperatura: parseFloat(temperatura),
      potavel,
      observacoes,
      imagemLocal,
      cadastradoPor: user.nome || 'Sistema',
      publicado: parsedLocation.publicado || true,
      timestamp: parsedLocation.timestamp || new Date().toISOString(),
      editadoEm: new Date().toISOString(),
    };

    axios.put(`https://experienceia-default-rtdb.firebaseio.com/locais/${parsedLocation.id}.json`, updatedLocal)
      .then(() => {
        Alert.alert('Sucesso', 'Local atualizado com sucesso!');
        navigation.goBack();
      })
      .catch(error => {
        console.error("Error updating data: ", error);
        Alert.alert('Erro', 'Ocorreu um erro ao atualizar o local.');
      });
  };

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
    setMapVisible(false);
  };

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão para acessar suas fotos!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImagemLocal(result.assets[0].uri);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <ThemedText style={styles.headerText}>Editar Local</ThemedText>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedView style={[styles.card, { backgroundColor }]}>
          <ThemedText style={styles.label}>Local</ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
            value={local}
            onChangeText={setLocal}
            placeholder="Nome do local"
            placeholderTextColor={placeholderColor}
          />
          <TouchableOpacity
            style={[styles.mapButton, { backgroundColor: '#007AFF' }]}
            onPress={() => setMapVisible(true)}
          >
            <Icon name="map" size={20} color="#fff" />
            <ThemedText style={styles.mapButtonText}>Selecionar Local no Mapa</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.label}>Latitude</ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
            value={latitude ? latitude.toString() : ''}
            editable={false}
            placeholder="Selecione no mapa"
            placeholderTextColor={placeholderColor}
          />
          <ThemedText style={styles.label}>Longitude</ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
            value={longitude ? longitude.toString() : ''}
            editable={false}
            placeholder="Selecione no mapa"
            placeholderTextColor={placeholderColor}
          />
          <ThemedText style={styles.label}>Nível de sujeira</ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
            value={nivelDeSujeira}
            onChangeText={setNivelDeSujeira}
            placeholder="Nível de sujeira"
            placeholderTextColor={placeholderColor}
          />
          <ThemedText style={styles.label}>pH da água</ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
            value={phDaAgua}
            onChangeText={setPhDaAgua}
            placeholder="pH da água"
            keyboardType="numeric"
            placeholderTextColor={placeholderColor}
          />
          <ThemedText style={styles.label}>Temperatura</ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
            value={temperatura}
            onChangeText={setTemperatura}
            placeholder="Temperatura"
            keyboardType="numeric"
            placeholderTextColor={placeholderColor}
          />
          <View style={styles.switchContainer}>
            <ThemedText style={styles.label}>Potável</ThemedText>
            <Switch value={potavel} onValueChange={setPotavel} />
          </View>
          <ThemedText style={styles.label}>Observações</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea, { color: textColor, borderColor: placeholderColor }]}
            value={observacoes}
            onChangeText={setObservacoes}
            placeholder="Observações"
            multiline
            placeholderTextColor={placeholderColor}
          />
          <TouchableOpacity style={[styles.imageButton, { backgroundColor: '#007AFF' }]} onPress={escolherImagem}>
            <Icon name="image" size={20} color="#fff" />
            <ThemedText style={styles.imageButtonText}>Selecionar Imagem do Local</ThemedText>
          </TouchableOpacity>
          {imagemLocal && (
            <Image source={{ uri: imagemLocal }} style={styles.localImage} />
          )}
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: '#007AFF' }]}
            onPress={handleEditar}
          >
            <ThemedText style={styles.submitButtonText}>Atualizar</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <Modal visible={mapVisible} transparent={true} animationType="slide">
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              onPress={handleMapPress}
            >
              {latitude && longitude && (
                <Marker coordinate={{ latitude, longitude }} />
              )}
            </MapView>
            <TouchableOpacity onPress={() => setMapVisible(false)} style={[styles.closeButton, { backgroundColor: primaryColor }]}>
              <ThemedText style={styles.closeButtonText}>Fechar</ThemedText>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </ThemedView>
  );
};

export default EditarLocal;
