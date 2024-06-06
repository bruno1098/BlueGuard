import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions, RefreshControl, Text, useColorScheme } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Easing } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

interface Usuario {
  nome: string;
  email: string;
  fotoPerfil?: string;
}

interface Local {
  id: string;
  local: string;
  latitude: number;
  longitude: number;
  nivel_de_sujeira: string;
  ph_da_agua: number;
  temperatura: number;
  potavel: boolean;
  observacoes: string;
  imagemLocal: string;
  cadastradoPor: string;
  publicado: boolean;
  timestamp: string;
  editadoEm?: string;
}

const Comunidade: React.FC = () => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [usuarios, setUsuarios] = useState<{ [email: string]: Usuario }>({});
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const translateY = useSharedValue(0);
  const titleScale = useSharedValue(1);

  const fetchLocais = async () => {
    try {
      const response = await axios.get('https://experienceia-default-rtdb.firebaseio.com/locais.json');
      const data = response.data;
      const locaisArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      const sortedLocais = locaisArray.filter(local => local.publicado).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setLocais(sortedLocais);
    } catch (error) {
      console.error("Erro ao obter locais:", error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('https://experienceia-default-rtdb.firebaseio.com/Usuarios.json');
      const data = response.data;
      const usuariosMap: { [email: string]: Usuario } = {};
      Object.keys(data).forEach(key => {
        const user = data[key];
        usuariosMap[user.email] = user;
      });
      setUsuarios(usuariosMap);
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLocais();
      fetchUsuarios();
    }, [])
  );

  useEffect(() => {
    fetchLocais();
    fetchUsuarios();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLocais();
    await fetchUsuarios();
    setRefreshing(false);
  };

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: titleScale.value },
      ],
    };
  });

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    translateY.value = withTiming(-Math.min(offsetY, 50), { duration: 500, easing: Easing.out(Easing.exp) });
    titleScale.value = withTiming(offsetY > 50 ? 0.8 : 1, { duration: 500, easing: Easing.out(Easing.exp) });
  };

  const formatTimestamp = (timestamp: string, editadoEm?: string) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString();
    if (editadoEm) {
      return `${formattedDate} (editado)`;
    }
    return formattedDate;
  };

  const isRemoteUrl = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
          <Text style={[styles.title, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Comunidade 👥</Text>
        </Animated.View>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {locais.map((local) => (
            <View key={local.id} style={[styles.card, { backgroundColor }]}>
              <View style={styles.header}>
                {usuarios[local.cadastradoPor]?.fotoPerfil && isRemoteUrl(usuarios[local.cadastradoPor]?.fotoPerfil as string) ? (
                  <Image
                    source={{ uri: usuarios[local.cadastradoPor]?.fotoPerfil as string }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder} />
                )}
                <View>
                  <ThemedText style={[styles.nome, { color: textColor }]}>{usuarios[local.cadastradoPor]?.nome || local.cadastradoPor}</ThemedText>
                  <ThemedText style={[styles.timestamp, { color: textColor }]}>{formatTimestamp(local.timestamp, local.editadoEm)}</ThemedText>
                </View>
              </View>
              <Image source={{ uri: local.imagemLocal }} style={styles.imagem} />
              <ThemedText style={[styles.local, { color: textColor }]}>{local.local}</ThemedText>
              <ThemedText style={[styles.observacoes, { color: textColor }]}>{local.observacoes}</ThemedText>
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingTop: 100,  // espaço para o título
    paddingBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#ccc',
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  imagem: {
    width: '100%',
    height: Dimensions.get('window').width * 0.75,
    borderRadius: 12,
    marginBottom: 16,
  },
  local: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  observacoes: {
    fontSize: 16,
  },
});

export default Comunidade;
