import { auth } from './firebaseConfig'; // Asegúrate de este path
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Función para manejar autenticación y registro
export async function authenticate(mode, email, password) {
  try {
    let userCredential;
    
    if (mode === 'signUp') {
      // Registro de nuevo usuario
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } else if (mode === 'signInWithPassword') {
      // Inicio de sesión del usuario
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    }
    
    // Extraer y devolver el token de autenticación
    return userCredential.user.accessToken;
    
  } catch (error) {
    // Manejo de errores de autenticación
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('Error', 'Este correo ya está registrado.');
    } else if (error.code === 'auth/wrong-password') {
      Alert.alert('Error', 'Contraseña incorrecta.');
    } else {
      Alert.alert('Error', 'Ocurrió un problema. Por favor, intenta de nuevo.');
    }
    console.error(error);
  }
}

// Función login que reutiliza authenticate
export async function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}

// Función signup que reutiliza authenticate
export async function signup(email, password) {
  return authenticate('signUp', email, password);
}