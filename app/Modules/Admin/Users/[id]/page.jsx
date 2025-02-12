'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useUsers from '../../../../Hooks/useUser';
import {useSelectedUser} from '../../../../Hooks/useSelectedUser';

const UserDetail = () => {
    const { id } = useParams();
    const { users, isLoading, error } = useUsers();
    const [user, setUser] = useState(null);
    const { selectUser } = useSelectedUser(); 
    useEffect(() => {
      if (id && users.length > 0) {
        const foundUser = users.find((user) => user.empleadoID === parseInt(id));
        if (foundUser) {
            selectUser(foundUser);  
          }
        setUser(foundUser);
      }
    }, [id, users]);
  
    // Verificar si hay un error al cargar
    if (isLoading) return <p>Cargando usuario...</p>;
    if (error) return <p>{error}</p>;
  
    // Si el usuario no se encuentra, mostramos un mensaje
    if (!user) return <p>Usuario no encontrado.</p>;
  
    return (
      <div className='container w-full h-full px-4 py-8'>
        <h1>Detalles del Usuario</h1>
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user.empleadoID}</p>
      </div>
    );
  };
  
  export default UserDetail;
