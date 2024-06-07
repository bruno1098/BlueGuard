import React from 'react';
import { View, Text, Animated, ScrollView, Button } from 'react-native';
import { ColorSchemeName } from 'react-native';
import { MapaStyles as styles } from '../styles/MapaStyles';

interface Location {
  id: string;
  local: string;
  latitude: number;
  longitude: number;
  nivel_de_sujeira: string;
  ph_da_agua: number;
  temperatura: number;
  potavel: boolean;
  observacoes: string;
  cadastradoPor: string;
  publicado: boolean;
}

interface LocationModalProps {
  selectedLocation: Location | null;
  handleEdit: () => void;
  handleDelete: () => void;
  handleCloseModal: () => void;
  scaleAnim: Animated.Value;
  colorScheme: ColorSchemeName;
  user: { nome: string; email: string };
}

const LocationModal: React.FC<LocationModalProps> = ({ selectedLocation, handleEdit, handleDelete, handleCloseModal, scaleAnim, colorScheme, user }) => {
  return (
    <View style={styles.modalContainer}>
      <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }], backgroundColor: colorScheme === 'dark' ? '#333' : 'white' }]}>
        <ScrollView contentContainerStyle={styles.modalContentInner}>
          {selectedLocation && (
            <>
              <Text style={[styles.modalTitle, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{selectedLocation.local}</Text>
              <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Nível de sujeira: {selectedLocation.nivel_de_sujeira}</Text>
              <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>pH da água: {selectedLocation.ph_da_agua}</Text>
              <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Temperatura: {selectedLocation.temperatura}°C</Text>
              <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Potável: {selectedLocation.potavel ? 'Sim' : 'Não'}</Text>
              <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Observações: {selectedLocation.observacoes}</Text>
              <Text style={[styles.modalText, { color: colorScheme === 'dark' ? 'white' : 'black', fontSize: 12 }]}>Cadastrado por: {selectedLocation.cadastradoPor || 'Sistema'}</Text>
              {selectedLocation.cadastradoPor === user.nome && (
                <View style={styles.buttonContainer}>
                  <Button title="Editar" onPress={handleEdit} />
                  <Button title="Excluir" onPress={handleDelete} color="red" />
                </View>
              )}
              <Button title="Fechar" onPress={handleCloseModal} />
            </>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default LocationModal;
