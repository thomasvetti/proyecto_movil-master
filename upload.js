const axios = require('axios');
const fs = require('fs'); // Para leer archivos locales
const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');

// Inicializa Firebase Admin
const serviceAccount = require('./util/serviceAccountKey.json'); // Cambia a tu archivo de credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://proyecto-50166.firebasestorage.app', // Cambia al bucket de tu proyecto
});

const bucket = getStorage().bucket();

// Datos con imágenes locales
const restaurants = [
  {
    id: 1,
    titulo: "Título 1",
    descripcion: "Descripción 1",
    calificacion: "★★★★☆",
    texto: "Texto 0",
    imagePath: './assets/esd.jpg', // Ruta de la imagen local
  },

];

// Función para subir imágenes y datos
const uploadImageAndData = async () => {
  try {
    for (const restaurant of restaurants) {
      const imageFile = restaurant.imagePath;
      const fileName = `images/${restaurant.id}-${Date.now()}.jpg`;

      // Subir la imagen a Firebase Storage
      const file = bucket.file(fileName);
      await bucket.upload(imageFile, { destination: fileName });

      // Obtener URL de descarga pública
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2030', // Cambia la fecha de expiración según necesites
      });

      // Añadir la URL al objeto
      restaurant.imageUrl = url;

      // Subir datos con la URL a Firebase Realtime Database
      const response = await axios.post(
        'https://proyecto-50166-default-rtdb.firebaseio.com/items.json',
        restaurant
      );

      console.log('Datos y URL subidos exitosamente:', response.data);
    }
  } catch (error) {
    console.error('Error subiendo imagen y datos:', error);
  }
};

// Llamar la función
uploadImageAndData();
