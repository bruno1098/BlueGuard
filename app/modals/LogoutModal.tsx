import React from 'react';
import { View, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Button } from 'native-base';
import { logoutModalStyles as styles } from '../styles/logoutModalStyles';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  handleLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onClose, handleLogout }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: useThemeColor({}, 'background') }]}>
          <ThemedText style={styles.modalTitle}>Confirmar Logoff</ThemedText>
          <ThemedText style={styles.rotulo}>Você tem certeza que quer sair?</ThemedText>
          <Button style={styles.submitButton} onPress={handleLogout} colorScheme="danger">
            <ThemedText style={styles.submitButtonText}>Sim</ThemedText>
          </Button>
          <Button style={styles.cancelButton} onPress={onClose} colorScheme="coolGray">
            <ThemedText style={styles.cancelButtonText}>Não</ThemedText>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
