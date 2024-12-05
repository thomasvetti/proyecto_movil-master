import { db } from '../util/firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { collection, addDoc } from 'firebase/firestore'; // Asegúrate de importar estas funciones

export async function agregarComentario(itemId, usuario, comentario) {
  if (!itemId || !usuario || !comentario) {
    return { success: false, message: 'Todos los campos son obligatorios' };
  }

  try {
    // Usando addDoc para agregar un documento a la colección 'comentarios'
    await addDoc(collection(db, 'comentarios'), {
      itemId,
      usuario,
      comentario,
      fecha: new Date(),
    });
    return { success: true, message: 'Comentario agregado con éxito' };
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    return { success: false, message: 'Error al agregar comentario' };
  }
}

