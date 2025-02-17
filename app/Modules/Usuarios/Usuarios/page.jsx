"use client";
import React, { useCallback } from "react";
import { DataGrid, Column, Editing, Button as GridButton } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.light.css";
import useUser from "../../../Hooks/useUser";
import { Button } from "devextreme-react/button";

const UsuariosPage = () => {
  const { empleados } = useUser();

  // Acción para editar
  const handleEdit = useCallback((e) => {
    console.log("Editar empleado:", e.row.data);
    alert(`Editar empleado: ${e.row.data.nombre}`);
  }, []);

  // Acción para eliminar
  const handleDelete = useCallback((e) => {
    console.log("Eliminar empleado:", e.row.data);
    alert(`Eliminar empleado: ${e.row.data.nombre}`);
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <DataGrid
        dataSource={empleados}
        showBorders={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
        keyExpr="id" // Asegúrate de que cada objeto tenga un campo "id"
      >
        {/* Columnas de la tabla */}
        <Column dataField="id" caption="ID" width={80} />
        <Column dataField="nombre" caption="Nombre" />
        <Column dataField="email" caption="Correo Electrónico" />
        <Column dataField="telefono" caption="Teléfono" />

        {/* Acciones: Editar y Eliminar */}
        <Column type="buttons" caption="Acciones" width={200}>
          <GridButton name="edit" onClick={handleEdit} />
          <GridButton name="delete" onClick={handleDelete} />
          <GridButton
            render={() => (
              <Button text="Detalles" type="default" onClick={() => alert("Detalles del usuario")} />
            )}
          />
        </Column>

        {/* Configuración de edición */}
        <Editing mode="row" allowUpdating={true} allowDeleting={true} />
      </DataGrid>
    </div>
  );
};

export default UsuariosPage;
