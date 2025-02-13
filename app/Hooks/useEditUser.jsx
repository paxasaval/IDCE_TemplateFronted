'use client';
import { useState } from 'react';
import { message } from 'antd';
import userService from '../Services/userService';

export const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editUser = async (user) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.putUser(user); // Llamada al servicio para actualizar
      message.success('Usuario actualizado con éxito');
      return updatedUser;
    } catch (err) {
      setError('Error al actualizar el usuario');
      message.error('Error al actualizar el usuario');
      throw err; // Lanza el error para que el componente pueda manejarlo si es necesario
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    editUser,
  };
};

export default useEditUser;
