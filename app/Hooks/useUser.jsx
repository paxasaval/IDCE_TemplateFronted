  "use client";
  import { useState, useEffect } from "react";
  import { ApiUrl } from "../Services/ApiRest";
  import axios from "axios";

  const useUser = () => {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dataList = async () => {
      try {
        const response = await axios.get(ApiUrl + `empleado`);

        // if (!response.data || Object.keys(response.data).length === 0) {
        if (!response.data || response.data.length === 0) {
          console.error("La respuesta está vacía o nula");
          setError("La respuesta está vacía o nula");
          return;
        }
        // Mapeamos los datos para asegurar que tengan un campo "id"
        const empleadosConId = response.data.map((empleado, index) => ({
          id: empleado.empleadoID || empleado.empleadoID || index + 1, // Asegura un campo "id"
          identificacion: empleado.identificacion,
          nombre: empleado.nombres,
          apellidos: empleado.apellidos,
          telefono: empleado.telefono,
          email: empleado.email
        }));
        // console.log("RESPONSE DATA:", response.data);
        // console.log("RESPONSE EMPLOYED:", empleadosConId);
        setEmpleados(empleadosConId);

      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      dataList();
    }, []);

    return { empleados };
  };

  export default useUser;