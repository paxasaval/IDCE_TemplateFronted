
"use client"; 
import React from 'react';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, Checkbox, Form, Input, Flex } from 'antd';
import LoginForm from "./Modules/Security/LoginForm";

const Home= ()=> {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      <br></br>
      <center><h1>Bienvenido</h1></center>
      <br></br>
      <LoginForm />     
    </div>
  );
};
export default Home
