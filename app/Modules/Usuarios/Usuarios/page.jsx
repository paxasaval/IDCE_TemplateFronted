"use client";
import React, { useState } from "react";
import useUsers from "../../../Hooks/useUser";
import formatter from "../../../utilities/formatter";
import dynamic from "next/dynamic";


const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

const Column = dynamic(
  () => import("devextreme-react/data-grid").then((mod) => mod.Column),
  {
    ssr: false,
  }
);
const ColumnChooser = dynamic(
  () => import("devextreme-react/data-grid").then((mod) => mod.ColumnChooser),
  {
    ssr: false,
  }
);
const Lookup = dynamic(
  () => import("devextreme-react/data-grid").then((mod) => mod.Lookup),
  {
    ssr: false,
  }
);
const Editing = dynamic(
  () => import("devextreme-react/data-grid").then((mod) => mod.Editing),
  {
    ssr: false,
  }
);

import { Item } from "devextreme-react/form";

import { Texts,RequiredRule,Form,EmailRule } from "devextreme-react/data-grid";

const UsersPage = () => {
 
  const { users, isLoading, error, fetchUsers } = useUsers();

  const positions = [
    { ID: 1, Name: "Director" },
    { ID: 2, Name: "Jefe de Sección" },
    { ID: 3, Name: "Jefe de Departamento" },
    { ID: 4, Name: "Jefe de División" },
  ];
  const areas = [
    {ID:1,Name:"Area 1"},
    {ID:2,Name:"Area 2"},
    {ID:3,Name:"Area 3"}

  ]
  var dataItems = [];
  //esperar que la data este cargada para actualizar el dataSource
  if (!isLoading) {
    dataItems = users.map((user) => ({
      id: user.empleadoID,
      instituteID: user.institucionID,
      identification: user.identificacion,
      name: formatter.capitalize(user.nombres),
      lastName: formatter.capitalize(user.apellidos),
      fullname: formatter.capitalize(`${user.apellidos} ${user.nombres}`),
      address: formatter.capitalize(user.direccion),
      email: user.email,
      dateEntry: user.fechaIngreso,
      phone: user.telefono,
      area: user.area,
      position: user.cargo,
      internalCode: user.codigoInterno,
      clientCode: user.codigoCliente,
      state: user.estado,
    }));
  }
  //endTable data
  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    console.log("Closed");
    setIsModalOpen(false);
  };

  //end Modal

  const onRowUpdated = (e) => {
    console.log("Actualizando:", e);
  };

  const onRowDeleted = (e) => {
    console.log("Borrando:", e.data);
  };

  return (
    <div className="container w-full h-full px-2 py-4">
      <h2 className="h2">Usuarios</h2>
      <div className="content w-full">
        <div className="containerTable w-full h-full py-2 px-2">
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <DataGrid
              allowColumnReordering={true}
              allowColumnResizing={true}
              columnFixing={true}
              columnAutoWidth={true}
              dataSource={dataItems}
              onSaved={onRowUpdated}
              onRowRemoved={onRowDeleted}
              onToolbarPreparing={(e) => {
                e.toolbarOptions.items = e.toolbarOptions.items.filter(
                  (item) => item.name !== "addRowButton"
                );
                e.toolbarOptions.items.unshift({
                  location: "after",
                  widget: "dxButton",
                  options: {
                    icon: "plus",
                    text: "Añadir Usuario",
                    cssClass: "bg-blue-500 text-white",
                    onClick: () => {
                      e.component.addRow();
                    },
                  },
                });
              }}
            >
              <Column dataField="id" caption="ID" visible={false}></Column>
              <Column
                dataField="instituteID"
                caption="Institución"
                visible={false}
              >
                <RequiredRule />
              </Column>
              <Column
                dataField="identification"
                caption="Identificación"
                visible={false}
              ></Column>
              <Column dataField="lastName" caption="Apellidos">
                <RequiredRule />
              </Column>
              <Column dataField="name" caption="Nombres">
                <RequiredRule />
              </Column>

              <Column dataField="address" caption="Dirección">
                <RequiredRule />
              </Column>
              <Column dataField="email" caption="Email">
                <EmailRule />
                <RequiredRule />
              </Column>
              <Column
                dataField="dateEntry"
                dataType="date"
                caption="Fecha Ingreso"
              ></Column>
              <Column dataField="phone" caption="Teléfono">
                <RequiredRule />
              </Column>
              <Column dataField="area" caption="Area" visible={false}>
              <Lookup dataSource={areas} valueExpr="ID" displayExpr="Name"/>
              </Column>
              <Column dataField="position" caption="Cargo">
                <RequiredRule />
                <Lookup
                  dataSource={positions}
                  valueExpr="ID"
                  displayExpr="Name"
                />
              </Column>
              <Column
                dataField="internalCode"
                caption="Codigo Interno"
                visible={false}
              ></Column>
              <Column
                dataField="clientCode"
                caption="Codigo Cliente"
                visible={false}
              ></Column>
              <Column
                dataField="state"
                caption="Estado"
                visible={false}
              ></Column>
              <Editing
                mode="popup"
                allowUpdating={true}
                allowDeleting={true}
                allowAdding={true}
                editColumnName="Acciones"
                useIcons={true}
                popup={{
                  title: "Añadir / Editar Usuario",
                  showTitle: true,
                }}
              >
                <Form>
                  <Item itemType="group" caption="Informacion Personal">
                    <Item dataField="identification"></Item>
                    <Item dataField="name"></Item>
                    <Item dataField="lastName"></Item>
                    <Item dataField="address"></Item>
                    <Item dataField="email"></Item>
                    <Item dataField="phone"></Item>
                  </Item>
                  <Item itemType="group" caption="Datos de la Institución">
                    <Item dataField="instituteID"></Item>
                    <Item dataField="area"></Item>
                    <Item dataField="position"></Item>
                    <Item dataField="internalCode"></Item>
                    <Item dataField="clientCode"></Item>
                  </Item>
                </Form>
                <Texts
                  cancelRowChanges="Cancelar"
                  editRow="Editar"
                  saveRowChanges="Guardar"
                  confirmDeleteMessage="Estas seguro de querer eliminar este Usuario?"
                  deleteRow="Eliminar"
                  addRow="Añadir Usuario"
                ></Texts>
              </Editing>
              <ColumnChooser title="Selector de columnas" enabled={true} />
            </DataGrid>
          )}
        </div>
      </div>
    </div>
  );
};
export default UsersPage;
