import React, { useContext, useState } from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, Pressable, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import { login } from '../util/auth';
import { AuthContext } from '../context/auth-context';

const backgroundImage = require('../assets/file(1).jpg');

const InicioSesion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authCtx = useContext(AuthContext); 

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, llene ambos campos', [{ text: 'OK' }]);
      return;
    }
    try {
      const token = await login(email, password);
      await AsyncStorage.setItem('userEmail', email); // Guardar el email en AsyncStorage
      authCtx.login(token); 
      navigation.navigate('Tabs');
    } catch (error) {
      Alert.alert('Error', 'Por favor, intente nuevamente.');
    }
  }
  return (
    <ImageBackground 
      source={backgroundImage} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Inicio sesión</Text>
        <Text style={styles.infoText}>Por favor, inicie sesión para continuar </Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Login Button */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? { backgroundColor: 'rgba(255, 255, 255, 0.9)' } : null,
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </Pressable>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '90%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 15,
    width: '100%',
  },
  icon: {
    marginRight: 10,
    color: 'gray',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
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
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});

export default InicioSesion;
