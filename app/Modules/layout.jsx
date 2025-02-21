"use client";
import React, { useState } from "react";
// import Header from "./Header";
// import SideBar from "./SideBar";
import SideBar from "../Shared/SideBar";
import Header from "../Shared/Header";


const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      <SideBar isSidebarCollapsed={isSidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
