"use client";
import React, { useEffect, useState } from "react";
import { TreeView } from "devextreme-react/tree-view";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ApiUrl } from "../Services/ApiRest";
import useUser from "../Hooks/useUser";
import "devextreme/dist/css/dx.light.css";

const SideBar = () => {
  const { empleados } = useUser();
  const router = useRouter();
  const [modulos, setModulos] = useState([]);
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener la ruta personalizada
  const getRutaPersonalizada = (moduloNombre, menuNombre) => {
    const rutasPersonalizadas = {
      "Compañía": "/Modules/Administracion/Compania",
      "Productos": "/Modules/Administracion/Productos",
      "Módulo-Menú": "/Modules/Administracion/ModuloMenu",
      "Catalogos": "/Modules/Administracion/Catalogos",
      "Seguridades": "/Modules/Administracion/Seguridades",
      "Oficinas": "/Modules/Administracion/Oficinas",
      
      "AuditoriaSistema": "/Modules/Auditoria/AuditoriaSistema",
      "Funcionarios": "/Modules/Usuarios/Funcionarios",
      "Perfiles": "/Modules/Usuarios/Perfiles",
      "Usuarios": "/Modules/Usuarios/Usuarios",

    };

    return rutasPersonalizadas[menuNombre] || 
      // `/Modules/${moduloNombre}/${menuNombre.replace(/\s+/g, "").toLowerCase()}`;
      `/Modules/${moduloNombre}/${menuNombre.replace(/\s+/g, "")}`;
  };

  useEffect(() => {
    const fetchModulesAndMenus = async () => {
      try {
        setLoading(true);

        // Obtener módulos
        const { data: modulosData } = await axios.get(`${ApiUrl}modulo`);
        if (!modulosData || modulosData.length === 0) {
          throw new Error("La respuesta de módulos está vacía o nula");
        }
        setModulos(modulosData);

        // Obtener menús para cada módulo
        const menuRequests = modulosData.map(async (modulo) => {
          const { data: menusData } = await axios.get(`${ApiUrl}menu/${modulo.moduloID}`);

          return menusData.map((menu) => ({
            id: `${modulo.moduloID}-${menu.menuID}`, // ID único
            name: menu.captionMenu,
            parentId: modulo.moduloID,
            path: getRutaPersonalizada(modulo.nombre, menu.captionMenu),
          }));
        });

        const resolvedMenus = (await Promise.all(menuRequests)).flat();
        setMenus(resolvedMenus);
      } catch (err) {
        console.error("Error al obtener módulos y menús:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModulesAndMenus();
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  const handleItemClick = (e) => {
    if (e.itemData.path) {
      router.push(e.itemData.path);
    }
  };

  return (
    <div className="bg-neutral-50 w-1/4 h-screen p-4">
      {loading ? (
        <p>Cargando módulos...</p>
      ) : (
        <TreeView
          dataSource={[
            ...modulos.map(m => ({ id: m.moduloID, name: m.nombre })), 
            ...menus
          ]}
          dataStructure="plain"
          keyExpr="id"
          displayExpr="name"
          parentIdExpr="parentId"
          onItemClick={handleItemClick}
          expandNodesRecursive={true}
        />
      )}
    </div>
  );
};

export default SideBar;
