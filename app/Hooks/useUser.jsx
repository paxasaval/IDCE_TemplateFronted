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

      if (!response.data || Object.keys(response.data).length === 0) {
        console.error("La respuesta está vacía o nula");
        setError("La respuesta está vacía o nula");
        return;
      }
      console.log("RESPONSE EMPLOYED:", response.data);
      setEmpleados(response.data);
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