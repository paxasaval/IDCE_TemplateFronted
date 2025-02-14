"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ApiUrl } from "../Services/ApiRest";
import useUser from "../Hooks/useUser";

const SideBar = () => {
  const { empleados } = useUser();
  const router = useRouter();
  const [modulos, setModulos] = useState([]);
  const [menus, setMenus] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMenus, setLoadingMenus] = useState(false);
  const [error, setError] = useState(null);

  // Cargar módulos
  useEffect(() => {
    const dataModules = async () => {
      try {
        const response = await axios.get(`${ApiUrl}modulo`);
        if (!response.data || response.data.length === 0) {
          throw new Error("La respuesta de módulos está vacía o nula");
        }
        setModulos(response.data);
      } catch (err) {
        console.error("Error al obtener módulos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    dataModules();
  }, []);

  // Cargar menús por módulo
  useEffect(() => {
    const loadMenus = async () => {
      setLoadingMenus(true);
      try {
        const menusData = {};
        const requests = modulos.map(async (modulo) => {
          const response = await axios.get(`${ApiUrl}menu/${modulo.moduloID}`);
          menusData[modulo.moduloID] = response.data || [];
        });
        await Promise.all(requests);
        setMenus(menusData);
      } catch (err) {
        console.error("Error al cargar los menús:", err);
        setError(err.message);
      } finally {
        setLoadingMenus(false);
      }
    };
    if (modulos.length > 0) {
      loadMenus();
    }
  }, [modulos]);

  if (loading) return <p className="row-span-9 row-start-2 w-full">Cargando módulos...</p>;
  if (error) return <p className="row-span-9 row-start-2 w-full">{error}</p>;

  const modulosItems = modulos.map((modulo) => {
    const moduloMenus = menus[modulo.moduloID] || [];
    return {
      key: `Modules/${modulo.nombre}`,
      icon: <UserOutlined />,
      label: modulo.nombre,
      children:
        moduloMenus.length === 0
          ? loadingMenus
            ? [{ key: "loading", label: "Cargando menús..." }]
            : []
          : moduloMenus.map((menu) => ({
              key: menu.captionMenu,
              label: (
                <Link
                  href={`/Modules/${modulo.nombre}/${menu.captionMenu
                    .normalize("NFD")
                    .replace(/[̀-\u036f]/g, "")
                    .replace(/ñ/g, "n")
                    .replace(/\s+/g, "")}`}
                >
                  {menu.captionMenu}
                </Link>
              ),
            })),
    };
  });

  return (
    <div className="bg-neutral-50 w-1/4 h-screen">
      <Menu mode="inline" defaultSelectedKeys={["1"]} items={modulosItems} />
    </div>
  );
};

export default SideBar;
