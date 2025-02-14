import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "./Shared/Header";
import SideBar from "./Shared/SideBar";
import { SelectedUserProvider } from "./Hooks/useSelectedUser";
import "devextreme/dist/css/dx.light.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 
export default function RootLayout({ children }) {
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
