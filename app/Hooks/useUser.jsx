"use client";
import userService from '../Services/userService';
import { useState, useEffect, useCallback } from 'react';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Memoizamos fetchUsers para que no se recree en cada renderizado
  const fetchUsers = useCallback(async () => {
    if (isLoading) return; // Prevenir múltiples llamadas simultáneas
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await userService.getAllUser(); 
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err instanceof Error ? err.message : 'Error al cargar los usuarios');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); // Solo depende de isLoading para evitar múltiples llamadas

  // Cargar datos solo al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []); // Array de dependencias vacío = solo ejecuta al montar

  return { users, isLoading, error, fetchUsers };
};

export default useUsers;