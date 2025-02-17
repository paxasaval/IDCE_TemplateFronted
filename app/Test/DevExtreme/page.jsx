"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "devextreme/dist/css/dx.light.css";
import { TreeView } from 'devextreme-react/tree-view';
// import products from './products';


// Cargar DevExtreme dinámicamente (evita errores en SSR)
const DataGrid = dynamic(() => import("devextreme-react/data-grid"), { ssr: false });

export default function Page() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos([
      { id: 1, nombre: "Laptop", precio: 1200, stock: 10 },
      { id: 2, nombre: "Mouse", precio: 25, stock: 50 },
      { id: 3, nombre: "Teclado", precio: 60, stock: 20 },
    ]);
  }, []);

  return (
    <TreeView
    dataSource={productos}
    dataStructure="plain"
    keyExpr="ID"
    displayExpr="name"
    parentIdExpr="categoryId"
    />
  );
}