import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "./Shared/Header";
import SideBar from "./Shared/SideBar";
import { SelectedUserProvider } from "./Hooks/useSelectedUser";
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
