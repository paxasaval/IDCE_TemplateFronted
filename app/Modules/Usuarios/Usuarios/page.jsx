"use client";
import React, { useCallback } from "react";
import { Column, Editing, Button as GridButton, RequiredRule, Texts, Form, Item  } from "devextreme-react/data-grid";

import "devextreme/dist/css/dx.light.css";
import useUser from "../../../Hooks/useUser";
import { Button } from "devextreme-react/button";
import dynamic from "next/dynamic";
const DataGrid = dynamic(() => import("devextreme-react/data-grid"), { ssr: false });

const UsuariosPage = () => {
  const { empleados } = useUser();

  // Acción para editar
  // const handleEdit = useCallback((e) => {
  //   console.log("Editar empleado:", e.row.data);
  //   alert(`Editar empleado: ${e.row.data.nombre}`);
  // }, []);

  // // Acción para eliminar
  // const handleDelete = useCallback((e) => {
  //   console.log("Eliminar empleado:", e.row.data);
  //   alert(`Eliminar empleado: ${e.row.data.nombre}`);
  // }, []);

  return (
    <div style={{ padding: "5px", maxWidth: "900px", margin: "auto" }}>
      <center><h2 style={{ fontSize: "2.5rem", fontWeight: "bold"}}>Lista de Usuarios</h2></center>
      <DataGrid
        dataSource={empleados}
        showBorders={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
        keyExpr="id" // Asegúrate de que cada objeto tenga un campo "id"
        style={{ fontSize: "12px" }}
      >
        {/* Columnas de la tabla */}
        <Column dataField="id" caption="ID" width={40} />
        <Column dataField="identificacion" caption="Identificación" />
        <Column dataField="nombre" caption="Nombre" />
        <Column dataField="apellidos" caption="Apellidos" />
        <Column dataField="email" caption="Correo Electrónico" />

        {/* Columnas ocultas (se usan en la edición pero no se muestran en la tabla) */}
        <Column dataField="direccion" caption="Dirección" visible={false} />
        <Column dataField="fechaIngreso" caption="Fecha de Ingreso" visible={false} dataType="date" />
        <Column dataField="telefono" caption="Teléfono" visible={false} />
        <Column dataField="cargo" caption="Cargo" visible={false} />
        <Column dataField="codigoCliente" caption="Código Cliente" visible={false} />
        <Column dataField="institucionID" caption="Institución ID" visible={false} />

        {/* Acciones: Editar, Eliminar y Detalles */}
        {/* <Column type="buttons" caption="Acciones" width={200}>
          <GridButton name="edit" onClick={handleEdit} />
          <GridButton name="delete" onClick={handleDelete} />
        </Column> */}

        {/* Configuración de edición */}
        <Editing mode="popup" allowUpdating={true} allowAdding={true} allowDeleting={true} useIcons={true}>
          <Form>
            <Item dataField="identificacion" />
            <Item dataField="nombre" />
            <Item dataField="apellidos" />
            <Item dataField="email" />
            <Item dataField="direccion" />
            <Item dataField="fechaIngreso" editorType="dxDateBox" />
            <Item dataField="telefono" />
            <Item dataField="cargo" />
            <Item dataField="codigoCliente" />
            <Item dataField="institucionID" />
          </Form>
        </Editing>
      </DataGrid>
    </div>
  );
};

export default UsuariosPage;
