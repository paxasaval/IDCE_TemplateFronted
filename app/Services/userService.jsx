import axios from 'axios';

const BASE_URL = 'http://localhost:5185/api/empleado';

const getAllUser = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    throw error;
  }
}

const getUserID = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw error;
  }
}

const postUser = async (user) => {
  try {
    const response = await axios.post(BASE_URL, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Nuevo usuario:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear un nuevo usuario:', error);
    throw error;
  }
}

const putUser = async (user) => {
  try {
    const response = await axios.put(BASE_URL, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
}
const userService={
  getAllUser,
  getUserID,
  postUser,
  putUser
}
export default userService;