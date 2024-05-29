import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Toast, NativeBaseProvider } from 'native-base';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withRepeat, runOnJS } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

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

  const [mostrarRegistro, setMostrarRegistro] = useState<boolean>(false);

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

      const dados = await resposta.json();
      const usuario = Object.values(dados).find((user: any) => user.senha === loginSenha);

      if (!usuario) throw new Error('Email ou senha incorretos.');

      setLoginStatus('success');
      mostrarToast('Login bem-sucedido!', 'success');

      console.log('Login bem-sucedido! Redirecionando para a tela Home');
      router.push('/(logtabs)/Home');
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
    } catch (erro) {
      console.error("Erro ao tentar registrar:", erro);
      setRegistroStatus('error');
      mostrarToast('Erro ao tentar registrar. Tente novamente.', 'error');
      setTimeout(() => setRegistroStatus('default'), 2000);
    }
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
        runOnJS(setMostrarRegistro)(!mostrarRegistro);
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
          <ThemedView style={estilos.cabecalho}>
            <Animated.Image
              source={require('@/assets/images/logo.png')}
              style={[estilos.logo, logoStyle]}
            />
            <ThemedText style={estilos.titulo}>BlueGuard</ThemedText>
          </ThemedView>
        }
      >
        <View style={estilos.containerCentralizado}>
          <View style={estilos.perspectiveContainer}>
            <Animated.View style={[estilos.formContainer, frontStyle]}>
              <ThemedView style={estilos.formularioContainer}>
                <ThemedText style={estilos.rotulo}>Email</ThemedText>
                <TextInput
                  style={[estilos.entrada, { color: corTexto }]}
                  placeholder="Digite seu email"
                  placeholderTextColor={corTexto}
                  onChangeText={setLoginEmail}
                  keyboardType="email-address"
                  value={loginEmail}
                />
                <ThemedText style={estilos.rotulo}>Senha</ThemedText>
                <ThemedView style={estilos.containerSenha}>
                  <TextInput
                    style={[estilos.entradaSenha, { color: corTexto }]}
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
                <TouchableOpacity onPress={alternarFormulario} style={estilos.botaoRegistrar}>
                  <ThemedText style={estilos.textoRegistrar}>Registrar</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </Animated.View>
            <Animated.View style={[estilos.formContainer, backStyle]}>
              <ThemedView style={estilos.formularioContainer}>
                <ThemedText style={estilos.rotulo}>Nome</ThemedText>
                <TextInput
                  style={[estilos.entrada, { color: corTexto }]}
                  placeholder="Digite seu nome"
                  placeholderTextColor={corTexto}
                  onChangeText={setRegistroNome}
                  value={registroNome}
                />
                <ThemedText style={estilos.rotulo}>Idade</ThemedText>
                <TextInput
                  style={[estilos.entrada, { color: corTexto }]}
                  placeholder="Digite sua idade"
                  placeholderTextColor={corTexto}
                  onChangeText={setRegistroIdade}
                  keyboardType="numeric"
                  value={registroIdade}
                />
                <ThemedText style={estilos.rotulo}>Email</ThemedText>
                <TextInput
                  style={[estilos.entrada, { color: corTexto }]}
                  placeholder="Digite seu email"
                  placeholderTextColor={corTexto}
                  onChangeText={setRegistroEmail}
                  keyboardType="email-address"
                  value={registroEmail}
                />
                <ThemedText style={estilos.rotulo}>Senha</ThemedText>
                <ThemedView style={estilos.containerSenha}>
                  <TextInput
                    style={[estilos.entradaSenha, { color: corTexto }]}
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
                <TouchableOpacity onPress={alternarFormulario} style={estilos.botaoRegistrar}>
                  <ThemedText style={estilos.textoRegistrar}>Voltar</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </Animated.View>
          </View>
        </View>
      </ParallaxScrollView>
    </NativeBaseProvider>
  );
};


const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cabecalho: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 110,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  formularioContainer: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
    backfaceVisibility: 'hidden',
  },
  rotulo: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  entrada: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  containerSenha: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  entradaSenha: {
    flex: 1,
    paddingLeft: 10,
  },
  botaoRegistrar: {
    marginTop: 10,
  },
  textoRegistrar: {
    color: '#007BFF',
  },
  formContainer: {
    backfaceVisibility: 'hidden',
    width: '100%',
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  perspectiveContainer: {
    width: '100%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCentralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TelaLogin;