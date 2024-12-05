import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';  // Importar los íconos desde FontAwesome

const PantallaInicio = ({ navigation }) => {
  const inicioSesion = () => {
    navigation.navigate('InicioSesion');
  };

  const RealizarRegistro = () => {
    navigation.navigate('Registro');
  };

  return (
    <>
      {/* Hace la barra de estado transparente */}
      <StatusBar style="light" translucent={true} backgroundColor="transparent" />
      
      <View style={styles.container}>
        {/* Imagen de fondo */}
        <ImageBackground
          source={require('../assets/file(1).jpg')}  // Ruta de la imagen
          style={styles.background}
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>Bienvenido a AppTurina</Text>
            
            {/* Botón personalizado para "Iniciar Sesión" con ícono */}
            <TouchableOpacity style={styles.button} onPress={inicioSesion}>
              <Icon name="sign-in" size={24} color="black" style={styles.icon} />
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            
            {/* Botón personalizado para "Registro" con ícono */}
            <TouchableOpacity style={styles.button} onPress={RealizarRegistro}>
              <Icon name="user-plus" size={24} color="black" style={styles.icon} />
              <Text style={styles.buttonText}>Registro</Text>
            </TouchableOpacity>
            
            {/* Botón personalizado para "Continuar sin iniciar sesión" con ícono */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tabs')}>
              <Icon name="user" size={24} color="black" style={styles.icon} />
              <Text style={styles.buttonText}>Continuar sin iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen para que cubra toda la pantalla
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Capa semitransparente
  },
  text: {
    fontSize: 24,
    color: 'white',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',  // Alinea el icono y el texto en fila
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Fondo semitransparente blanco
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,  // Bordes redondeados
    marginBottom: 15,
    alignItems: 'center',
    width: '80%',  // Ajusta el ancho para que sea consistente
    justifyContent: 'center',  // Alinea el contenido en el centro
  },
  buttonText: {
    fontSize: 18,
    color: 'black',  // Color del texto
    fontWeight: 'bold',
    marginLeft: 10,  // Espacio entre el icono y el texto
  },
  icon: {
    marginRight: 10,  // Espaciado entre el icono y el texto
  },
});

export default PantallaInicio;
