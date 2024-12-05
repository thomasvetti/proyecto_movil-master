import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text, Image, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToCloudinary } from '../util/cloudinaryUpload';
import { realtimeDb } from '../util/firebaseConfig';
import { ref, set } from 'firebase/database';
import Stars from 'react-native-stars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BuscarPantalla = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [calificacion, setCalificacion] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const [url, setUrl] = useState(''); // Estado para la URL de Google Maps
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setUsuario(email);
    };
    obtenerUsuario();
  }, []);

  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      } else {
        Alert.alert('Aviso', 'No se seleccionó ninguna imagen.');
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      Alert.alert('Error', 'Hubo un problema al intentar abrir la galería.');
    }
  };

  const extractCoordinates = (url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = url.match(regex);
    if (match) {
      return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };
    }
    return null;
  };

  const handleUpload = async () => {
    if (!usuario) {
      Alert.alert('Error', 'Debes iniciar sesión para realizar una publicación.');
      return;
    }

    if (!titulo || !descripcion || calificacion === 0 || !imageUri || !url) {
      Alert.alert('Error', 'Por favor completa todos los campos y selecciona una imagen.');
      return;
    }

    const coords = extractCoordinates(url);
    if (!coords) {
      Alert.alert('Error', 'Por favor ingresa una URL válida de Google Maps.');
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary(imageUri);
      const newRef = ref(realtimeDb, 'datos/' + Date.now());
      await set(newRef, {
        titulo,
        descripcion,
        calificacion,
        imagen: imageUrl,
        usuarioEmail: usuario,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      Alert.alert('Éxito', 'Datos subidos correctamente.');
      setTitulo('');
      setDescripcion('');
      setCalificacion(0);
      setImageUri(null);
      setUrl('');
    } catch (e) {
      Alert.alert('Error', `Hubo un problema al subir los datos: ${e.message}`);
    }
  };

  return (
    <ImageBackground source={require('../assets/file(2).jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Subir Datos</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#999"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Descripción"
          placeholderTextColor="#999"
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresa la URL de Google Maps"
          placeholderTextColor="#999"
          value={url}
          onChangeText={setUrl}
        />
        <Text style={styles.label}>Calificación:</Text>
        <Stars
          default={calificacion}
          count={5}
          half={true}
          starSize={40}
          update={(value) => setCalificacion(value)}
          fullStar={<Image source={require('../assets/starFilled.png')} style={styles.star} />}
          emptyStar={<Image source={require('../assets/starEmpty.png')} style={styles.star} />}
          halfStar={<Image source={require('../assets/starHalf.png')} style={styles.star} />}
        />
        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          <Text style={styles.buttonText}>Seleccionar Imagen</Text>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
        <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={handleUpload}>
          <Text style={styles.buttonText}>Subir Datos</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  star: {
    width: 30,
    height: 30,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 15,
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
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 15,
    borderRadius: 10,
  },
 
  starsContainer: {
    marginVertical: 20,
    alignItems: 'center',
    position: 'relative', // Para colocar el fondo detrás de las estrellas
  },
  starsBackground: {
    position: 'absolute', // Colocar el fondo detrás
    width: '80%', // Ajusta según el espacio requerido para las estrellas
    height: 50, // Ajusta según el tamaño de las estrellas
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Blanco con opacidad
    borderRadius: 10, // Bordes redondeados
  },
  star: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    marginTop: 10,
  },
});


export default BuscarPantalla;
