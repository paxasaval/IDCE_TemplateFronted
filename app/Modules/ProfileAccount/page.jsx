"use client";
import React, { useState, useEffect } from "react";
import {
    Form,
    SimpleItem,
    GroupItem,
    Label,
    ButtonItem,
    ButtonOptions
  } from "devextreme-react/form";
import { LoadPanel } from "devextreme-react/load-panel";
import { Button } from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import "devextreme/dist/css/dx.light.css";


const ProfileAccountPage = () => {
    // const [empleados, setEmpleados] = useState([]);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const [isBrowser, setIsBrowser] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    const defaultProfileImage = "https://via.placeholder.com/150?text=Usuario";
    
    const empleados = [
        {
            empleadoID: 1,
            identificacion: "1234567890",
            nombre: "Juan",
            apellidos: "Pérez",
            email: "juan.perez@example.com",
            direccion: "Calle Falsa 123",
            telefono: "555-1234",
            imagenPerfil: null,
        },
        {
            empleadoID: 2,
            identificacion: "0987654321",
            nombre: "María",
            apellidos: "Gómez",
            email: "maria.gomez@example.com",
            direccion: "Avenida Siempre Viva 742",
            telefono: "555-5678",
            imagenPerfil: null,
        },
        {
            empleadoID: 3,
            identificacion: "1122334455",
            nombre: "Carlos",
            apellidos: "López",
            email: "carlos.lopez@example.com",
            direccion: "Boulevard de los Sueños 101",
            telefono: "555-9101",
            imagenPerfil: null,
        },
        // Puedes agregar más empleados según sea necesario
    ];

    // Este efecto comprueba si estamos en el navegador
    useEffect(() => {
        setIsBrowser(true);
    }, []);

    useEffect(() => {
        // Solo cargar datos cuando estamos en el navegador
        if (isBrowser) {
            // Buscamos el empleado con ID 2
            const currentUser = empleados.find(
                (empleado) => empleado.empleadoID === 2
            );

            if (currentUser) {
                setUserData(currentUser);
                setFormData({
                    identificacion: currentUser.identificacion,
                    nombre: currentUser.nombre,
                    apellidos: currentUser.apellidos,
                    email: currentUser.email,
                    direccion: currentUser.direccion,
                    telefono: currentUser.telefono,
                });
                setProfileImage(currentUser.imagenPerfil || defaultProfileImage);
                setLoading(false);
                console.log("Usuario encontrado:", currentUser);
            } else {
                console.error("No se encontró el empleado con ID 2");
                // Puedes manejar el error según tus necesidades
                setLoading(false);
            }
        }
    }, [isBrowser]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        // Restaurar los datos originales
        setFormData({
            identificacion: userData.identificacion,
            nombre: userData.nombre,
            apellidos: userData.apellidos,
            email: userData.email,
            direccion: userData.direccion,
            telefono: userData.telefono
        });
        // Restaurar la imagen original
        setProfileImage(userData.imagenPerfil || defaultProfileImage);
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        // Aquí normalmente enviarías los datos a la API
        // Simulamos la actualización de los datos localmente
        const updatedUser = {
            ...userData,
            ...formData,
            imagenPerfil: profileImage
        };
        
        setUserData(updatedUser);
        setIsEditing(false);
        notify("Información actualizada correctamente", "success", 3000);
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.dataField]: e.value
        });
    };

    const handlePasswordFormChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.dataField]: e.value
        });
    };
    
    // Definir un cargador de archivo seguro que solo funcione en el navegador
    const FileUploaderComponent = () => {
        // Importación dinámica para componentes que usan 'document'
        const [FileUploader, setFileUploader] = useState(null);
        
        useEffect(() => {
            if (isBrowser) {
                import('devextreme-react/file-uploader').then(module => {
                    setFileUploader(() => module.FileUploader);
                });
            }
        }, []);
        
        if (!FileUploader) return <div>Cargando...</div>;
        
        return (
            <FileUploader
                selectButtonText="Cambiar imagen"
                labelText=""
                accept="image/*"
                uploadMode="useForm"
                onValueChanged={handleImageUpload}
            />
        );
    };
    
    const handleImageUpload = (e) => {
        if (e.value && e.value.length > 0) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setProfileImage(fileReader.result);
            };
            fileReader.readAsDataURL(e.value[0]);
        }
    };
    
    const handleRemoveImage = () => {
        setProfileImage(defaultProfileImage);
    };

    const openPasswordModal = () => {
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setPasswordModalVisible(true);
    };

    const closePasswordModal = () => {
        setPasswordModalVisible(false);
    };

    const handleSavePassword = () => {
        // Validar las contraseñas
        if (!passwordData.currentPassword) {
            notify("Por favor, ingresa tu contraseña actual", "error", 3000);
            return;
        }
        if (!passwordData.newPassword) {
            notify("Por favor, ingresa la nueva contraseña", "error", 3000);
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            notify("Las contraseñas no coinciden", "error", 3000);
            return;
        }

        // Aquí normalmente enviarías la solicitud a la API para cambiar la contraseña
        // Simulamos una actualización exitosa
        notify("Contraseña actualizada correctamente", "success", 3000);
        closePasswordModal();
    };

    // Importamos el componente Popup de manera dinámica para evitar problemas de SSR
    const PasswordChangeModal = () => {
        const [Popup, setPopup] = useState(null);
        
        useEffect(() => {
            if (isBrowser) {
                import('devextreme-react/popup').then(module => {
                    setPopup(() => module.Popup);
                });
            }
        }, []);
        
        if (!Popup) return null;
        
        return (
            <Popup
                visible={passwordModalVisible}
                onHiding={closePasswordModal}
                title="Cambiar Contraseña"
                showCloseButton={true}
                width={400}
                height="auto"
                contentRender={() => (
                    <div style={{ padding: "20px" }}>
                        <Form
                            formData={passwordData}
                            onFieldDataChanged={handlePasswordFormChange}
                            labelLocation="top"
                        >
                            <SimpleItem 
                                dataField="currentPassword" 
                                label={{ text: "Contraseña Actual" }} 
                                editorType="dxTextBox"
                                editorOptions={{ mode: "password" }}
                            />
                            <SimpleItem 
                                dataField="newPassword" 
                                label={{ text: "Nueva Contraseña" }} 
                                editorType="dxTextBox"
                                editorOptions={{ mode: "password" }}
                            />
                            <SimpleItem 
                                dataField="confirmPassword" 
                                label={{ text: "Confirmar Contraseña" }} 
                                editorType="dxTextBox"
                                editorOptions={{ mode: "password" }}
                            />
                            <ButtonItem>
                                <ButtonOptions
                                    text="Guardar Cambios"
                                    type="success"
                                    width="100%"
                                    onClick={handleSavePassword}
                                />
                            </ButtonItem>
                            <ButtonItem>
                                <ButtonOptions
                                    text="Cancelar"
                                    type="normal"
                                    width="100%"
                                    onClick={closePasswordModal}
                                />
                            </ButtonItem>
                        </Form>
                    </div>
                )}
            />
        );
    };

    if (!isBrowser) {
        return null; // No mostrar nada durante la renderización en el servidor
    }

    if (loading) {
        return <LoadPanel visible={true} />;
    }

    return (
        <div className="profile-account-container">
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
                Mi Perfil
            </h2>

            <div className="profile-container" style={{ width: "100%", backgroundColor: "#f8f9fa", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "1.5rem" }}>
                        {isEditing ? "Editar Información Personal" : "Información Personal"}
                    </h3>
                    
                    {!isEditing ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                                text="Editar Información"
                                type="default"
                                onClick={handleEditClick}
                            />
                            <Button
                                text="Cambiar Contraseña"
                                type="default"
                                onClick={openPasswordModal}
                            />
                        </div>
                    ) : (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                                text="Guardar"
                                type="success"
                                onClick={handleSaveClick}
                            />
                            <Button
                                text="Cancelar"
                                type="normal"
                                onClick={handleCancelEdit}
                            />
                        </div>
                    )}
                </div>
                
                <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                    {/* Sección de imagen de perfil */}
                    <div style={{ minWidth: "200px", textAlign: "center" }}>
                        <div style={{ 
                            width: "150px", 
                            height: "150px", 
                            margin: "0 auto 15px auto", 
                            borderRadius: "50%", 
                            overflow: "hidden",
                            border: "3px solid #e0e0e0"
                        }}>
                            <img 
                                src={profileImage} 
                                alt="Imagen de perfil" 
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                            />
                        </div>
                        
                        {isEditing && (
                            <div style={{ marginTop: "10px" }}>
                                {isBrowser && <FileUploaderComponent />}
                                <Button
                                    text="Eliminar imagen"
                                    type="danger"
                                    stylingMode="outlined"
                                    onClick={handleRemoveImage}
                                    style={{ marginTop: "10px" }}
                                />
                            </div>
                        )}
                    </div>
                    
                    {/* Sección de información del perfil */}
                    <div style={{ flex: "1", minWidth: "300px" }}>
                        <Form
                            formData={isEditing ? formData : userData}
                            readOnly={!isEditing}
                            onFieldDataChanged={isEditing ? handleFormChange : undefined}
                            labelLocation="top"
                            colCount={2}
                        >
                            <GroupItem colCount={2}>
                                <SimpleItem dataField="identificacion" label={{ text: "Identificación" }} />
                                <SimpleItem dataField="nombre" label={{ text: "Nombre" }} />
                                <SimpleItem dataField="apellidos" label={{ text: "Apellidos" }} />
                                <SimpleItem dataField="email" label={{ text: "Correo Electrónico" }} />
                                <SimpleItem dataField="telefono" label={{ text: "Teléfono" }} />
                                <SimpleItem dataField="direccion" label={{ text: "Dirección" }} />
                            </GroupItem>
                            
                            {!isEditing && (
                                <GroupItem colCount={2}>
                                    <SimpleItem dataField="fechaIngreso" label={{ text: "Fecha de Ingreso" }} editorType="dxDateBox" editorOptions={{ displayFormat: "dd/MM/yyyy", readOnly: true }} />
                                    <SimpleItem dataField="cargo" label={{ text: "Cargo" }} />
                                    <SimpleItem dataField="codigoCliente" label={{ text: "Código Cliente" }} />
                                    <SimpleItem dataField="institucionID" label={{ text: "Institución ID" }} />
                                </GroupItem>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
            
            {isBrowser && <PasswordChangeModal />}
        </div>
    );
};

// Importante: Necesitamos usar la opción de renderizado dinámico de Next.js
export const dynamic = "force-dynamic";
export default ProfileAccountPage;