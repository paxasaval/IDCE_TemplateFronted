"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faBriefcase, faIndent, faList, faShield, faIdCard, faUserSecret, faUserPlus, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

import Link from "next/link";
import useModulos from "../Hooks/useModulos";
import menuService from "../Services/menuService";
import formatter from "../utilities/formatter";
import dynamic from "next/dynamic";
import AspNetData from 'devextreme-aspnet-data-nojquery';

const TreeView = dynamic(() => import("devextreme-react/tree-view"), { ssr: false });

const iconMapping = {
  "fa fa-building": faBuilding,
  "fa fa-briefcase": faBriefcase,
  "fa fa-product-hunt": faProductHunt,
  "fa fa-indent": faIndent,
  "fa fa-list": faList,
  "fa fa-shield": faShield,
  "fa fa-id-card-o": faIdCard,
  "fa fa-user-secret": faUserSecret,
  "fa fa-user-plus": faUserPlus,
  "fa fa-list-alt": faListAlt,
};

const SideBar = () => {
  const { modulos, isLoading, error } = useModulos();
  const [menus, setMenus] = useState({});
  const [loadingMenus, setLoadingMenus] = useState(true); // Inicializar en true

  useEffect(() => {
    const loadMenus = async () => {
      if (modulos.length > 0) {
        setLoadingMenus(true); // Establecer en true al inicio de la carga

        try {
          const menusData = {};
          const requests = modulos.map(async (modulo) => {
            const menuData = await menuService.getAllMenusByModulo(modulo.moduloID);
            menusData[modulo.moduloID] = menuData;
          });

          await Promise.all(requests);

          setMenus(menusData);
        } catch (err) {
          console.error("Error al cargar los menús:", err);
        } finally {
          setLoadingMenus(false);
        }
      }
    };

    loadMenus();
  }, [modulos]);

  if (isLoading) return <Skeleton active paragraph={{ rows: 10 }} />;
  if (error) return <p className="row-span-9 row-start-2 w-full">{error}</p>;

  const modulosItems2 = modulos.map((modulo) => {
    const moduloMenus = menus[modulo.moduloID] || [];

    return {
      id: `Modules/${modulo.nombre}`,
      text: modulo.nombre,
      expanded: true,
      imagen: modulo.imagen,
      items: moduloMenus.length === 0
        ? loadingMenus
          ? [{ id: "loading", text: "Cargando menús..." }]
          : []
        : moduloMenus.map((menu) => ({
            id: `${menu.captionMenu}`,
            parentId: modulo.nombre,
            text: menu.captionMenu,
            icon: iconMapping[menu.imagen], // Guardamos el nombre del icono
        })),
    };
  });

  const templateItem = (item) => {
    if (item.icon) {
      return (
        <Link
          className="flex items-center gap-2"
          href={`/Modules/${item.parentId}/${formatter.normalizeText(item.text)}`}
        >
          <FontAwesomeIcon icon={item.icon} />
          <span>{item.text}</span>
        </Link>
      );
    }
    if(item.imagen){
      return (
        <span className="flex gap-2 items-center">
          <img className="w-4 h-4" src={`/${item.imagen}`} alt={item.text}/>
          <span>{item.text}</span>
        </span>
      );
    return <span>{item.text}</span>;
  };
  }
  return (
    <div className="h-full bg-neutral-100 overflow-y-auto overflow-x-hidden py-2">
      {loadingMenus ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : (
        <TreeView
          dataSource={modulosItems2}
          dataStructure="tree"
          displayExpr="text"
          keyExpr="id"
          parentIdExpr="parentId"
          itemRender={templateItem}
          ex
        />
      )}
    </div>
  );
};

export default SideBar;
