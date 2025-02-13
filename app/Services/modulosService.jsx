import axios from 'axios';

const BASE_URL = 'http://localhost:5185/api/modulo';

const getAllModulos = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    throw error;
  }
}

const getModuloID = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw error;
  }
}

const postModulo = async (modulo) => {
  try {
    const response = await axios.post(BASE_URL, modulo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Nuevo modulo:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear un nuevo modulo:', error);
    throw error;
  }
}

const putModulo = async (modulo) => {
  try {
    const response = await axios.put(BASE_URL, modulo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el modulo:', error);
    throw error;
  }
}
const moduleService={
  getAllModulos,
  getModuloID,
  postModulo,
  putModulo
}
export default moduleService;