"use client";
import React, { useState } from "react";
import { Button, Col, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import useUsers from "../../../Hooks/useUser";
import AddUser from "./components/AddUser";
import formatter from "../../../utilities/formatter";
import dynamic from "next/dynamic";
import { locale, loadMessages } from "devextreme/localization";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});
import {
  Column,
  Editing,
  RequiredRule,
  Texts,
} from "devextreme-react/data-grid";

const UsersPage = () => {
  //Table data
  /* const columnsTable = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (user) => (
        <div className="actions flex gap-2">
          <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(user)}>
            Editar
          </Button>
          <Button color="danger" variant="solid" icon={<DeleteOutlined />} onClick={() => showModal(user)}>
            Eliminar
          </Button>
        </div>
      ),
    }
  ]; */
  const { users, isLoading, error, fetchUsers } = useUsers();

  const [titleForm, setTitleForm] = useState("");

  var dataItems = [];
  //esperar que la data este cargada para actualizar el dataSource
  if (!isLoading) {
    dataItems = users.map((user) => ({
      id: user.empleadoID,
      name: formatter.capitalize(`${user.apellidos} ${user.nombres}`),
      address: user.direccion,
      email: user.email,
      dateEntry: user.fechaIngreso,
      phone: user.telefono,
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
    <div className="container w-full h-full px-4 py-8">
      <h2 className="h2">Usuarios</h2>
      <div className="content w-full">
        <div className="containerTable w-full h-full py-2 px-2">
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <DataGrid
              allowColumnReordering
              dataSource={dataItems}
              onSaved={onRowUpdated}
              onRowUpdating={onRowUpdated}
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
                    cssClass:"bg-blue-500 text-white",
                    onClick: () => {
                      e.component.addRow();
                    },
                  },
                });
              }}
            >
              <Column dataField="id" caption="ID"></Column>
              <Column dataField="name" caption="Nombres"></Column>
              <Column dataField="address" caption="Dirección"></Column>
              <Column dataField="email" caption="Email"></Column>
              <Column
                dataField="dateEntry"
                dataType="date"
                caption="Fecha Ingreso"
              ></Column>
              <Column dataField="phone" caption="Teléfono"></Column>
              <Editing
                mode="popup"
                allowUpdating={true}
                allowDeleting={true}
                allowAdding={true}
                editColumnName="Acciones"
                useIcons={true}
                popup={{
                  title: 'Añadir / Editar Usuario',
                  showTitle: true,
                }}
              >
                <Texts
                  cancelRowChanges="Cancelar"
                  editRow="Editar"
                  saveRowChanges="Guardar"
                  confirmDeleteMessage="Estas seguro de querer eliminar este Usuario?"
                  addRow="Añadir Usuario"
                ></Texts>
              </Editing>
            </DataGrid>
          )}
        </div>
      </div>
    </div>
  );
};
export default UsersPage;
