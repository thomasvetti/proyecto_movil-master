import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database'; // Importa Firebase Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyA4NYWUvnMqNxe_6AF7zHde8fLKhI3U7ak",
  authDomain: "proyecto-50166.firebaseapp.com",
  databaseURL: "https://proyecto-50166-default-rtdb.firebaseio.com",
  projectId: "proyecto-50166",
  storageBucket: "proyecto-50166.appspot.com",
  messagingSenderId: "136563150356",
  appId: "1:136563150356:web:468cec1cf71da967cea101",
  measurementId: "G-CJHMFK08NW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDb = getDatabase(app); // Exporta Firebase Realtime Database