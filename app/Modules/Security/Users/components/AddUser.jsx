'use client';
import React from "react";
import { Modal } from "antd";
import { Form, Input, Button } from "antd";
import { postUser } from "../../../../Services/userService";
import useAddUser from "../../../../Hooks/useAddUser";

const AddUser = ({ isVisible, onClose, onUserAdded }) => {
  //Form submitSuccess
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addUser, loading, error } = useAddUser();

  const onFinish = async (values) => {
    setIsSubmitting(true);
    const newUser = {
      nombre: values.userName,
      direccion: values.userAddress,
      email: values.userEmail,
    };
    try {
        await addUser(newUser);
        message.success("Usuario creado con éxito");
        onUserAdded(); // Recargar usuarios
        onClose(); // Cerrar modal
      } catch (error) {
        message.error("Error al crear el usuario");
      } finally {
        setIsSubmitting(false);
      }
  };
  //Form submitFailed
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal title="Añadrir Usuario" open={isVisible} onOk={onClose} onCancel={onClose} footer={null}>
      <div className="formContainer">
        <Form
          name="AddUser"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre"
            name="userName"
            rules={[
              {
                required: true,
                message: "Porfavor ingrese el nombre",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="userEmail"
            rules={[
              {
                required: true,
                message: "Porfavor ingrese el correo",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Dirección"
            name="userAddress"
            rules={[
              {
                required: true,
                message: "Porfavor ingrese la dirección",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
                Crear Usuario
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddUser;
