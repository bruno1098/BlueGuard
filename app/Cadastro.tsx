import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, TouchableOpacity, TextInput, Switch, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { CadastroStyles as styles } from './styles/CadastroStyles'
import MapModal from './modals/MapModal';
import PublicarModal from './PublicarModal';
import { MapPressEvent } from 'react-native-maps';

const Cadastro: React.FC = () => {
  const [local, setLocal] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [nivelDeSujeira, setNivelDeSujeira] = useState('');
  const [phDaAgua, setPhDaAgua] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [potavel, setPotavel] = useState(false);
  const [observacoes, setObservacoes] = useState('');
  const [imagemLocal, setImagemLocal] = useState<string | null>(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [user, setUser] = useState({ nome: '', email: '' });
  const [publicarModalVisible, setPublicarModalVisible] = useState(false);
  const [localCadastrado, setLocalCadastrado] = useState<any | null>(null);

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

  const handleCadastro = () => {
    if (!local || latitude === null || longitude === null) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const timestamp = Date.now();

    const novoLocal = {
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
      timestamp: timestamp,
    };

    axios.post('https://experienceia-default-rtdb.firebaseio.com/locais.json', novoLocal)
      .then((response) => {
        setLocalCadastrado({ id: response.data.name, ...novoLocal });
        setPublicarModalVisible(true);
        resetForm();
      })
      .catch(error => {
        console.error("Error posting data: ", error);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o local.');
      });
  };

  const resetForm = () => {
    setLocal('');
    setLatitude(null);
    setLongitude(null);
    setNivelDeSujeira('');
    setPhDaAgua('');
    setTemperatura('');
    setPotavel(false);
    setObservacoes('');
    setImagemLocal(null);
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

  const handlePublicar = async (publicar: boolean) => {
    setPublicarModalVisible(false);
    if (publicar && localCadastrado) {
      try {
        await axios.patch(
          `https://experienceia-default-rtdb.firebaseio.com/locais/${localCadastrado.id}.json`,
          { publicado: true }
        );
        Alert.alert('Sucesso', 'Local publicado na comunidade!');
      } catch (error) {
        console.error("Erro ao publicar na comunidade: ", error);
        Alert.alert('Erro', 'Ocorreu um erro ao publicar na comunidade.');
      }
    } else {
      Alert.alert('Sucesso', 'Local cadastrado com sucesso!');
    }
    navigation.goBack();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <ThemedText style={styles.headerText}>Cadastro</ThemedText>
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
            onPress={handleCadastro}
          >
            <ThemedText style={styles.submitButtonText}>Cadastrar</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <MapModal
          visible={mapVisible}
          onClose={() => setMapVisible(false)}
          onMapPress={handleMapPress}
          latitude={latitude}
          longitude={longitude}
        />

        <PublicarModal
          visible={publicarModalVisible}
          onClose={handlePublicar}
          backgroundColor={backgroundColor}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default Cadastro;
