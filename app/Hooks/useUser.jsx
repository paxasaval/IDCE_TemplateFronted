"use client";
import { useState, useEffect } from "react";
import axios from "axios";
// import { ApiUrl } from "../Services/apiRest";
import { ApiUrl } from "../Services/apiRest";

const useUser = () => {
  const [empleados, setEmpleados] = useState([]);

    const fetchEmpleados = async () => {
      try {
        const response = await fetch(`${ApiUrl}empleado`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("Empleados recibidos:", data); // 🔍 Verifica los datos
       // Evitar duplicados asegurando que solo se asignen nuevos valores
      setEmpleados((prev) => {
        const uniqueEmpleados = data.filter(
          (emp) => !prev.some((e) => e.EmpleadoID === emp.EmpleadoID)
        );
        return [...prev, ...uniqueEmpleados];
      });
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      }
    };

useEffect(() => {
    fetchEmpleados();
  }, []);


// const dataList = async () => {
//     try {
//         // const response = await axios.get(ApiUrl + `empleado`);
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}empleado`);
//         if (response.ok) {
//             console.log('EMPLEADOOOS:', data);
//             const data = await response.json();
//             setEmpleados(data);  // Actualiza el estado con los datos recibidos
            
//         } else {
//             console.error('La respuesta está vacía o nula');
//         }
//     } catch (error) {
//         console.error(error);
//     }
// };

// useEffect(() => {
//     dataList();
// }, [])

return { empleados };
};

export default useUser;