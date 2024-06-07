import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cabecalho: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 110,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  formularioContainer: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
    backfaceVisibility: 'hidden',
  },
  rotulo: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  entrada: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  containerSenha: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  entradaSenha: {
    flex: 1,
    paddingLeft: 10,
  },
  botaoRegistrar: {
    marginTop: 10,
  },
  textoRegistrar: {
    color: '#007BFF',
  },
  textoEsquecer: {
    color: '#FF3B30',
  },
  formContainer: {
    backfaceVisibility: 'hidden',
    width: '100%',
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  perspectiveContainer: {
    width: '100%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCentralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
