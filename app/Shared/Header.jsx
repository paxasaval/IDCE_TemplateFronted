"use client";
import React, { useEffect } from "react";
import { Avatar, Space } from "antd";
import { UserOutlined, BellOutlined, DownOutlined } from "@ant-design/icons";
import { useSelectedUser } from "../Hooks/useSelectedUser";
import { Badge } from "antd";
import { useRouter } from "next/navigation";
import "./styles/header.css"
import dynamic from "next/dynamic";
const DropDownButton = dynamic(() => import("devextreme-react/drop-down-button"), {
  ssr: false,
});
const Header = () => {
  const { selectedUser, clearUser } = useSelectedUser();
  const router = useRouter();
  const handleLogout = () => {
    clearUser();
    router.push("/");
  };
  const logAction = (e) => {
    const action = e.itemData.text;
    console.log(e.itemData.text + " was clicked");//agregar controladores para cada accion
    if(action==="Salir"){
      handleLogout();
    }
  };
  const actions = [
    { id: 1, text: "Perfil", icon: "user" },
    { id: 2, text: "Mensajes", icon: "email" },
    { id: 3, text: "Notificaciones", icon: "bell" },
    { id: 4, text: "Salir", icon: "runner" },
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

            className="bg-blue-300"
            icon={<BellOutlined />}
          />
        </Badge>
        <DropDownButton 
         elementAttr={{ style: "color: white !important;" }}
        stylingMode="text"
        type="normal"
          text={
            selectedUser
              ? `${selectedUser.apellidos} ${selectedUser.nombres}`.toLowerCase()
              : "Invitado"
          }
          icon="user"
          items={actions}
          onItemClick={logAction}
          
        >
        </DropDownButton>
      </div>
    </div>
  );
};
export default Header;
