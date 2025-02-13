"use client";
import React, { useState } from "react";
import { Button, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import useUsers from "../../../Hooks/useUser";
import AddUser from "./components/addUser";
const UsersPage = () => {
  //Table data
  const columns = [
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
  ];
  const { users, isLoading, error, fetchUsers } = useUsers();
  var dataSource = [];
  //esperar que la data este cargada para actualizar el dataSource
  if (!isLoading) {
    dataSource = users.map((user) => ({
      key: user.empleadoID,
      id: user.empleadoID,
      name: user.apellidos +" "+user.nombres,
      address: user.direccion,
      email: user.email,
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
  
  return (
    <div className="container w-full h-full px-4 py-8">
      <h2 className="h2">Usuarios</h2>
      <div className="content w-full">
        <div className="actions w-full py-4 px-2 flex justify-end">
          <Button type="primary" icon={<PlusCircleOutlined/>} onClick={showModal}>
            Añadir Usuario
          </Button>
          <AddUser isVisible={isModalOpen} onClose={handleClose} onUserAdded={fetchUsers} />
        </div>
        <div className="containerTable w-full h-full py-2 px-2">
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <Table columns={columns} dataSource={dataSource} />
          )}
        </div>
      </div>
    </div>
  );
};
export default UsersPage;
