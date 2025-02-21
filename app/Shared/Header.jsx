"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";

const Header = ({ toggleSidebar }) => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    router.push("/");
  };

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
    <div className="col-span-7 row-span-2 flex justify-between items-center p-2" style={{ backgroundColor: "#337ab7" }}>
      <div className="logo flex items-center">
        <img
          src="/assets/images/icons/logo2.png"
          alt="Logo"
          className="h-10 w-24 ml-6 cursor-pointer"
          onClick={() => router.push("/Modules")}
        />

        {/* Botón para alternar el SideBar */}
        <button
          onClick={toggleSidebar}
          className="ml-4 text-white bg-transparent px-3 py-1 rounded hover:bg-gray-700 transition"
        >
          ☰
        </button>
      </div>

      <div className="flex items-center mr-10">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div className="flex gap-2 cursor-pointer">
            <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
            <div className="flex flex-col justify-center items-start">
              <span className="text-white">David Paca Cepeda</span>
              <span className="text-xs text-white">Administrador</span>
            </div>
            <div className="ml-4">
              <DownOutlined className="text-sm text-white" />
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
