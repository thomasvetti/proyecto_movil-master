export const uploadImageToCloudinary = async (imageUri) => {
  if (!imageUri) throw new Error('No se proporcionó una URI de imagen.');

  const data = new FormData();
  data.append('file', {
    uri: imageUri,
    type: 'image/jpeg', // Asegúrate de usar el tipo correcto
    name: 'upload.jpg',
  });
  data.append('upload_preset', 'ml_default'); // Configuración de tu preset

  const response = await fetch(`https://api.cloudinary.com/v1_1/dtxmd7xvc/image/upload`, {
    method: 'POST',
    body: data,
  });

  const result = await response.json();
  if (!result.secure_url) {
    throw new Error('Error al obtener la URL de la imagen desde Cloudinary.');
  }

  return result.secure_url;
};