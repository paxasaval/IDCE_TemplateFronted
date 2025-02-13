"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import useUser from "../../../Hooks/useUser";
import SideBar from "../../../Shared/SideBar";
import Header from "../../../Shared/Header";

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const empleadoID = searchParams.get("empleadoID"); // Obtener el ID de la URL
  const { empleados } = useUser();

  // Buscar el empleado en la lista
  const empleado = empleados.find((e) => e.empleadoID === Number(empleadoID));

  if (!empleado) {
    return <p>No se encontró el empleado</p>;
  }

  return (
    <div>
      <h2>Perfil del Empleado</h2>
      <p><strong>Nombre:</strong> {empleado.nombre}</p>
      <p><strong>Dirección:</strong> {empleado.direccion}</p>
      <p><strong>Email:</strong> {empleado.email}</p>
    </div>
  );
};

export default ProfilePage;