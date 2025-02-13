"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Menu } from "antd";
import {
  LockOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import useModulos from "../Hooks/useModulos";
import useMenu from "../Hooks/useMenu";
import menuService from "../Services/menuService";
const SideBar = () => {
  const { modulos, isLoading, error } = useModulos();
  const [menus, setMenus] = useState({});
  const [loadingMenus, setLoadingMenus] = useState(true);

  useEffect(() => {
    const loadMenus = async () => {
      setLoadingMenus(true);
      try {
        const menusData = {};
        // Recorremos todos los módulos para obtener sus menús
        const requests = modulos.map(async (modulo) => {
          console.log(`Cargando menús para moduloID: ${modulo.moduloID}`);
          const menuData = await menuService.getAllMenusByModulo(modulo.moduloID);
          console.log(`Menús cargados para moduloID ${modulo.moduloID}:`, menuData);
          menusData[modulo.moduloID] = menuData;
        });

        // Esperamos a que todas las peticiones terminen
        await Promise.all(requests);

        // Actualizamos el estado con los menús cargados
        setMenus(menusData);
        console.log("Menús finales:", menusData);

      } catch (err) {
        console.error("Error al cargar los menús:", err);
      } finally {
        setLoadingMenus(false);
      }
    };

    if (modulos.length > 0) {
      loadMenus();
    }
  }, [modulos]);

  if (isLoading)
    return <p className="row-span-9 row-start-2 w-full">Cargando modulos...</p>;
  if (error) return <p className="row-span-9 row-start-2 w-full">{error}</p>;

  const modulosItems = modulos.map((modulo) => {
    const moduloMenus = menus[modulo.moduloID] || [];
    return {
      key: `Modules/${modulo.nombre}`,
      label: modulo.nombre,
      children:
        moduloMenus.length === 0 ? (
          loadingMenus ? [{ key: 'loading', label: 'Cargando menus...' }] : []
        ) : (
          moduloMenus.map((menu) => ({
            key: `${menu.captionMenu}`,
            label: (<Link href={`Modules/${modulo.nombre}/${menu.captionMenu}`}>{menu.captionMenu}</Link>),
          }))
        ),
    };
  });

  //console.log('Usuarios en el componente:', users);
  return (
    <div className="row-span-9 row-start-2 w-full bg-neutral-50 overflow-y-auto overflow-x-hidden">
      <Menu mode="inline" defaultSelectedKeys={["1"]} items={modulosItems} />
    </div>
  );
};
export default SideBar;
