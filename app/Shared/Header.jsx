"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Space } from "antd";
import { UserOutlined, BellOutlined, DownOutlined } from "@ant-design/icons";
import { useSelectedUser } from "../Hooks/useSelectedUser";
import { Badge } from "antd";
import { useRouter } from "next/navigation";
import "./styles/header.css";
import dynamic from "next/dynamic";

const Toolbar = dynamic(() => import("devextreme-react/toolbar"), {
  ssr: false,
  loading: () => <div className="w-10 h-10" />,
});
const Item = dynamic(
  () => import("devextreme-react/toolbar").then((mod) => mod.Item),
  {
    ssr: false,
  }
);
const DropDownButton = dynamic(
  () => import("devextreme-react/drop-down-button"),
  {
    ssr: false,
  }
);
const Header = ({ onMenuClick }) => {
  const { selectedUser, clearUser } = useSelectedUser();
  const router = useRouter();
  const [ badgeTest, setBadgeTest ] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Aseguramos que los componentes estén cargados
    setIsLoaded(true);
  }, []);

  const handleLogout = () => {
    clearUser();
    router.push("/");
  };

  const handleNotifications = () => {
    router.push("/Modules/MiPerfil/Notificaciones");
  };
  const handleConfiguration = () => {
    router.push("/Modules/MiPerfil/Configuracion");
  };
  const handleMessages = () => {
    router.push("/Modules/MiPerfil/Mensajes");
  };
  const logAction = (e) => {
    const action = e.itemData.text;
    console.log(e.itemData.text + " was clicked"); //agregar controladores para cada accion
    if (action === "Salir") {
      handleLogout();
    }
    if (action === "Perfil") {
      handleConfiguration()
    }
    if (action === "Mensajes") {
      handleMessages()
    }
    if (action === "Notificaciones") {
      handleNotifications()
    }
  };
  const actions = [
    { id: 1, text: "Perfil", icon: "user" },
    { id: 2, text: "Mensajes", icon: "email" },
    { id: 3, text: "Notificaciones", icon: "bell" },
    { id: 4, text: "Salir", icon: "runner" },
  ];

  return (
    <div className="header bg-primary w-full flex items-center justify-between px-2 py-3 ">
      <div className="header-toolbar flex items-center">
        {isLoaded ? (
          <Toolbar width={40} height={40}>
            <Item
              widget="dxButton"
              location="before"
              options={{
                icon: "menu",
                onClick: onMenuClick,
                stylingMode: "text",
                type: "normal",
                width: 40,
                height: 40,
              }}
            />
          </Toolbar>
        ) : (
          <div className="w-10 h-10" />
        )}
      </div>

      <div className="user w-1/6 flex items-center justify-around gap-2">
        <div className="relative userActions">
          <Toolbar>
            <Item
              widget="dxButton"
              location="before"
              options={{
                icon: "bell",
                onClick: handleNotifications,
                stylingMode: "text",

                type: "normal",
                width: 40,
                height: 40,
              }}
            />
          </Toolbar>
          {selectedUser?(
            <div className="absolute top-1 left-4 w-4 h-4 flex justify-center items-center bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {selectedUser?.empleadoID}
            </div>):
            <div></div>
            }
        </div>
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
        ></DropDownButton>
      </div>
    </div>
  );
};
export default Header;
