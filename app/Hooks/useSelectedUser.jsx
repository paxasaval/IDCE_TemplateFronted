'use client';

import React, { createContext, useContext, useState } from 'react';

const SelectedUserContext = createContext();

export const useSelectedUser = () => {
  return useContext(SelectedUserContext);
};

export const SelectedUserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const selectUser = (user) => {
    setSelectedUser(user);
    //console.log('Usuario seleccionado:', user);
  };

  const clearUser = () => {
    console.log('Borrando usuario selecionado:', selectedUser);

    setSelectedUser(null);
  };

  return (
    <SelectedUserContext.Provider value={{ selectedUser, selectUser, clearUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
};
