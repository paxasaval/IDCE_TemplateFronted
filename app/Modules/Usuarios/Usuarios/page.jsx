"use client";
import React from "react";
// import { Column, Editing, Button as GridButton, RequiredRule, Texts, Form, Item, Toolbar, Item as ToolbarItem } from "devextreme-react/data-grid";
import { Column, Editing, Button as GridButton, RequiredRule, Texts, Form, Item, ColumnChooser } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.light.css";
import useUser from "../../../Hooks/useUser";
import { Button } from "devextreme-react/button";
import dynamic from "next/dynamic";
const DataGrid = dynamic(() => import("devextreme-react/data-grid"), { ssr: false });

const UsuariosPage = () => {
  const { empleados } = useUser();

  const renderColumns = () => (
    <>
      {/* Columnas de la tabla */}
      <Column dataField="id" caption="ID" width={40} />
      <Column dataField="identificacion" caption="Identificación" />
      <Column dataField="nombre" caption="Nombre" />
      <Column dataField="apellidos" caption="Apellidos" />
      <Column dataField="email" caption="Correo Electrónico" />
      <Column dataField="telefono" caption="Teléfono" />
      <Column dataField="direccion" caption="Dirección" />
      <Column dataField="fechaIngreso" caption="Fecha de Ingreso" dataType="date" />

      {/* Columnas ocultas (se usan en la edición pero no se muestran en la tabla) */}
      <Column dataField="cargo" caption="Cargo" visible={false} />
      <Column dataField="codigoCliente" caption="Código Cliente" visible={false} />
      <Column dataField="institucionID" caption="Institución ID" visible={false} />
      {/* Columna de Acciones */}
      <Column type="buttons" caption="Acciones" width={150}>
        <GridButton name="edit" />
        <GridButton name="delete" />
      </Column>
    </>
  );

  const popupOptions = {
    title: 'Información del Empleado',
    showTitle: true,
    width: 700,
  };

  // const editingTexts = {
  //   addRow: "Nuevo",
  // //   // editRow: "Editar",
  // //   // deleteRow: "Eliminar",
  // //   // Cancel: "Cancelar",
  // //   // Save: "Guardar",
  // //   confirmDeleteMessage: "¿Está seguro de que desea eliminar este registro?"
  // }

  const onToolbarPreparing = (e) => {
    e.toolbarOptions.items = e.toolbarOptions.items.filter(
      (items) => items.name !== "addRowButton"
    );
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'add',
        text: 'Nuevo',
        onClick: () => {
          e.component.addRow();
        }
      }
    });
  }

  return (
    // <div style={{  maxWidth: "400px" }}>
    <div>
      <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Lista de Usuarios</h2>
      <div style={{ minWidth: "1250px", margin: "auto", paddingRight: "5px", paddingLeft: "5px" }}>
        <DataGrid
          dataSource={empleados}
          showBorders={true}
          rowAlternationEnabled={true}
          columnAutoWidth={true}
          keyExpr="id" // Asegúrate de que cada objeto tenga un campo "id"
          style={{ fontSize: "12px" }}
          onToolbarPreparing={onToolbarPreparing}
        >

          {/* Configuración de edición */}
          {renderColumns()}

          <Editing
            mode="popup"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
            useIcons={true}
            popup={popupOptions}
          // texts={editingTexts}
          >
            <Texts
              addRow="Nuevo"
              saveRowChanges="Guardar"
              cancelRowChanges="Cancelar"
              editRow="Editar"
              deleteRow="Eliminar"
              confirmDeleteMessage="¿Está seguro de que desea eliminar este registro?"
            />

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
          <ColumnChooser title="Columnas" enabled={true} width={300} />
        </DataGrid>
      </div>
    </div>
  );
};

export default UsuariosPage;
