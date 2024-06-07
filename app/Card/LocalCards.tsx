import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LocalCardStyles as styles } from '../styles/LocalCardStyles';

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

interface LocalCardProps {
  local: Local;
  usuario: Usuario | undefined;
  backgroundColor: string;
  textColor: string;
}

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

const LocalCard: React.FC<LocalCardProps> = ({ local, usuario, backgroundColor, textColor }) => (
  <View style={[styles.card, { backgroundColor }]}>
    <View style={styles.header}>
      {usuario?.fotoPerfil && isRemoteUrl(usuario.fotoPerfil) ? (
        <Image source={{ uri: usuario.fotoPerfil }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder} />
      )}
      <View>
        <ThemedText style={[styles.nome, { color: textColor }]}>{usuario?.nome || local.cadastradoPor}</ThemedText>
        <ThemedText style={[styles.timestamp, { color: textColor }]}>{formatTimestamp(local.timestamp, local.editadoEm)}</ThemedText>
      </View>
    </View>
    <Image source={{ uri: local.imagemLocal }} style={styles.imagem} />
    <ThemedText style={[styles.local, { color: textColor }]}>{local.local}</ThemedText>
    <ThemedText style={[styles.observacoes, { color: textColor }]}>{local.observacoes}</ThemedText>
  </View>
);

export default LocalCard;
