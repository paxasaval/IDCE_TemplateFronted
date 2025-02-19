"use client";
import { useState } from "react";
import Header from "../Shared/Header";
import SideBar from "../Shared/SideBar";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      {/* Pasamos toggleSidebar como prop */}
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex">
        {sidebarOpen && <SideBar />}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
          <AntdRegistry>{children}</AntdRegistry>
        </div>
      </div>
    </div>
  );
}
