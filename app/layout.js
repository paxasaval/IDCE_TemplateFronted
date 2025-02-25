"use client";
import { use, useEffect } from "react";
import { locale, loadMessages } from "devextreme/localization";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { AntdRegistry } from '@ant-design/nextjs-registry';
import 'devextreme/dist/css/dx.light.css'; /* O usa dx.dark.css si prefieres el tema oscuro */


export default function RootLayout({ children }) {


  useEffect(() => {
    loadMessages({
      es: {
        Yes: "Sí",
        No: "No",
        // Cancel: "Cancelar",
        Clear: "Limpiar",
        Close: "Cerrar",
        OK: "Aceptar",
        Confirm: "Confirmar",
        Loading: "Cargando...",
        Search: "Buscar",
        Select: "Seleccionar",
        SelectAll: "Seleccionar todo",
        DeselectAll: "Deseleccionar todo",
        Back: "Atrás",
        Next: "Siguiente",
        // Save: "Guardar",
        SaveAs: "Guardar como",
        Export: "Exportar",
        Exit: "Salir",
        Print: "Imprimir",
        Edit: "Editar",
        Copy: "Copiar",
        Delete: "Eliminar",
        Paste: "Pegar",
        Show: "Mostrar",
        Hide: "Ocultar",
        Go: "Ir",
        Refresh: "Actualizar",
        Reload: "Recargar",
        ZoomIn: "Acercar",
        ZoomOut: "Alejar",
        FullScreen: "Pantalla completa",
        Minimize: "Minimizar",
        Restore: "Restaurar",
      }
    });
    locale("es"); // Aplica el idioma español a DevExtreme
    console.log("Idioma configurado en español");
  }, []);


  return (
    <html lang="es">
      {/* <body><AntdRegistry>{children}</AntdRegistry></body> */}
        <body>{children}</body>
      
    </html>
  );
}
