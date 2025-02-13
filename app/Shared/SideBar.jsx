"use client";
import React, { useRef, useEffect } from "react";
// import React from 'react';
import { Avatar, Menu } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import useUser from "../Hooks/useUser"; // Importamos el hook
import { useRouter } from "next/navigation";
const SideBar= ()=> {
  const { empleados } = useUser(); // Obtenemos los empleados del hook
  const router = useRouter(); // Usamos el router para la navegación  
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && empleados.length > 0) {
      console.log("VER A LOS EMPLEADOS:", empleados); // Solo imprime una vez
      isFirstRender.current = false;
    }
  }, [empleados]);

  return (
    <div className='bg-neutral-50 w-1/4 h-screen'>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: "Modules/Admin",
            icon: <UserOutlined />,
            label: "Administrador",
            children: empleados.map((Empleado) => ({
                key: `${Empleado.empleadoID}`,
                label: `${Empleado.nombre}`,
                onClick: () => router.push(`/Modules/Admin/Profile?empleadoID=${Empleado.empleadoID}`), // Navegar con el ID
              })),
          },

          {
            key: 'Modules/Productos',
            icon: <UserOutlined />,
            label: 'Productos',
            children: [
              {
                label: <Link href="/Modules/Productos">Option 1</Link>,                
                key: 'setting:1',
              },
             
            ],
          },

          {
            key: '3',
            icon: <UserOutlined />,
            label: 'Seguridad',
            children: [
              {
                label: <Link href="/Modules/Security/User">Usuarios</Link>,
                key: 'setting:2',
              },
             
            ],
          },
        ]}
      />
    </div>
  );
};
export default SideBar