'use client';
import moduleService from '../Services/modulosService';
import { useState, useEffect } from 'react';

export const useModulos = () => {
    const [modulos, setModulos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchModulos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await moduleService.getAllModulos(); 
        setModulos(data);
      } catch (err) {
        setError('Error al cargar los modulos');
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchModulos();
    }, []);
    //verificar estado actualizado
    useEffect(() => {
        //console.log('Usuarios actualizados:', modulos);
      }, [modulos]);
  
    return { modulos, isLoading, error, fetchModulos };
  };
  export default useModulos;