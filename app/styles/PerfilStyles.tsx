import { StyleSheet } from 'react-native';

export const perfilStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  scrollViewContent: {
    paddingTop: 80,
    alignItems: 'center',
    width: '100%',
  },
  avatarContainer: {
    marginBottom: 20,
    borderRadius: 50,
    overflow: 'hidden',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#ccc',
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  formContainer: {
    width: '90%',
  },
  rotulo: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  entrada: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 16,
  },
  forgotPasswordButton: {
    marginTop: 20,
    alignSelf: "center"
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    alignSelf: "center"
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
});
