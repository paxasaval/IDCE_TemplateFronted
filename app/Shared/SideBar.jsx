"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ApiUrl } from "../Services/ApiRest";
import useUser from "../Hooks/useUser";
import dynamic from "next/dynamic";
const TreeView = dynamic(() => import("devextreme-react/tree-view"), { ssr: false });
// import TreeView from "devextreme-react/tree-view";

const SideBarClosed = ({ modulos, iconosModulo }) => {
  return (
    <div
      // className="bg-neutral-50 p-4 shadow-xl transition-all w-16"
      className="bg-neutral-50 p-4 shadow-xl border border-gray-300 rounded-lg transition-all w-16"
      style={{
        borderRadius: "5px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <ul className="space-y-4">
        {modulos.map((modulo) => (
          <li
            key={modulo.nombre}
            className="flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded-md"
          >
            {iconosModulo[modulo.nombre] && (
              <img
                src={iconosModulo[modulo.nombre]}
                alt={modulo.nombre}
                className="h-4 w-4"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SideBar = ({ isSidebarCollapsed }) => {
  const { empleados } = useUser();
  const router = useRouter();
  const [modulos, setModulos] = useState([]);
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Íconos de módulos
  const iconosModulo = {
    Administracion: "/assets/images/modules/gear.png",
    Usuarios: "/assets/images/modules/user.png",
    Auditoria: "/assets/images/modules/search.png",
  };

  // Íconos de menús
  const iconosMenu = {
    Compañía: "/assets/images/menus/building.png",
    Productos: "/assets/images/menus/briefcase.png",
    "Módulo-Menú": "/assets/images/menus/phunt.png",
    Catalogos: "/assets/images/menus/indent.png",
    Seguridades: "/assets/images/menus/list.png",
    Oficinas: "/assets/images/menus/shield.png",
    Funcionarios: "/assets/images/menus/idcard.png",
    Perfiles: "/assets/images/menus/usersecret.png",
    Usuarios: "/assets/images/menus/userplus.png",
    "Auditoria Sistema": "/assets/images/menus/listalt.png",
  };

  // Rutas personalizadas
  const getRutaPersonalizada = (moduloNombre, menuNombre) => {
    const rutasPersonalizadas = {
      Compañía: "/Modules/Administracion/Compania",
      Productos: "/Modules/Administracion/Productos",
      "Módulo-Menú": "/Modules/Administracion/ModuloMenu",
      Catalogos: "/Modules/Administracion/Catalogos",
      Seguridades: "/Modules/Administracion/Seguridades",
      Oficinas: "/Modules/Administracion/Oficinas",
      AuditoriaSistema: "/Modules/Auditoria/AuditoriaSistema",
      Funcionarios: "/Modules/Usuarios/Funcionarios",
      Perfiles: "/Modules/Usuarios/Perfiles",
      Usuarios: "/Modules/Usuarios/Usuarios",
    };

    return (
      rutasPersonalizadas[menuNombre] ||
      `/Modules/${moduloNombre}/${menuNombre.replace(/\s+/g, "")}`
    );
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
          const { data: menusData } = await axios.get(
            `${ApiUrl}menu/${modulo.moduloID}`
          );
          return menusData.map((menu) => ({
            id: `${modulo.moduloID}-${menu.menuID}`, // ID único
            name: menu.captionMenu,
            parentId: modulo.moduloID,
            path: getRutaPersonalizada(modulo.nombre, menu.captionMenu),
            icon: iconosMenu[menu.captionMenu] || null, // Asignar imagen si existe
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

  // Renderizar barra lateral colapsada si es necesario
  if (isSidebarCollapsed)
    return <SideBarClosed modulos={modulos} iconosModulo={iconosModulo} />;

  return (
    <div className="bg-neutral-50 p-4 shadow-xl border border-gray-300 rounded-lg">
      <TreeView
        dataSource={[
          ...modulos.map((m) => ({
            id: m.moduloID,
            name: m.nombre,
            expanded: true,
            icon: iconosModulo[m.nombre] || null, // Asignar imagen si existe
          })),
          ...menus,
        ]}
        dataStructure="plain"
        keyExpr="id"
        displayExpr="name"
        parentIdExpr="parentId"
        onItemClick={handleItemClick}
        expandNodesRecursive={true}
        itemRender={(item) => (
          <div className="flex items-center gap-2">
            {item.icon ? (
              <img src={item.icon} alt={item.name} className="w-4 h-4" />
            ) : null}
            <span>{item.name}</span>
          </div>
        )}
      />
    </div>
  );
};

export default SideBar;
