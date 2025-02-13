"use client";
import { useState, useEffect, useCallback } from "react";
import menuService from "../Services/menuService";

const useMenu = (moduloID) => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenus = useCallback(async () => {
    if (!moduloID) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await menuService.getAllMenusByModulo(moduloID);
      setMenus(data);
    } catch (err) {
      console.error("Error al cargar los menus:", err);
      setError("Error al cargar los menus");
    } finally {
      setIsLoading(false);
    }
  }, [moduloID]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  return { menus, isLoading, error, refetch: fetchMenus };
};

export default useMenu;
