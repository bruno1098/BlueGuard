import { StyleSheet, Dimensions } from 'react-native';

export const LocalCardStyles = StyleSheet.create({
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
