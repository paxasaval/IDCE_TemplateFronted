'use client';
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SelectedUserProvider } from "./Hooks/useSelectedUser";
import "devextreme/dist/css/dx.light.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import dynamic from "next/dynamic";
import { loadMessages, locale } from "devextreme/localization";
import { useEffect } from "react";

config.autoAddCss = false; 
export default function RootLayout({ children }) {
  useEffect(() => {
    loadMessages({
      es: {
        Yes: "Sí",
        No: "No",
      },
    });

    // Establecemos el idioma en español
    locale("es");
  }, []);

  return (
    
    <html lang="es">
      <body>
        <SelectedUserProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </SelectedUserProvider>
      </body>
    </html>
  );
}
