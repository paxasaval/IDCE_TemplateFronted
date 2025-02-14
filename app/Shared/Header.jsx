"use client";
import React, { useEffect } from "react";
import { Avatar, Space } from "antd";
import { UserOutlined, BellOutlined, DownOutlined } from "@ant-design/icons";
import { useSelectedUser } from "../Hooks/useSelectedUser";
import { Badge } from "antd";
import { Dropdown } from "antd";
import { useRouter } from "next/navigation";
const Header = () => {
  const { selectedUser, clearUser } = useSelectedUser();
  const router = useRouter();
  const handleLogout = () => {
    clearUser();
    router.push("/");
  };
  const items = [
    {
      key: "1",
      label: <a href="/">Configuracion</a>,
    },
    {
      key: "2",
      danger:true,
      label: <a onClick={handleLogout}>Salir</a>,
    },
  ];
  return (
    <div className="col-span-5 bg-blue-500 w-full h-2/10 flex justify-end px-2 py-3 ">
      <div className="user flex items-center gap-2">
        <div className="userActions"></div>
        <Badge
          size="small"
          count={selectedUser ? selectedUser.empleadoID : 0}
          icon={<UserOutlined />}
        >
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<BellOutlined />}
          />
        </Badge>
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
        <Dropdown menu={{ items }}>
          <Space>
            <div className="userInfo flex flex-col justify-center items-center">
              <span className="text-white capitalize">{selectedUser ? (`${selectedUser.apellidos} ${selectedUser.nombres}`).toLowerCase() : "Cargando..."}</span>
              <span className="text-xs italic text-white">{selectedUser ? selectedUser.email : "Invitado"}</span>
            </div>
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};
export default Header;
