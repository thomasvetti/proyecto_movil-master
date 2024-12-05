import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, Image, StyleSheet, SafeAreaView, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { agregarComentario } from '../util/comentarioService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../util/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Stars from 'react-native-stars';
import MapView, { Marker } from 'react-native-maps';

const DetallesPantalla = ({ route }) => {
  const { item } = route.params;
  const [comentario, setComentario] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setUsuario(email);
    };

    obtenerUsuario();
    obtenerComentarios();
  }, []);

  const obtenerComentarios = async () => {
    try {
      const comentariosQuery = query(
        collection(db, 'comentarios'),
        where('itemId', '==', item.id)
      );
      const querySnapshot = await getDocs(comentariosQuery);
      const comentariosData = querySnapshot.docs.map(doc => doc.data());
      setComentarios(comentariosData);
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
    }
  };

  async function handleAgregarComentario() {
    if (!usuario) {
      Alert.alert('Error', 'Debes estar registrado para comentar.');
      return;
    }

    const response = await agregarComentario(item.id, usuario, comentario);
    if (response.success) {
      Alert.alert('Éxito', response.message);
      setComentario('');
      obtenerComentarios();
    } else {
      Alert.alert('Error', response.message);
    }
  }

  const renderHeader = () => (
    <View>
      {/* Mapa */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          title={item.titulo}
          description={item.descripcion}
        />
      </MapView>

      {/* Imagen y detalles */}
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Stars
          default={item.calificacion}
          count={5}
          half={true}
          starSize={20}
          disabled={true}
          fullStar={<Image source={require('../assets/starFilled.png')} style={styles.star} />}
          emptyStar={<Image source={require('../assets/starEmpty.png')} style={styles.star} />}
          halfStar={<Image source={require('../assets/starHalf.png')} style={styles.star} />}
        />
        <Text style={styles.calificacion}>Calificación: {item.calificacion}</Text>
        <Text style={styles.descripcionAdicional}>{item.descripcion}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.comentario}>
      <Text style={styles.comentarioUsuario}>{item.usuario}:</Text>
      <Text style={styles.comentarioTexto}>{item.comentario}</Text>
    </View>
  );

  return (
    <ImageBackground 
      source={require('../assets/file(2).jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          data={comentarios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={<Text style={styles.noComentarios}>No hay comentarios aún.</Text>}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.comentarioInput}
            placeholder="Escribe tu comentario aquí"
            value={comentario}
            onChangeText={setComentario}
          />
          <TouchableOpacity onPress={handleAgregarComentario} style={styles.iconButton}>
            <Icon name="paper-plane" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1 },
  map: { width: '100%', height: 300, borderRadius: 10, marginBottom: 20 },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20 },
  textContainer: { backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  calificacion: { fontSize: 18, color: '#2c3e50', marginTop: 10, textAlign: 'center' },
  descripcionAdicional: { fontSize: 14, color: '#888', marginTop: 15, textAlign: 'center' },
  comentario: { backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 10, borderRadius: 10, marginVertical: 5 },
  comentarioUsuario: { fontWeight: 'bold', color: '#333' },
  comentarioTexto: { color: '#555' },
  noComentarios: { textAlign: 'center', color: '#888', marginVertical: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  comentarioInput: { flex: 1, height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, backgroundColor: 'white', color: 'black' },
  iconButton: { marginLeft: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 10, padding: 10 },
  star: { width: 20, height: 20 },
});

export default DetallesPantalla;
