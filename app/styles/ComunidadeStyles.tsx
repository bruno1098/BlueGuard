import { StyleSheet } from 'react-native';

export const ComunidadeStyles = StyleSheet.create({
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
    paddingTop: 100, 
    paddingBottom: 16,
  },
});
