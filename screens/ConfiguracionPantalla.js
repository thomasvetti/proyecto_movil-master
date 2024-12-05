import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConfiguracionPantalla = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Estado para las notificaciones

  // Cambiar estado de las notificaciones
  const toggleNotifications = async () => {
    setNotificationsEnabled(previousState => !previousState);
    await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(!notificationsEnabled));
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
          source={require('../assets/file(2).jpg')} // Cambia esto por tu fondo preferido
          style={styles.background}
      >
        {/* Overlay para aumentar la opacidad */}
        <View style={styles.overlay} />

        <View style={styles.innerContainer}>
          <Text style={styles.title}>Configuración</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Notificaciones</Text>
            <Switch
              onValueChange={toggleNotifications}
              value={notificationsEnabled}
              trackColor={{ false: "#767577", true: "rgba(255, 255, 255, 0.8)" }} // Color del track del switch
              thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"} // Color del thumb del switch
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Privacidad y Seguridad</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert('Opciones de privacidad y seguridad')}
            >
              <Icon name="cog" size={12} color="black" />
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color negro con opacidad
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center', // Opcional: centra el contenido verticalmente
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: 'white', // Cambia a blanco para mayor visibilidad
  },
  settingItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 18,
    color: 'white', // Cambia a blanco para mayor visibilidad
  },
  button: {
    flexDirection: 'row',  // Alinea el icono y el texto en fila
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Fondo semitransparente blanco
    paddingVertical: 4,     // Reducido para hacerlo más pequeño
    paddingHorizontal: 10,   // Reducido para hacerlo más pequeño
    borderRadius: 10,       // Bordes redondeados
    marginBottom: 15,
    alignItems: 'center',
    width: '40%',           // Ajustado para que sea más pequeño
    justifyContent: 'center',  // Alinea el contenido en el centro
  },
  buttonText: {
    fontSize: 12,           // Tamaño del texto reducido
    color: 'black',         // Color del texto
    fontWeight: 'bold',
    marginLeft: 5,         // Espacio entre el icono y el texto
  },
});

export default ConfiguracionPantalla;
