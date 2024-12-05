import axios from 'axios';

const BACKEND_URL = 'https://proyecto-50166-default-rtdb.firebaseio.com';

const getRestaurants = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/datos.json`);
    const restaurants = [];

    for (const key in response.data) {
      const restaurant = {
        id: key,
        titulo: response.data[key].titulo,
        descripcion: response.data[key].descripcion,
        calificacion: response.data[key].calificacion,
        imageUrl: response.data[key].imagen, // Incluir la URL de la imagen
      };
      restaurants.push(restaurant);
    }

    console.log('Fetched restaurants...');
    return restaurants;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const getRestaurantById = async (id) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/datos/${id}.json`);
    const restaurant = {
      id: id,
      titulo: response.data.titulo,
      descripcion: response.data.descripcion,
      calificacion: response.data.calificacion,
    };

    return restaurant;
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    throw error;
  }
};

export { getRestaurants, getRestaurantById };