import axios from 'axios';

const BASE_URL = 'http://localhost:5185/api/menu';

const getAllMenusByModulo = async (moduloID) => {
  try {
    const response = await axios.get(`${BASE_URL}/${moduloID}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los menus:', error);
    throw error;
  }
}

const menuService={
  getAllMenusByModulo,

}
export default menuService;