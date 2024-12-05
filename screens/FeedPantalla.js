import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, ActivityIndicator } from 'react-native';
import { realtimeDb } from '../util/firebaseConfig'; // Ajusta la ruta si es necesario
import { onValue, ref } from 'firebase/database';
import Stars from 'react-native-stars'; // Importamos el componente de estrellas

const FeedPantalla = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Referencia al nodo de datos en Firebase
    const dbRef = ref(realtimeDb, 'datos');

    // Listener para cambios en tiempo real
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convertir los datos en un array con un ID único
        const formattedData = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setItems(formattedData);
      } else {
        setItems([]);
      }
      setLoading(false);
    });

    // Limpiar el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/file(2).jpg')} // Fondo de pantalla
        style={styles.background}
      >
        <View style={styles.overlay}>
          <ScrollView style={styles.scrollView}>
            {items.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => navigation.navigate('DetallesPantalla', { item })}
              >
                <Image source={{ uri: item.imagen }} style={styles.image} />
                <View style={styles.textContainer}>
                <Text style={styles.usuario}>Publicado por: {item.usuarioEmail}</Text>
                  <Text style={styles.titulo}>{item.titulo}</Text>
                  <Text style={styles.descripcion}>{item.descripcion}</Text>
                  {/* Mostrar el correo del usuario */}
                 
                  {/* Componente de estrellas */}
                  <Stars
                    default={item.calificacion} // Calificación obtenida de la base de datos
                    count={5}
                    half={true} // Mostrar medias estrellas si aplica
                    starSize={20}
                    disabled={true} // Las estrellas son solo para mostrar
                    fullStar={<Image source={require('../assets/starFilled.png')} style={styles.star} />}
                    emptyStar={<Image source={require('../assets/starEmpty.png')} style={styles.star} />}
                    halfStar={<Image source={require('../assets/starHalf.png')} style={styles.star} />}
                  />
                  
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scrollView: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 15,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  descripcion: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  usuario: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  star: {
    width: 20,
    height: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedPantalla;
