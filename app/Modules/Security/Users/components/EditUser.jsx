'use client';
import React from 'react';
import { Modal } from 'antd';
import { Form, Input, Button } from 'antd';
import { useEditUser } from '../../../../Hooks/useEditUser';

const EditUser = ({ isVisible, onClose, onUserUpdated, userToEdit }) => {
  const { editUser, loading, error } = useEditUser();
  const [form] = Form.useForm();//???
  useEffect(() => {
    if (isVisible && userToEdit) {
      form.setFieldsValue({
        userName: userToEdit.nombre,
        userEmail: userToEdit.email,
        userAddress: userToEdit.direccion,
      });
    }
  }, [isVisible, userToEdit, form]);
  const onFinish = async (values) => {
    try {
      const updatedUser = await editUser(values);
      onClose(); // Cerrar modal
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };

  return (
    <Modal title="Editar Usuario" open={isVisible} onOk={onClose} onCancel={onClose} footer={null}>  
      <div className="formContainer">
        <Form
          name="EditUser"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={user}
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
                message: 'Por favor ingrese el nombre',
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
                message: 'Por favor ingrese el correo',
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
                message: 'Por favor ingrese la dirección',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Actualizar Usuario
            </Button>
          </Form.Item>
        </Form> 
      </div>
    </Modal>
  );
};

export default EditUser;