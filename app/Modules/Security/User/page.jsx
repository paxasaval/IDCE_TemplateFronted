"use client";
import React from "react";
import { Table, Button, Space, Typography, Card } from "antd";

const { Title } = Typography;

const dataSource = [
  {
    key: "1",
    name: "ESPINOSA JIMENEZ PAUL ANDRES",
    age: "paespinosa@solidario.fin.ec",
    address: "Amazonas N36-69 Y Corea",
  },
  {
    key: "2",
    name: "BASTIDAS ANDRADE DIEGO FRANCISCO",
    age: "dbastidas@solidario.fin.ec",
    address: "Amazonas N36-69 Y Corea",
  },
  {
    key: "3",
    name: "REINOSO SARANGO GLADYS MARLENE",
    age: "greinoso@solidario.fin.ec",
    address: "Amazonas N36-69 Y Corea",
  },
];

const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Dirección",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Acciones",
    key: "actions",
    render: (_, record) => (
      <Space>
        <Button type="primary" onClick={() => handleEdit(record)}>Editar</Button>
        <Button danger onClick={() => handleDelete(record)}>Eliminar</Button>
      </Space>
    ),
  },
];

const handleEdit = (record) => {
  console.log("Editar:", record);
  // Lógica para editar
};

const handleDelete = (record) => {
  console.log("Eliminar:", record);
  // Lógica para eliminar
};

const handleAddUser = () => {
  console.log("Agregar nuevo usuario");
  // Lógica para agregar un nuevo usuario
};

const UserPage = () => {
  return (
    <div style={{ padding: "90px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", height: "100vh", width: "100vw" }}>


      <Title level={2} style={{ color: "#1890ff", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "2px" }}>
        Gestión de Usuarios
      </Title>

      <div style={{ width: "90%", display: "flex", justifyContent: "flex-start", marginBottom: "10px" }}>
        <Button
          type="primary"
          style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          onClick={handleAddUser}
        >
          Agregar +
        </Button>
      </div>

      <Card style={{ width: "90%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "10px", padding: "20px" }}>
        <Table
          dataSource={dataSource}
          columns={columns}
          size="middle"
          bordered
          pagination={{ pageSize: 5 }}
          style={{ borderRadius: "10px", overflow: "hidden" }}
        />
      </Card>
    </div>
  );
};

export default UserPage;
