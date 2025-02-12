"use client";
import React from "react";
import { Avatar, Menu } from "antd";
import { LockOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import useUser from "../Hooks/useUser";
const SideBar = () => {
  const { users, isLoading, error } = useUser();

  if (isLoading)
    return (
      <p className="row-span-9 row-start-2 w-full">Cargando usuarios...</p>
    );
  if (error) return <p className="row-span-9 row-start-2 w-full">{error}</p>;

  const userMenuSubItems = users.map((user) => ({
    label: (
      <Link href={`/Modules/Admin/Users/${user.empleadoID}`}>
        {user.nombre}
      </Link>
    ),
    key: `user-${user.empleadoID}`,
  }));

  //console.log('Usuarios en el componente:', users);
  return (
    <div className="row-span-9 row-start-2 w-full bg-neutral-50 overflow-y-auto overflow-x-hidden">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "Modules/Admin",
            icon: <UserOutlined />,
            label: "Administrador",
            children: userMenuSubItems,
          },
          {
            key: "2",
            icon: <ShoppingOutlined />,
            label: "Menus",
            children: [
              {
                label: <Link href={`/Modules/Productos`}>Productos</Link>,
                key: `test`,
              },
            ],
          },
          {
            key: "3",
            icon: <LockOutlined />,
            label: "Seguridad",
            children: [
              {
                label: <Link href={`/Modules/Security/Profile`}>Perfiles</Link>,
                key: `Perfiles`,
              },
              {
                label: <Link href={`/Modules/Security/Users`}>Usuarios</Link>,
                key: `Usuarios`,
              },
            ],
          },
        ]}
      />
    </div>
  );
};
export default SideBar;
