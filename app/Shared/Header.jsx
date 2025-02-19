"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";

const Header = ({ toggleSidebar }) => {
  const router = useRouter();

  // Función para manejar la salida
  const handleLogout = () => {
    console.log("Cerrando sesión...");
    router.push("/"); // Redirige a la página de login
  };

  // Opciones del menú desplegable
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
      {/* Logo */}
      <div className="logo flex items-center">
        <img
          src="/assets/images/icons/logo2.png"
          alt="Logo"
          className="h-10 w-24 ml-6 cursor-pointer"
          onClick={() => router.push("/Modules")}
        />

        {/* Botón para ocultar/mostrar el SideBar */}
        <button
          onClick={toggleSidebar}
          className="ml-4 text-white bg-transparent px-3 py-1 rounded hover:bg-gray-700 transition"
        >
          ☰
        </button>
      </div>

      {/* Usuario */}
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className="flex gap-2 cursor-pointer mr-6">
          <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
          <div className="flex flex-col justify-center items-start">
            <span>David Paca Cepeda</span>
            <span className="text-xs">Administrador</span>
          </div>
          <DownOutlined className="text-sm text-black" />
        </div>
      </Dropdown>
    </div>
  );
};

export default Header;
