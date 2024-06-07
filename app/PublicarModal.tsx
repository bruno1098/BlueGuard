import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PublicarModalStyles as styles } from './styles/PublicarModalStyles'

interface PublicarModalProps {
  visible: boolean;
  onClose: (publicar: boolean) => void;
  backgroundColor: string;
}

const PublicarModal: React.FC<PublicarModalProps> = ({ visible, onClose, backgroundColor }) => (
  <Modal visible={visible} transparent={true} animationType="slide">
    <ThemedView style={[styles.modalContainer, { backgroundColor }]}>
      <ThemedView style={styles.modalContent}>
        <ThemedText style={styles.modalTitle}>Publicar na Comunidade?</ThemedText>
        <TouchableOpacity style={styles.modalButton} onPress={() => onClose(true)}>
          <ThemedText style={styles.modalButtonText}>Sim</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'gray' }]} onPress={() => onClose(false)}>
          <ThemedText style={styles.modalButtonText}>Não</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  </Modal>
);

export default PublicarModal;
