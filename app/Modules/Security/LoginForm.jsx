"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



const LoginForm = () => {
  const router = useRouter(); // Inicializamos useRouter
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [DevComponents, setDevComponents] = useState(null);

  // const onFinish = (values) => {
  //   // console.log('Received values of form: ', values);

  //   if (values.username === "admin" && values.password === "123") {
  //       message.success("Login successful!");
  //       router.push("/Modules"); // Redirige a layout.jsx
  //     } else {
  //       message.error("Usuario o contraseña incorrectos");
  //     }
  // };
  useEffect(() => {
    import("devextreme-react/text-box").then((module) => {
      import("devextreme-react/button").then((buttonModule) => {
        import("devextreme/ui/notify").then((notifyModule) => {
          setDevComponents({
            TextBox: module.TextBox,
            Button: buttonModule.Button,
            notify: notifyModule.default,
          });
        });
      });
    });
  }, []);

  if (!DevComponents) return <p>Cargando...</p>;

  const { TextBox, Button, notify } = DevComponents;

  const onLogin = () => {
    if (username === "admin" && password === "123") {
      notify("¡Inicio de sesión exitoso!", "success", 2000);
      router.push("/Modules"); // Redirige a layout.jsx
    } else {
      notify("Usuario o contraseña incorrectos", "error", 2000);
    }
  };



  return (


    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">

        {/* Logo en la parte superior */}
        <div className="mb-4">
          <img
            src="/assets/images/icons/logo2.png"
            alt="Logo"
            className="h-12 w-32 cursor-pointer"
            onClick={() => router.push("/Modules")}
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>

        <div className="mb-4 w-full">
          <TextBox
            placeholder="Usuario"
            value={username}
            onValueChanged={(e) => setUsername(e.value)}
            className="w-full"
          />
        </div>

        <div className="mb-4 w-full">
          <TextBox
            placeholder="Contraseña"
            mode="password"
            value={password}
            onValueChanged={(e) => setPassword(e.value)}
            className="w-full"
          />
        </div>

        <Button
          text="Ingresar"
          type="default"
          stylingMode="contained"
          width="100%"
          onClick={onLogin}
        />
      </div>
    </div>
  );
};

export default LoginForm;
