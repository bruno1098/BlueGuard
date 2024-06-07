import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image, ScrollView, Modal, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeBaseProvider, Button, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { perfilStyles as styles } from './styles/PerfilStyles';
import ChangePasswordModal from './modals/ChangePasswordModal';
import LogoutModal from './modals/LogoutModal';

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
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={corTexto} />
          </TouchableOpacity>
          <ThemedText style={styles.headerText}>Perfil</ThemedText>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity style={styles.avatarContainer} onPress={escolherFoto}>
            {fotoPerfil ? (
              <Image source={{ uri: fotoPerfil }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <MaterialIcons name="person" size={100} color={corTexto} />
                <MaterialIcons name="add" size={24} color={corTexto} style={styles.addIcon} />
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.formContainer}>
            <ThemedText style={styles.rotulo}>Nome</ThemedText>
            <TextInput
              style={[styles.entrada, { color: corTexto }]}
              editable={false}
              value={nome}
            />
            <ThemedText style={styles.rotulo}>Email</ThemedText>
            <TextInput
              style={[styles.entrada, { color: corTexto }]}
              editable={false}
              value={email}
              keyboardType="email-address"
            />
            <ThemedText style={styles.rotulo}>Idade</ThemedText>
            <TextInput
              style={[styles.entrada, { color: corTexto }]}
              editable={false}
              value={idade}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => setModalVisible(true)}>
              <ThemedText style={styles.forgotPasswordText}>Atualizar senha</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutModalVisible(true)}>
              <ThemedText style={styles.logoutText}>Logoff</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ChangePasswordModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          senhaAntiga={senhaAntiga}
          senhaNova={senhaNova}
          setSenhaAntiga={setSenhaAntiga}
          setSenhaNova={setSenhaNova}
          handleChangePassword={handleChangePassword}
        />
        <LogoutModal
          visible={logoutModalVisible}
          onClose={() => setLogoutModalVisible(false)}
          handleLogout={handleLogout}
        />
      </ThemedView>
    </NativeBaseProvider>
  );
};

export default Perfil;
