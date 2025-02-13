'use client';
import { useState, useEffect } from 'react';
import userService from '../Services/userService';

export const useLogginUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await userService.getUserID(1); // Asegúrate de que el ID se obtiene correctamente
        setUser(data);
      } catch (err) {
        setError('Error al cargar el usuario');
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, []); // Solo se ejecuta una vez al montarse el componente

    return { user, isLoading, error };
};
export default useLogginUser;
