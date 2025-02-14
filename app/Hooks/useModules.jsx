"use client";
import { useState, useEffect } from "react";
import { ApiUrl } from "../Services/ApiRest";
import axios from "axios";

const useModules = () => {
  const [modulos, setModulos] = useState([]);

  const fetchModulos = async () => {
    try {
      const response = await fetch(`${ApiUrl}modulo`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
    //   console.log("MODULOS recibidosss:", data); // 🔍 Verifica los datos
     setModulos(data);
    // setModulos((prev) => {
    //     const uniqueEmpleados = data.filter(
    //       (emp) => !prev.some((e) => e.moduloID === emp.moduloID)
    //     );
    //     return [...prev, ...uniqueEmpleados];
    //   });
    
    } catch (error) {
      console.error("Error al obtener modulos:", error);
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);

return { modulos };
};

export default useModules;