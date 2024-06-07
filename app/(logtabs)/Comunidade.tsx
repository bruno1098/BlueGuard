import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, RefreshControl, Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { ComunidadeStyles as styles } from '../styles/ComunidadeStyles';
import LocalCard from '../Card/LocalCards'
import { useColorScheme } from '@/hooks/useColorScheme.web';

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
          <Text style={[styles.title, { color: colorScheme === 'dark' ? 'black' : 'white' }]}>Comunidade 👥</Text>
        </Animated.View>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {locais.map((local) => (
            <LocalCard
              key={local.id}
              local={local}
              usuario={usuarios[local.cadastradoPor]}
              backgroundColor={backgroundColor}
              textColor={textColor}
            />
          ))}
        </ScrollView>
      </ThemedView>
    </GestureHandlerRootView>
  );
};

export default Comunidade;
