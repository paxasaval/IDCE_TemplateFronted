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
      <p><strong>Identificacion:</strong> {empleado.identificacion}</p>
      <p><strong>Nombre:</strong> {empleado.nombres}</p>
      <p><strong>Apellidos:</strong> {empleado.apellidos}</p>
      <p><strong>Dirección:</strong> {empleado.direccion}</p>
      <p><strong>Fecha de Ingreso:</strong> {empleado.fechaIngreso}</p>
      <p><strong>Email:</strong> {empleado.email}</p>
      <p><strong>Telefono:</strong> {empleado.telefono}</p>
    </div>
  );
};

export default ProfilePage;