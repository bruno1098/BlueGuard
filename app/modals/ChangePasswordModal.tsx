import React from 'react';
import { View, Modal, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Button } from 'native-base';
import { changePasswordModalStyles as styles } from '../styles/ChangePasswordModalStyles';

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
  senhaAntiga: string;
  senhaNova: string;
  setSenhaAntiga: (text: string) => void;
  setSenhaNova: (text: string) => void;
  handleChangePassword: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  visible,
  onClose,
  senhaAntiga,
  senhaNova,
  setSenhaAntiga,
  setSenhaNova,
  handleChangePassword,
}) => {
  const corTexto = useThemeColor({}, 'text');

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: useThemeColor({}, 'background') }]}>
          <ThemedText style={styles.modalTitle}>Alterar Senha</ThemedText>
          <ThemedText style={styles.rotulo}>Senha Antiga</ThemedText>
          <TextInput
            style={[styles.entrada, { color: corTexto }]}
            secureTextEntry
            value={senhaAntiga}
            onChangeText={setSenhaAntiga}
          />
          <ThemedText style={styles.rotulo}>Senha Nova</ThemedText>
          <TextInput
            style={[styles.entrada, { color: corTexto }]}
            secureTextEntry
            value={senhaNova}
            onChangeText={setSenhaNova}
          />
          <Button style={styles.submitButton} onPress={handleChangePassword}>
            <ThemedText style={styles.submitButtonText}>Atualizar Senha</ThemedText>
          </Button>
          <Button style={styles.cancelButton} onPress={onClose} colorScheme="coolGray">
            <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;
