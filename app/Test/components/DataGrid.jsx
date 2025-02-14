"use client"; // Indica que es un Client Component

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "devextreme/dist/css/dx.light.css";

// Cargar DataGrid dinámicamente, deshabilitando SSR
const DataGrid = dynamic(
  () => import("devextreme-react/data-grid"),
  { ssr: false }
);

// Función para obtener datos de Cat Facts
const getCatFacts = async () => {
  const dataResponse = await fetch("https://catfact.ninja/facts", {
    cache: "no-store",
  });
  const facts = (await dataResponse.json()).data;
  return facts;
};

const DemoGrid = () => {
  const [dataItems, setDataItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const facts = await getCatFacts();
      setDataItems(facts);
    };
    fetchData();
  }, []); // Se ejecuta solo una vez al cargar el componente

  return (
    <DataGrid
      dataSource={dataItems}
      rowAlternationEnabled={true}
      showBorders={true}
    />
  );
};

export default DemoGrid;
