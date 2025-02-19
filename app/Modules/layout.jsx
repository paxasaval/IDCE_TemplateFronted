"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "../Shared/Header";
import SideBar from "../Shared/SideBar";
import dynamic from "next/dynamic";
import "./layout.css";
import { useState } from "react";

const Drawer = dynamic(
  () => import("devextreme-react/drawer").then((mod) => mod.Drawer),
  {
    ssr: false,
  }
);
export default function ModulesLayout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="h-screen flex flex-col  bg-neutral-50 gap-x-1 gap-y-">
      <div className="w-full">
        <Header onMenuClick={toggleDrawer}></Header>
      </div>
      <Drawer
        opened={isDrawerOpen}
        openedStateMode="shrink"
        position="left"
        component={SideBar}
        height="100%"
        className="h-full"
        revealMode="slide"
        animationEnabled={true}
        animationDuration={300}
      >
        <div className="container w-full h-full  overflow-y-auto overflow-x-hidden px-2 py-4">
          <AntdRegistry>{children}</AntdRegistry>
        </div>
      </Drawer>
    </div>
  );
}
