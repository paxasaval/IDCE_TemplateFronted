"use client";
import React, { use, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useRouter } from "next/navigation";
import { useSelectedUser } from "./Hooks/useSelectedUser";
import { useLogginUser } from "./Hooks/useLogginUser";

const Login = () => {
  const { selectUser } = useSelectedUser();
  const { user, isLoading, error } = useLogginUser();

  const [loadingForm, setLoadingForm] = useState(false);
  const router = useRouter();
  //submit login form
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setLoadingForm(true);
    if (isLoading) {
      return; // No hace nada si el usuario está cargando
    }
    try {
      if (user) {
        selectUser(user); // Estableces el usuario en el contexto
        router.push("/Modules"); // Rediriges al usuario
      } else {
        console.error("No user found");
        // Mostrar un mensaje de error si no se encontró el usuario
      }
    } catch (err) {
      console.error("Error logging in:", err); // Manejas el error, si lo hay
    } finally {
      setLoadingForm(false); // Detienes el estado de carga del formulario
    }
  };
  //end submit login form
 
  return (
    <div className="container w-full h-screen flex justify-center items-center">
      <div className="cardForm flex flex-col gap-4 items-center border-neutral-200 border-2 border-solid py-8 px-4 rounded-md shadow-[16px_16px_16px_0px_#0000004d]">
        <div className="logo">
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <div className="contentForm">
          <Form
            name="login"
            initialValues={{
              remember: true,
            }}
            style={{
              maxWidth: 360,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={loadingForm}
              >
                Log in
              </Button>
              or <a href="">Register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
