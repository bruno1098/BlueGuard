import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Toast, NativeBaseProvider, Button, Center } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useRouter } from 'expo-router';

interface Usuario {
  nome: string;
  idade: string;
  email: string;
  senha: string;
  fotoPerfil?: string;
}

const Perfil: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [idade, setIdade] = useState<string>('');
  const [fotoPerfil, setFotoPerfil] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [senhaAntiga, setSenhaAntiga] = useState<string>('');
  const [senhaNova, setSenhaNova] = useState<string>('');

  const corTexto = useThemeColor({}, 'text');
  const router = useRouter();

  useEffect(() => {
    const obterUsuario = async () => {
      try {
        const usuarioJson = await AsyncStorage.getItem('usuario');
        if (usuarioJson) {
          const user = JSON.parse(usuarioJson);
          setUsuario(user);
          setNome(user.nome);
          setEmail(user.email);
          setIdade(user.idade);
          setFotoPerfil(user.fotoPerfil);
        }
      } catch (error) {
        console.error("Erro ao obter os dados do usuário:", error);
      }
    };
    obterUsuario();
  }, []);

  const escolherFoto = async () => {
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
      const selectedAsset = result.assets[0];
      setFotoPerfil(selectedAsset.uri);
      if (usuario) {
        atualizarFotoPerfil(selectedAsset.uri);
      }
    }
  };

  const atualizarFotoPerfil = async (imageUri: string) => {
    if (!usuario) return;

    try {
      const response = await axios.get('https://experienceia-default-rtdb.firebaseio.com/Usuarios.json');
      const users = response.data;
      const userKey = Object.keys(users).find(key => users[key].email === usuario.email);

      if (userKey) {
        await axios.patch(
          `https://experienceia-default-rtdb.firebaseio.com/Usuarios/${userKey}.json`,
          { fotoPerfil: imageUri },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        Toast.show({
          description: 'Foto de perfil atualizada com sucesso!',
          duration: 2000,
        });

        const usuarioAtualizado = { ...usuario, fotoPerfil: imageUri };
        setUsuario(usuarioAtualizado);
        await AsyncStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
      } else {
        throw new Error('Usuário não encontrado.');
      }
    } catch (error) {
      console.error("Erro ao atualizar a foto de perfil:", error);
      Toast.show({
        description: 'Erro ao atualizar foto de perfil. Tente novamente.',
        duration: 2000,
      });
    }
  };

  const handleChangePassword = async () => {
    if (!usuario) return;

    if (senhaAntiga === '' || senhaNova === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.get('https://experienceia-default-rtdb.firebaseio.com/Usuarios.json');
      const users = response.data;
      const userKey = Object.keys(users).find(key => users[key].email === usuario.email && users[key].senha === senhaAntiga);

      if (userKey) {
        await axios.patch(
          `https://experienceia-default-rtdb.firebaseio.com/Usuarios/${userKey}.json`,
          { senha: senhaNova }
        );
        Toast.show({
          description: 'Senha atualizada com sucesso!',
          duration: 2000,
        });
        setModalVisible(false);
        setSenhaAntiga('');
        setSenhaNova('');
      } else {
        Alert.alert('Erro', 'Senha antiga incorreta.');
      }
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
      Toast.show({
        description: 'Erro ao atualizar a senha. Tente novamente.',
        duration: 2000,
      });
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuario');
    setLogoutModalVisible(false); // Fecha o modal antes de navegar
    router.push('/');
  };

  return (
    <NativeBaseProvider>
      <ThemedView style={estilos.container}>
        <View style={estilos.header}>
          <TouchableOpacity onPress={() => router.back()} style={estilos.backButton}>
            <Icon name="arrow-back" size={24} color={corTexto} />
          </TouchableOpacity>
          <ThemedText style={estilos.headerText}>Perfil</ThemedText>
        </View>
        <ScrollView contentContainerStyle={estilos.scrollViewContent}>
          <TouchableOpacity style={estilos.avatarContainer} onPress={escolherFoto}>
            {fotoPerfil ? (
              <Image source={{ uri: fotoPerfil }} style={estilos.avatar} />
            ) : (
              <View style={estilos.avatarPlaceholder}>
                <MaterialIcons name="person" size={100} color={corTexto} />
                <MaterialIcons name="add" size={24} color={corTexto} style={estilos.addIcon} />
              </View>
            )}
          </TouchableOpacity>
          <View style={estilos.formContainer}>
            <ThemedText style={estilos.rotulo}>Nome</ThemedText>
            <TextInput
              style={[estilos.entrada, { color: corTexto }]}
              editable={false}
              value={nome}
            />
            <ThemedText style={estilos.rotulo}>Email</ThemedText>
            <TextInput
              style={[estilos.entrada, { color: corTexto }]}
              editable={false}
              value={email}
              keyboardType="email-address"
            />
            <ThemedText style={estilos.rotulo}>Idade</ThemedText>
            <TextInput
              style={[estilos.entrada, { color: corTexto }]}
              editable={false}
              value={idade}
              keyboardType="numeric"
            />
            <TouchableOpacity style={estilos.forgotPasswordButton} onPress={() => setModalVisible(true)}>
              <ThemedText style={estilos.forgotPasswordText}>Atualizar senha</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.logoutButton} onPress={() => setLogoutModalVisible(true)}>
              <ThemedText style={estilos.logoutText}>Logoff</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={estilos.modalContainer}>
            <View style={[estilos.modalContent, { backgroundColor: useThemeColor({}, 'background') }]}>
              <ThemedText style={estilos.modalTitle}>Alterar Senha</ThemedText>
              <ThemedText style={estilos.rotulo}>Senha Antiga</ThemedText>
              <TextInput
                style={[estilos.entrada, { color: corTexto }]}
                secureTextEntry
                value={senhaAntiga}
                onChangeText={setSenhaAntiga}
              />
              <ThemedText style={estilos.rotulo}>Senha Nova</ThemedText>
              <TextInput
                style={[estilos.entrada, { color: corTexto }]}
                secureTextEntry
                value={senhaNova}
                onChangeText={setSenhaNova}
              />
              <Button style={estilos.submitButton} onPress={handleChangePassword}>
                <ThemedText style={estilos.submitButtonText}>Atualizar Senha</ThemedText>
              </Button>
              <Button style={estilos.cancelButton} onPress={() => setModalVisible(false)} colorScheme="coolGray">
                <ThemedText style={estilos.cancelButtonText}>Cancelar</ThemedText>
              </Button>
            </View>
          </View>
        </Modal>
        <Modal
          visible={logoutModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setLogoutModalVisible(false)}
        >
          <View style={estilos.modalContainer}>
            <View style={[estilos.modalContent, { backgroundColor: useThemeColor({}, 'background') }]}>
              <ThemedText style={estilos.modalTitle}>Confirmar Logoff</ThemedText>
              <ThemedText style={estilos.rotulo}>Você tem certeza que quer sair?</ThemedText>
              <Button style={estilos.submitButton} onPress={handleLogout} colorScheme="danger">
                <ThemedText style={estilos.submitButtonText}>Sim</ThemedText>
              </Button>
              <Button style={estilos.cancelButton} onPress={() => setLogoutModalVisible(false)} colorScheme="coolGray">
                <ThemedText style={estilos.cancelButtonText}>Não</ThemedText>
              </Button>
            </View>
          </View>
        </Modal>
      </ThemedView>
    </NativeBaseProvider>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  scrollViewContent: {
    paddingTop: 80,
    alignItems: 'center',
    width: '100%',
  },
  avatarContainer: {
    marginBottom: 20,
    borderRadius: 50,
    overflow: 'hidden',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#ccc',
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  formContainer: {
    width: '90%',
  },
  rotulo: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  entrada: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 16,
  },
  forgotPasswordButton: {
    marginTop: 20,
    alignSelf: "center"
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    alignSelf: "center"
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Add shadow for iOS
    shadowOpacity: 0.25, // Add shadow for iOS
    shadowRadius: 3.84, // Add shadow for iOS
    backgroundColor: '#fff',
    transform: [{ scale: 0.9 }],
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Perfil;




// const estilos = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     position: 'absolute',
//     top: 30,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 16,
//   },
//   scrollViewContent: {
//     paddingTop: 80,
//     alignItems: 'center',
//     width: '100%',
//   },
//   avatarContainer: {
//     marginBottom: 20,
//     borderRadius: 50,
//     overflow: 'hidden',
//     width: 100,
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//   },
//   avatarPlaceholder: {
//     width: 100,
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderRadius: 50,
//     borderColor: '#ccc',
//   },
//   addIcon: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//   },
//   formContainer: {
//     width: '90%',
//   },
//   rotulo: {
//     alignSelf: 'flex-start',
//     marginBottom: 8,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   entrada: {
//     width: 300,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 16,
//   },
//   forgotPasswordButton: {
//     marginTop: 20,
//     alignSelf: "center"
//   },
//   forgotPasswordText: {
//     color: '#007AFF',
//     fontWeight: 'bold',
//   },
//   logoutButton: {
//     marginTop: 20,
//     alignSelf: "center"
//   },
//   logoutText: {
//     color: '#FF3B30',
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '90%',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   submitButton: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#007AFF',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   cancelButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: 'gray',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

