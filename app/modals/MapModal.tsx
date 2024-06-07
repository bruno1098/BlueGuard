import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { MapModalStyles as styles } from '../styles/MapModalStyles';

interface MapModalProps {
  visible: boolean;
  onClose: () => void;
  onMapPress: (event: MapPressEvent) => void;
  latitude: number | null;
  longitude: number | null;
}

const MapModal: React.FC<MapModalProps> = ({ visible, onClose, onMapPress, latitude, longitude }) => {
  const primaryColor = useThemeColor({}, 'tint');

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.mapContainer}>
        <MapView style={styles.map} onPress={onMapPress}>
          {latitude && longitude && <Marker coordinate={{ latitude, longitude }} />}
        </MapView>
        <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: primaryColor }]}>
          <ThemedText style={styles.closeButtonText}>Fechar</ThemedText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MapModal;
