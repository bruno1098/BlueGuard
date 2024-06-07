import { StyleSheet, Dimensions } from 'react-native';

export const MapaStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 80, 
    left: 10,
    right: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
  },
  clearButton: {
    marginLeft: 10,
  },
  suggestions: {
    position: 'absolute',
    top: 130, 
    left: 10,
    right: 10,
    backgroundColor: 'white',
    zIndex: 1,
    borderRadius: 5,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentInner: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 2,
  },
  menuButton: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});
