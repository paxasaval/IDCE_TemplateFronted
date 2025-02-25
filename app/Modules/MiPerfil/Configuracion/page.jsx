"use client";
import React, { useState, useRef } from "react";
import Tabs from "devextreme-react/tabs";
import TextBox from "devextreme-react/text-box";
import { Button } from "devextreme-react";
import FileUploader from "devextreme-react/file-uploader";
import Popup from "devextreme-react/popup";
import "./styles/configurationPage.css";

// Componente para la pestaña de Datos Personales
const PersonalData = () => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "John",
    lastName: "Doe",
    email: "john@example.com",
    address: "123 Main St"
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("/assets/user-1.jpg");
  const fileUploaderRef = useRef(null);
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");
  
  // Estados para el popup de cambio de contraseña
  const [passwordPopupVisible, setPasswordPopupVisible] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordConfirmPopupVisible, setPasswordConfirmPopupVisible] = useState(false);

  // Manejador para cambios en los campos de texto
  const handleInputChange = (field, e) => {
    setFormData({
      ...formData,
      [field]: e.value
    });
  };

  // Manejador para cambios en los campos del formulario de contraseña
  const handlePasswordInputChange = (field, e) => {
    setPasswordFormData({
      ...passwordFormData,
      [field]: e.value
    });
  };

  // Manejador para cambios en la imagen
  const handleImageChange = (e) => {
    const file = e.value[0];
    if (file) {
      setImageFile(file);
      
      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      console.log("Imagen seleccionada:", file.name);
      console.log("Tipo de archivo:", file.type);
      console.log("Tamaño:", (file.size / 1024).toFixed(2) + " KB");
    }
  };

  // Función para enviar la imagen al backend
  const sendImageToBackend = (file) => {
    if (!file) return;

    // Aquí crearíamos un FormData para enviar al backend
    const formDataToSend = new FormData();
    formDataToSend.append('userImage', file);
    formDataToSend.append('userId', '123'); // Suponiendo que tenemos un userId
    
    console.log("Preparando para enviar imagen al backend");
    console.log("Nombre del archivo:", file.name);
    console.log("Tipo:", file.type);
    console.log("Tamaño:", (file.size / 1024).toFixed(2) + " KB");
    
    // Simulación de envío al backend
    console.log("FormData preparado para envío al backend:", formDataToSend);
    
    // Aquí iría el código real para enviar al backend, por ejemplo:
    /*
    fetch('/api/upload-profile-image', {
      method: 'POST',
      body: formDataToSend
    })
    .then(response => response.json())
    .then(data => console.log('Respuesta del servidor:', data))
    .catch(error => console.error('Error al subir la imagen:', error));
    */
  };

  const handleEdit = () => {
    if (!edit) {
      // Si vamos a entrar en modo edición, lo hacemos directamente
      setEdit(true);
    } else {
      // Si estamos guardando, mostramos el popup de confirmación
      setConfirmAction("savePerson");
      setConfirmPopupVisible(true);
    }
  };

  const handleConfirmAction = () => {
    setConfirmPopupVisible(false);
    
    if (confirmAction === "savePerson") {
      // Procesamos el guardado después de confirmar
      console.log("--- GUARDANDO DATOS PERSONALES DESPUÉS DE CONFIRMACIÓN ---");
      console.log("Nombre:", formData.name);
      console.log("Apellidos:", formData.lastName);
      console.log("Email:", formData.email);
      console.log("Dirección:", formData.address);
      console.log("Datos completos:", formData);
      
      // Si hay una imagen, enviarla al backend
      if (imageFile) {
        sendImageToBackend(imageFile);
      }
      
      // Salimos del modo edición
      setEdit(false);
      console.log("Datos guardados correctamente");
    }
  };

  const handleCancelAction = () => {
    setConfirmPopupVisible(false);
    console.log("Acción cancelada por el usuario");
  };

  // Funciones para gestionar el cambio de contraseña
  const handleOpenPasswordPopup = () => {
    setPasswordPopupVisible(true);
    setPasswordFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleClosePasswordPopup = () => {
    setPasswordPopupVisible(false);
  };

  const handleSubmitPasswordChange = () => {
    // Validación de contraseñas
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      console.error("Las contraseñas no coinciden");
      // Aquí podrías mostrar un mensaje de error
      return;
    }
    
    // Si todo está bien, mostrar el popup de confirmación
    setPasswordConfirmPopupVisible(true);
  };

  const handleConfirmPasswordChange = () => {
    // Cerrar el popup de confirmación
    setPasswordConfirmPopupVisible(false);
    
    // Procesar el cambio de contraseña
    console.log("--- PROCESANDO CAMBIO DE CONTRASEÑA ---");
    console.log("Contraseña actual:", passwordFormData.currentPassword);
    console.log("Nueva contraseña:", passwordFormData.newPassword);
    
    // Aquí iría el código para enviar al backend
    /*
    fetch('/api/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: '123',
        currentPassword: passwordFormData.currentPassword,
        newPassword: passwordFormData.newPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      // Cerrar el popup principal
      setPasswordPopupVisible(false);
    })
    .catch(error => console.error('Error al cambiar la contraseña:', error));
    */
    
    // Simulación de éxito
    console.log("Contraseña cambiada correctamente");
    setPasswordPopupVisible(false);
  };

  const handleCancelPasswordConfirm = () => {
    setPasswordConfirmPopupVisible(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h3>Datos Personales</h3>
      <div className="content h-full flex justify-around">
        <div className="photo w-1/6 flex flex-col gap-4 items-center">
          <img className="rounded-full w-32 h-32 object-cover" src={imagePreview} alt="user" />
          <div className="actionFile w-3/4 flex-col justify-center items-center">
            <FileUploader
              ref={fileUploaderRef}
              selectButtonText="Cambiar imagen"
              labelText=""
              accept="image/*"
              uploadMode="useForm"
              disabled={!edit}
              onValueChanged={handleImageChange}
              multiple={false}
            />
          </div>
        </div>
        <div className="personalForm w-4/6 flex flex-col gap-4">
          <div className="actionButton flex justify-end w-full">
            <Button
              text={edit ? "Guardar" : "Editar"}
              onClick={handleEdit}
              icon={edit ? "save" : "edit"}
              type="default"
            />
          </div>
          <form className="flex flex-col gap-4 justify-center">
            <div className="flex justify-between">
              <label htmlFor="name">Nombres</label>
              <TextBox
                id="name"
                value={formData.name}
                className="w-5/6"
                disabled={!edit}
                onValueChanged={(e) => handleInputChange("name", e)}
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="lastName">Apellidos</label>
              <TextBox
                id="lastName"
                value={formData.lastName}
                className="w-5/6"
                disabled={!edit}
                onValueChanged={(e) => handleInputChange("lastName", e)}
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="email">Email</label>
              <TextBox
                id="email"
                value={formData.email}
                className="w-5/6"
                disabled={!edit}
                onValueChanged={(e) => handleInputChange("email", e)}
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="address">Dirección</label>
              <TextBox
                id="address"
                value={formData.address}
                className="w-5/6"
                disabled={!edit}
                onValueChanged={(e) => handleInputChange("address", e)}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="danger"
                text="Cambiar contraseña"
                icon="lock"
                className="w-full"
                onClick={handleOpenPasswordPopup}
              />
            </div>
          </form>
        </div>
      </div>
      
      {/* Popup de confirmación para guardar datos */}
      <Popup
        visible={confirmPopupVisible}
        onHiding={handleCancelAction}
        dragEnabled={false}
        closeOnOutsideClick={true}
        showTitle={true}
        title="Confirmar acción"
        width={400}
        height={200}
      >
        <div className="dx-popup-content-container">
          <p className="mb-6">¿Está seguro de que desea guardar los cambios realizados?</p>
          <div className="flex justify-end gap-3">
            <Button text="Cancelar" onClick={handleCancelAction} />
            <Button text="Confirmar" type="success" onClick={handleConfirmAction} />
          </div>
        </div>
      </Popup>
      
      {/* Popup para cambiar contraseña */}
      <Popup
        visible={passwordPopupVisible}
        onHiding={handleClosePasswordPopup}
        dragEnabled={false}
        closeOnOutsideClick={true}
        showTitle={true}
        title="Cambiar Contraseña"
        width={500}
        height={300}
      >
        <div className="dx-popup-content-container">
          <form className="flex flex-col gap-4 justify-center">
            <div className="flex justify-between items-center">
              <label htmlFor="currentPassword">Contraseña Actual</label>
              <TextBox
                id="currentPassword"
                value={passwordFormData.currentPassword}
                className="w-2/3"
                mode="password"
                onValueChanged={(e) => handlePasswordInputChange("currentPassword", e)}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <TextBox
                id="newPassword"
                value={passwordFormData.newPassword}
                className="w-2/3"
                mode="password"
                onValueChanged={(e) => handlePasswordInputChange("newPassword", e)}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <TextBox
                id="confirmPassword"
                value={passwordFormData.confirmPassword}
                className="w-2/3"
                mode="password"
                onValueChanged={(e) => handlePasswordInputChange("confirmPassword", e)}
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button text="Cancelar" onClick={handleClosePasswordPopup} />
              <Button text="Aceptar" type="success" onClick={handleSubmitPasswordChange} />
            </div>
          </form>
        </div>
      </Popup>
      
      {/* Popup de confirmación para cambio de contraseña */}
      <Popup
        visible={passwordConfirmPopupVisible}
        onHiding={handleCancelPasswordConfirm}
        dragEnabled={false}
        closeOnOutsideClick={true}
        showTitle={true}
        title="Confirmar cambio de contraseña"
        width={400}
        height={200}
      >
        <div className="dx-popup-content-container">
          <p className="mb-6">¿Está seguro de que desea cambiar su contraseña? Esta acción no se puede deshacer.</p>
          <div className="flex justify-end gap-3">
            <Button text="Cancelar" onClick={handleCancelPasswordConfirm} />
            <Button text="Confirmar" type="success" onClick={handleConfirmPasswordChange} />
          </div>
        </div>
      </Popup>
    </div>
  );
};

