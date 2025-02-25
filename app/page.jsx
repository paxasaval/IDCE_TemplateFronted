"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelectedUser } from "./Hooks/useSelectedUser";
import { useLogginUser } from "./Hooks/useLogginUser";
import { SimpleItem, EmailRule, ButtonItem, RequiredRule } from "devextreme-react/form";
import dynamic from "next/dynamic";
const Form = dynamic(() => import("devextreme-react/form").then((mod) => mod.Form), { ssr: false });

const Login = () => {
  const { selectUser } = useSelectedUser();
  const { user, isLoading, error } = useLogginUser();

  const [loadingForm, setLoadingForm] = useState(false);
  const [formData, setFormData] = useState({
    mail: "john@example.com",
    password: "123456",
  });
  const router = useRouter();

  // Procesamiento del login (sin depender de formRef)
  const processLogin = async () => {
    if (isLoading || loadingForm) {
      return;
    }

    setLoadingForm(true);
    console.log("Processing login with data:", formData);

    try {
      if (user) {
        selectUser(user);
        router.push("/Modules");
      } else {
        console.error("No user found");
        // Aquí podrías mostrar un mensaje de error
      }
    } catch (err) {
      console.error("Error logging in:", err);
    } finally {
      setLoadingForm(false);
    }
  };

  // Manejador para cuando cambia algún campo del formulario
  const handleFieldDataChanged = (e) => {
    const { dataField, value } = e.component.option();
    setFormData(prev => ({
      ...prev,
      [dataField]: value
    }));
  };

  // Manejador de submit sin depender de formRef
  const handleFormSubmit = (e) => {
    e.preventDefault && e.preventDefault(); // Previene la recarga si el evento lo permite
    processLogin();
    return false;
  };

  const getPasswordOptions = useCallback(
    () => ({
      mode: 'password',
      valueChangeEvent: 'change',
    }),
    [],
  );

  // Opciones del botón de submit
  const submitButtonOptions = {
    text: "Iniciar sesión",
    type: 'default',
    useSubmitBehavior: false, // Cambiado a false para manejar el click manualmente
    width: '100%',
    horizontalAlignment: 'center',
    onClick: () => processLogin(),
  };

  return (
    <div className="container w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-800 to-indigo-900">
      <div className="w-1/4 h-2/5 cardForm flex flex-col gap-6 items-center justify-center bg-neutral-100 border-neutral-200 border-2 border-solid py-8 px-4 rounded-md shadow-[16px_16px_16px_0px_#0000004d]">
        <div className="logo">
          <img src="/assets/logo.png" alt="logo"  />
        </div>
        <div className="contentForm">
          <Form 
            formData={formData}
            onFieldDataChanged={handleFieldDataChanged}
          >
            <SimpleItem 
              dataField="mail" 
              isRequired={true}
              editorOptions={{
                onValueChanged: (e) => setFormData(prev => ({ ...prev, mail: e.value }))
              }}
            >
              <EmailRule />
            </SimpleItem>
            <SimpleItem 
              dataField="password" 
              isRequired={true} 
              editorType="dxTextBox"
              editorOptions={{
                ...getPasswordOptions(),
                onValueChanged: (e) => setFormData(prev => ({ ...prev, password: e.value }))
              }}
            >
              <RequiredRule message="Password is required" />
            </SimpleItem>
            <ButtonItem buttonOptions={submitButtonOptions} horizontalAlignment="center"/>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;