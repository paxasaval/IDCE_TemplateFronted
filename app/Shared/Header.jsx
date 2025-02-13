"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";

const Header = () => {
  const router = useRouter();

  // Función para manejar la acción de salida
  const handleLogout = () => {
    console.log("Cerrando sesión...");
    router.push("/"); // Redirige a la página de login
  };

  // Menú desplegable con opciones
  const items = [
    {
      key: "profile",
      label: "Mi perfil",
      icon: <UserOutlined />,
      onClick: () => router.push("/Modules/Profile"),
    },
    {
      key: "logout",
      label: "Salir",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="bg-blue-500 w-full flex justify-between items-center p-2">
      {/* Logo a la izquierda */}
      <div className="logo" onClick={() => router.push("/Modules")}  >
        <img 
          src="/assets/images/icons/logo2.png" 
          alt="Logo" 
          style={{ height: "40px", width: "90px", marginLeft: "25px" }}
        />
      </div>

      {/* Usuario a la derecha */}
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className="user flex gap-2 cursor-pointer" style={{ marginRight: "25px" }}>
          <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
          <div className="userInfo flex flex-col justify-center items-center">
            <span>David Paca Cepeda</span>
            <span className="text-xs">Administrador</span>
          </div>
          <DownOutlined style={{ fontSize: "12px", color: "#000" }} />
        </div>
      </Dropdown>
    </div>
  );
};

export default Header;
