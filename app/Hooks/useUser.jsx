"use client"
import {getAllUser} from '../Services/userService';
import { useState, useEffect } from 'react';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAllUser(); 
        setUsers(data);
      } catch (err) {
        setError('Error al cargar los usuarios');
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
    //verificar estado actualizado
    useEffect(() => {
        //console.log('Usuarios actualizados:', users);
      }, [users]);
  
    return { users, isLoading, error };
  };
  export default useUsers; 