
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
      <br></br>
      <center><h1 className="text-4xl md:text-10xl font-bold mb-4">LOGIN</h1></center>
      <br></br>
      <LoginForm />     
    </div>
  );
};
export default Home
