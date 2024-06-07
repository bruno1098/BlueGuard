import React, { useState, useEffect } from 'react';
import { TextInput, Button, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Toast, NativeBaseProvider } from 'native-base';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withRepeat, runOnJS } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginStyles as styles } from '../styles/LoginStyles';

interface Usuario {
  nome: string;
  idade: string;
  email: string;
  senha: string;
}

const TelaLogin: React.FC = () => {
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginSenha, setLoginSenha] = useState<string>('');
  const [loginStatus, setLoginStatus] = useState<'default' | 'success' | 'error'>('default');
  const [senhaVisivel, setSenhaVisivel] = useState<boolean>(false);

  const [registroNome, setRegistroNome] = useState<string>('');
  const [registroIdade, setRegistroIdade] = useState<string>('');
  const [registroEmail, setRegistroEmail] = useState<string>('');
  const [registroSenha, setRegistroSenha] = useState<string>('');
  const [registroStatus, setRegistroStatus] = useState<'default' | 'success' | 'error'>('default');

  const [resetEmail, setResetEmail] = useState<string>('');
  const [novaSenha, setNovaSenha] = useState<string>('');
  const [resetStatus, setResetStatus] = useState<'default' | 'success' | 'error'>('default');

  const [mostrarRegistro, setMostrarRegistro] = useState<boolean>(false);
  const [mostrarReset, setMostrarReset] = useState<boolean>(false);

  const rotacao = useSharedValue(0);
  const escalaLogo = useSharedValue(1);

  useEffect(() => {
    escalaLogo.value = withRepeat(
      withTiming(1.2, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: escalaLogo.value }],
    };
  });

  const validarEmail = (email: string) => {
    return email.match(/\S+@\S+\.\S+/);
  };

  const estaVazio = (valor: string) => {
    return valor.trim() === '';
  };

  const mostrarToast = (mensagem: string, tipo: 'success' | 'error') => {
    Toast.show({
      description: mensagem,
      duration: 2000,
    });
  };

  const armazenarUsuario = async (usuario: Usuario) => {
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
    } catch (error) {
      console.error("Erro ao armazenar os dados do usuário:", error);
    }
  };

  const lidarComLogin = async () => {
    if (estaVazio(loginEmail) || estaVazio(loginSenha)) {
      setLoginStatus('error');
      mostrarToast('Preencha todos os campos.', 'error');
      setTimeout(() => setLoginStatus('default'), 2000);
      return;
    }

    if (!validarEmail(loginEmail)) {
      setLoginStatus('error');
      mostrarToast('Email inválido.', 'error');
      setTimeout(() => setLoginStatus('default'), 2000);
      return;
    }

    try {
      const resposta = await fetch(`https://experienceia-default-rtdb.firebaseio.com/Usuarios.json`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const dados: { [key: string]: Usuario } = await resposta.json(); 
      const usuario = Object.values(dados).find((user: Usuario) => user.email === loginEmail && user.senha === loginSenha);

      if (!usuario) throw new Error('Email ou senha incorretos.');

      setLoginStatus('success');
      mostrarToast('Login bem-sucedido!', 'success');

      armazenarUsuario(usuario);

      router.push('/(logtabs)/Mapa');
    } catch (erro) {
      console.error("Erro ao tentar fazer login:", erro);
      setLoginStatus('error');
      mostrarToast('Erro ao fazer login. Verifique suas credenciais.', 'error');
      setTimeout(() => setLoginStatus('default'), 2000);
    }
  };

  const lidarComRegistro = async () => {
    if (estaVazio(registroNome) || estaVazio(registroIdade) || estaVazio(registroEmail) || estaVazio(registroSenha)) {
      setRegistroStatus('error');
      mostrarToast('Preencha todos os campos.', 'error');
      setTimeout(() => setRegistroStatus('default'), 2000);
      return;
    }

    if (!validarEmail(registroEmail)) {
      setRegistroStatus('error');
      mostrarToast('Email inválido.', 'error');
      setTimeout(() => setRegistroStatus('default'), 2000);
      return;
    }

    try {
      const resposta = await fetch('https://experienceia-default-rtdb.firebaseio.com/Usuarios.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: registroNome, idade: registroIdade, email: registroEmail, senha: registroSenha }),
      });

      if (!resposta.ok) throw new Error('Falha no cadastro.');

      setRegistroStatus('success');
      mostrarToast('Registro bem-sucedido!', 'success');
      setTimeout(() => setRegistroStatus('default'), 2000);
      limparCamposRegistro();
      retornarParaLogin();
    } catch (erro) {
      console.error("Erro ao tentar registrar:", erro);
      setRegistroStatus('error');
      mostrarToast('Erro ao tentar registrar. Tente novamente.', 'error');
      setTimeout(() => setRegistroStatus('default'), 2000);
    }
  };

  const lidarComReset = async () => {
    if (estaVazio(resetEmail) || estaVazio(novaSenha)) {
      setResetStatus('error');
      mostrarToast('Preencha todos os campos.', 'error');
      setTimeout(() => setResetStatus('default'), 2000);
      return;
    }

    if (!validarEmail(resetEmail)) {
      setResetStatus('error');
      mostrarToast('Email inválido.', 'error');
      setTimeout(() => setResetStatus('default'), 2000);
      return;
    }

    try {
      const resposta = await fetch(`https://experienceia-default-rtdb.firebaseio.com/Usuarios.json`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const dados: { [key: string]: Usuario } = await resposta.json();
      const chaveUsuario = Object.keys(dados).find((key) => dados[key].email === resetEmail);

      if (!chaveUsuario) throw new Error('Email não encontrado.');

      const respostaPatch = await fetch(`https://experienceia-default-rtdb.firebaseio.com/Usuarios/${chaveUsuario}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha: novaSenha }),
      });

      if (!respostaPatch.ok) throw new Error('Falha ao atualizar a senha.');

      setResetStatus('success');
      mostrarToast('Senha atualizada com sucesso!', 'success');
      setTimeout(() => setResetStatus('default'), 2000);
      limparCamposReset();
      retornarParaLogin();
    } catch (erro) {
      console.error("Erro ao tentar redefinir a senha:", erro);
      setResetStatus('error');
      mostrarToast('Erro ao tentar redefinir a senha. Tente novamente.', 'error');
      setTimeout(() => setResetStatus('default'), 2000);
    }
  };

  const limparCamposRegistro = () => {
    setRegistroNome('');
    setRegistroIdade('');
    setRegistroEmail('');
    setRegistroSenha('');
  };

  const limparCamposReset = () => {
    setResetEmail('');
    setNovaSenha('');
  };

  const retornarParaLogin = () => {
    rotacao.value = withTiming(rotacao.value + 180, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    }, (finished) => {
      if (finished) {
        runOnJS(setMostrarRegistro)(false);
        runOnJS(setMostrarReset)(false);
        rotacao.value = rotacao.value % 360;
      }
    });
  };

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotacao.value}deg` }],
      opacity: rotacao.value < 90 || rotacao.value >= 270 ? 1 : 0,
      zIndex: rotacao.value < 90 || rotacao.value >= 270 ? 1 : 0,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotacao.value + 180}deg` }],
      opacity: rotacao.value >= 90 && rotacao.value < 270 ? 1 : 0,
      zIndex: rotacao.value >= 90 && rotacao.value < 270 ? 1 : 0,
    };
  });

  const alternarFormulario = () => {
    rotacao.value = withTiming(rotacao.value + 180, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    }, (finished) => {
      if (finished) {
        if (mostrarReset) {
          runOnJS(setMostrarReset)(false);
          runOnJS(setMostrarRegistro)(false);
        } else if (mostrarRegistro) {
          runOnJS(setMostrarRegistro)(false);
        } else {
          runOnJS(setMostrarRegistro)(true);
        }
        rotacao.value = rotacao.value % 360;
      }
    });
  };

  const mostrarFormularioReset = () => {
    rotacao.value = withTiming(rotacao.value + 180, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    }, (finished) => {
      if (finished) {
        runOnJS(setMostrarReset)(true);
        runOnJS(setMostrarRegistro)(false);
        rotacao.value = rotacao.value % 360;
      }
    });
  };

  const corTexto = useThemeColor({}, 'text');

  return (
    <NativeBaseProvider>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#007BFF', dark: '#004C99' }}
        headerImage={
          <ThemedView style={styles.cabecalho}>
            <Animated.Image
              source={require('@/assets/images/logo.png')}
              style={[styles.logo, logoStyle]}
            />
            <ThemedText style={styles.titulo}>BlueGuard</ThemedText>
          </ThemedView>
        }
      >
        <View style={styles.containerCentralizado}>
          <View style={styles.perspectiveContainer}>
            <Animated.View style={[styles.formContainer, frontStyle]}>
              <ThemedView style={styles.formularioContainer}>
                <ThemedText style={styles.rotulo}>Email</ThemedText>
                <TextInput
                  style={[styles.entrada, { color: corTexto }]}
                  placeholder="Digite seu email"
                  placeholderTextColor={corTexto}
                  onChangeText={setLoginEmail}
                  keyboardType="email-address"
                  value={loginEmail}
                />
                <ThemedText style={styles.rotulo}>Senha</ThemedText>
                <ThemedView style={styles.containerSenha}>
                  <TextInput
                    style={[styles.entradaSenha, { color: corTexto }]}
                    placeholder="Digite sua senha"
                    placeholderTextColor={corTexto}
                    secureTextEntry={!senhaVisivel}
                    onChangeText={setLoginSenha}
                    value={loginSenha}
                  />
                  <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
                    <MaterialIcons name={senhaVisivel ? 'visibility' : 'visibility-off'} size={24} color="gray" />
                  </TouchableOpacity>
                </ThemedView>
                <Button title={loginStatus === 'success' ? '✔' : loginStatus === 'error' ? '✘' : 'Login'} onPress={lidarComLogin} color={loginStatus === 'success' ? 'green' : loginStatus === 'error' ? 'red' : corTexto} />
                <TouchableOpacity onPress={alternarFormulario} style={styles.botaoRegistrar}>
                  <ThemedText style={styles.textoRegistrar}>Clique aqui para criar sua conta</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={mostrarFormularioReset} style={styles.botaoRegistrar}>
                  <ThemedText style={styles.textoEsquecer}>Esqueceu sua senha?</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </Animated.View>
            <Animated.View style={[styles.formContainer, backStyle]}>
              {mostrarRegistro ? (
                <ThemedView style={styles.formularioContainer}>
                  <ThemedText style={styles.rotulo}>Nome</ThemedText>
                  <TextInput
                    style={[styles.entrada, { color: corTexto }]}
                    placeholder="Digite seu nome"
                    placeholderTextColor={corTexto}
                    onChangeText={setRegistroNome}
                    value={registroNome}
                  />
                  <ThemedText style={styles.rotulo}>Idade</ThemedText>
                  <TextInput
                    style={[styles.entrada, { color: corTexto }]}
                    placeholder="Digite sua idade"
                    placeholderTextColor={corTexto}
                    onChangeText={setRegistroIdade}
                    keyboardType="numeric"
                    value={registroIdade}
                  />
                  <ThemedText style={styles.rotulo}>Email</ThemedText>
                  <TextInput
                    style={[styles.entrada, { color: corTexto }]}
                    placeholder="Digite seu email"
                    placeholderTextColor={corTexto}
                    onChangeText={setRegistroEmail}
                    keyboardType="email-address"
                    value={registroEmail}
                  />
                  <ThemedText style={styles.rotulo}>Senha</ThemedText>
                  <ThemedView style={styles.containerSenha}>
                    <TextInput
                      style={[styles.entradaSenha, { color: corTexto }]}
                      placeholder="Digite sua senha"
                      placeholderTextColor={corTexto}
                      secureTextEntry={!senhaVisivel}
                      onChangeText={setRegistroSenha}
                      value={registroSenha}
                    />
                    <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
                      <MaterialIcons name={senhaVisivel ? 'visibility' : 'visibility-off'} size={24} color="gray" />
                    </TouchableOpacity>
                  </ThemedView>
                  <Button title={registroStatus === 'success' ? '✔' : registroStatus === 'error' ? '✘' : 'Registrar'} onPress={lidarComRegistro} color={registroStatus === 'success' ? 'green' : registroStatus === 'error' ? 'red' : corTexto} />
                  <TouchableOpacity onPress={alternarFormulario} style={styles.botaoRegistrar}>
                    <ThemedText style={styles.textoRegistrar}>Voltar</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              ) : (
                <ThemedView style={styles.formularioContainer}>
                  <ThemedText style={styles.rotulo}>Email</ThemedText>
                  <TextInput
                    style={[styles.entrada, { color: corTexto }]}
                    placeholder="Digite seu email"
                    placeholderTextColor={corTexto}
                    onChangeText={setResetEmail}
                    keyboardType="email-address"
                    value={resetEmail}
                  />
                  <ThemedText style={styles.rotulo}>Nova Senha</ThemedText>
                  <ThemedView style={styles.containerSenha}>
                    <TextInput
                      style={[styles.entradaSenha, { color: corTexto }]}
                      placeholder="Digite sua nova senha"
                      placeholderTextColor={corTexto}
                      secureTextEntry={!senhaVisivel}
                      onChangeText={setNovaSenha}
                      value={novaSenha}
                    />
                    <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
                      <MaterialIcons name={senhaVisivel ? 'visibility' : 'visibility-off'} size={24} color="gray" />
                    </TouchableOpacity>
                  </ThemedView>
                  <Button title={resetStatus === 'success' ? '✔' : resetStatus === 'error' ? '✘' : 'Redefinir Senha'} onPress={lidarComReset} color={resetStatus === 'success' ? 'green' : resetStatus === 'error' ? 'red' : corTexto} />
                  <TouchableOpacity onPress={alternarFormulario} style={styles.botaoRegistrar}>
                    <ThemedText style={styles.textoRegistrar}>Voltar</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              )}
            </Animated.View>
          </View>
        </View>
      </ParallaxScrollView>
    </NativeBaseProvider>
  );
};

export default TelaLogin;