// Componente para la pestaña de Datos de la Institución
const InstitutionData = () => {
  const [edit, setEdit] = useState(false);
  const [institutionData, setInstitutionData] = useState({
    institutionName: "Institución ABC",
    nit: "123456789",
    address: "Calle Principal 123",
    phone: "555-1234"
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("/assets/institution-logo.jpg");
  const logoUploaderRef = useRef(null);
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");

  // Manejador para cambios en los campos de texto
  const handleInputChange = (field, e) => {
    setInstitutionData({
      ...institutionData,
      [field]: e.value
    });
  };

  // Manejador para cambios en el logo
  const handleLogoChange = (e) => {
    const file = e.value[0];
    if (file) {
      setLogoFile(file);
      
      // Crear una vista previa del logo
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      console.log("Logo seleccionado:", file.name);
      console.log("Tipo de archivo:", file.type);
      console.log("Tamaño:", (file.size / 1024).toFixed(2) + " KB");
    }
  };

  // Función para enviar el logo al backend
  const sendLogoToBackend = (file) => {
    if (!file) return;

    const formDataToSend = new FormData();
    formDataToSend.append('institutionLogo', file);
    formDataToSend.append('institutionId', '456'); // Suponiendo que tenemos un institutionId
    
    console.log("Preparando para enviar logo al backend");
    console.log("Nombre del archivo:", file.name);
    console.log("Tipo:", file.type);
    console.log("Tamaño:", (file.size / 1024).toFixed(2) + " KB");
    
    // Simulación de envío al backend
    console.log("FormData preparado para envío al backend:", formDataToSend);
    
    // Aquí iría el código real para enviar al backend
  };

  const handleEdit = () => {
    if (!edit) {
      // Si vamos a entrar en modo edición, lo hacemos directamente
      setEdit(true);
    } else {
      // Si estamos guardando, mostramos el popup de confirmación
      setConfirmAction("saveInstitution");
      setConfirmPopupVisible(true);
    }
  };

  const handleConfirmAction = () => {
    setConfirmPopupVisible(false);
    
    if (confirmAction === "saveInstitution") {
      // Procesamos el guardado después de confirmar
      console.log("--- GUARDANDO DATOS DE INSTITUCIÓN DESPUÉS DE CONFIRMACIÓN ---");
      console.log("Nombre de institución:", institutionData.institutionName);
      console.log("NIT:", institutionData.nit);
      console.log("Dirección:", institutionData.address);
      console.log("Teléfono:", institutionData.phone);
      console.log("Datos completos de institución:", institutionData);
      
      // Si hay un logo, enviarlo al backend
      if (logoFile) {
        sendLogoToBackend(logoFile);
      }
      
      // Salimos del modo edición
      setEdit(false);
      console.log("Datos de institución guardados correctamente");
    }
  };

  const handleCancelAction = () => {
    setConfirmPopupVisible(false);
    console.log("Acción cancelada por el usuario");
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h3>Datos de la Institución</h3>
      <div className="content h-full flex justify-around">
        <div className="logo w-1/6 flex flex-col gap-4 items-center">
          <img className="w-32 h-32 object-cover" src={logoPreview} alt="logo institución" />
          <div className="actionFile w-3/4 flex-col justify-center items-center">
            <FileUploader
              ref={logoUploaderRef}
              selectButtonText="Cambiar logo"
              labelText=""
              accept="image/*"
              uploadMode="useForm"
              disabled={!edit}
              onValueChanged={handleLogoChange}
              multiple={false}
            />
          </div>
        </div>
        <div className="institutionForm w-4/6 flex flex-col gap-4">
          <div className="actionButton flex justify-end w-full">
            <Button
              text={edit ? "Guardar" : "Editar"}
              onClick={handleEdit}
              icon={edit ? "save" : "edit"}
              type="default"
            />
          </div>
          <form className="flex flex-col gap-4 justify-center">
            <div className="flex justify-between">
              <label htmlFor="institutionName">Nombre de la Institución</label>
              <TextBox
                id="institutionName"
                value={institutionData.institutionName}
                className="w-5/6"
                disabled={!edit}
                onValueChanged={(e) => handleInputChange("institutionName", e)}
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="nit">NIT</label>
              <TextBox
                id="nit"
                value={institutionData.nit}
                className="w-5/6"
                disabled={!edit}
                onValueChanged={(e) => handleInputChange("nit", e)}
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="institutionAddress">Dirección</label>
              <TextBox
                id="institutionAddress"
                value={institutionData.address}
                className="w-5/6"
                disabled={!edit}
                onValueChanged={(e) => handleInputChange("address", e)}
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="phone">Teléfono</label>
              <TextBox
                id="phone"
                value={institutionData.phone}
                className="w-5/6"
                disabled={!edit}
                onValueChanged={(e) => handleInputChange("phone", e)}
              />
            </div>
          </form>
        </div>
      </div>
      
      {/* Popup de confirmación */}
      <Popup
        visible={confirmPopupVisible}
        onHiding={handleCancelAction}
        dragEnabled={false}
        closeOnOutsideClick={true}
        showTitle={true}
        title="Confirmar acción"
        width={400}
        height={200}
      >
        <div className="dx-popup-content-container">
          <p className="mb-6">¿Está seguro de que desea guardar los cambios realizados?</p>
          <div className="flex justify-end gap-3">
            <Button text="Cancelar" onClick={handleCancelAction} />
            <Button text="Confirmar" type="success" onClick={handleConfirmAction} />
          </div>
        </div>
      </Popup>
    </div>
  );
};

// Componente principal
const ConfiguracionPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabsData = [
    { text: "Datos Personales" },
    { text: "Datos de la Institución" },
  ];

  const handleTabClick = (e) => {
    setSelectedTab(e.component.option("selectedIndex"));
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <PersonalData />;
      case 1:
        return <InstitutionData />;
      default:
        return null;
    }
  };

  return (
    <div className="container w-full h-full px-2 py-4 flex flex-col gap-4">
      <h2 className="h1">Configuración de Mi Perfil</h2>

      <Tabs
        dataSource={tabsData}
        selectedIndex={selectedTab}
        onItemClick={handleTabClick}
      />
      <div className="container w-full h-full px-4">{renderTabContent()}</div>
    </div>
  );
};

export default ConfiguracionPage;