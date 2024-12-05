import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, ImageBackground, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilPantalla = ({ navigation }) => {
  const [infoUsuario, asignarInfoUsuario] = useState(null);
  const [CambiarContraseña, AsginarCambiarContraseña] = useState(false);
  const [contraseñaActual, AsignarcontraseñaActual] = useState('');
  const [nuevaContraseña, asignarNuevaContraseña] = useState('');
  const [confirmnuevaContraseña, setConfirmnuevaContraseña] = useState('');

  useEffect(() => {
    const loadinfoUsuario = async () => {
      const email = await AsyncStorage.getItem('userEmail'); // Obtener el email desde AsyncStorage
      asignarInfoUsuario({ email });
    };
    loadinfoUsuario();
  }, []);

  const handleChangePassword = async () => {
    const storedPassword = await AsyncStorage.getItem('userPassword');
    if (storedPassword === contraseñaActual && nuevaContraseña === confirmnuevaContraseña) {
      await AsyncStorage.setItem('userPassword', nuevaContraseña);
      AsginarCambiarContraseña(false);
      Alert.alert("Contraseña cambiada");
    } else {
      Alert.alert("Error al cambiar la contraseña");
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Cerrar sesión", onPress: async () => {
          await AsyncStorage.clear();
          navigation.navigate('Login');
        }}
      ]
    );
  };

  const handleDeleteAccount = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  const ButtonComponent = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  if (CambiarContraseña) {
    return (
      <ImageBackground 
        source={require('../assets/file(2).jpg')} // Cambia esto por tu fondo preferido
        style={styles.background}
      >
        <View style={styles.overlay} />
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Cambiar Contraseña</Text>
          <TextInput 
            placeholder="Contraseña Actual"
            value={contraseñaActual}
            onChangeText={AsignarcontraseñaActual}
            secureTextEntry
            style={styles.input} 
          />
          <TextInput 
            placeholder="Nueva Contraseña"
            value={nuevaContraseña}
            onChangeText={asignarNuevaContraseña}
            secureTextEntry
            style={styles.input} 
          />
          <TextInput 
            placeholder="Confirmar Nueva Contraseña"
            value={confirmnuevaContraseña}
            onChangeText={setConfirmnuevaContraseña}
            secureTextEntry
            style={styles.input} 
          />
          <ButtonComponent title="Cambiar Contraseña" onPress={handleChangePassword} />
          <ButtonComponent title="Cancelar" onPress={() => AsginarCambiarContraseña(false)} />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={require('../assets/file(2).jpg')} // Cambia esto por tu fondo preferido
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.innerContainer}>
        {infoUsuario ? (
          <Text style={styles.infoText}>Correo: {infoUsuario.email}</Text>
        ) : (
          <Text>Cargando perfil...</Text>
        )}
        <ButtonComponent title="Cambiar Contraseña" onPress={() => AsginarCambiarContraseña(true)} />
        <ButtonComponent title="Eliminar Cuenta" onPress={() => 
          Alert.alert(
            "¿Seguro que deseas eliminar tu cuenta?",
            "",
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Eliminar", onPress: handleDeleteAccount }
            ]
          )
        } />
        <ButtonComponent title="Cerrar sesión" onPress={handleLogout} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
    padding: 20,
    width: '90%', // Ajustar el ancho
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Color del texto del encabezado
  },
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: '100%', // Ajustar el ancho
    borderRadius: 5,
    backgroundColor: 'white', // Color de fondo del campo de texto
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: 'center',
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white', // Color del texto de información
  },
});

export default PerfilPantalla;
