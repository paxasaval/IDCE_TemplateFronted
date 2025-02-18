import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SelectedUserProvider } from "./Hooks/useSelectedUser";
import "devextreme/dist/css/dx.light.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import dynamic from "next/dynamic";
const loadMessages = dynamic(() => import("devextreme/localization").then((mod)=>mod.loadMessages), {
  ssr: false,
});
const locale = dynamic(() => import("devextreme/localization").then((mod)=>mod.locale), {
  ssr: false,
});
config.autoAddCss = false; 
export default function RootLayout({ children }) {
  loadMessages({
    es: {
      Yes: "Sí",
      No: "No",
    },
  });

  // Establecemos el locale en español
  locale("es");

  return (
    
    <html lang="en">
      <body>
        <SelectedUserProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </SelectedUserProvider>
      </body>
    </html>
  );
}
