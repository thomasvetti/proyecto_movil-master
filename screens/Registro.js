import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/auth-context';
import { authenticate } from '../util/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Registro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login: contextLogin } = useContext(AuthContext);

  const handleRegister = async () => {
    if (password === confirmPassword) {
      try {
        const userId = await authenticate('signUp', email, password);
        await AsyncStorage.setItem('userEmail', email); // Guardar el email en AsyncStorage
        contextLogin(userId);
        navigation.navigate('Tabs');
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un problema en el registro. Inténtalo de nuevo.');
      }
    } else {
      Alert.alert('Error', 'Las contraseñas no coinciden');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/file(1).jpg')} style={styles.background}>
        <View style={styles.overlay}>
        <Text style={styles.header}>Registro</Text>
          

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="gray" style={styles.icon} />
            <TextInput
              placeholder="Correo"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="gray" style={styles.icon} />
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="gray" style={styles.icon} />
            <TextInput
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          {/* Login Button */}
          <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? { backgroundColor: 'rgba(255, 255, 255, 0.9)' } : null,
          ]}
          onPress={handleRegister}
        >
          <Icon name="user-plus" size={20} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Registro</Text>
        </Pressable>
          
        </View>
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 30,  // Añadir un margen horizontal para evitar que los elementos toquen los bordes
  },
  header: {
    fontSize: 28,  // Hacer el texto un poco más grande para destacarlo
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,  // Aumentar el margen para separar del primer input
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 15,  // Ajustar el margen para espacio uniforme entre inputs
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
    textAlign: 'center', // Centrar el texto dentro del botón
    width: '100%', // Asegura que el texto ocupe todo el espacio disponible en el botón
  },
   header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
});

export default Registro;
