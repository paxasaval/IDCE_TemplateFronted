import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "../Shared/Header";
import SideBar from "../Shared/SideBar";
export default function ModulesLayout({ children }) {
  return (
    <div className="h-screen grid grid-cols-5 grid-rows-10">
      <Header></Header>
      <SideBar></SideBar>
      <div className="container col-span-4 row-span-9 row-start-2 bg-neutral-100 overflow-y-auto overflow-x-hidden">
        <AntdRegistry>{children}</AntdRegistry>
      </div>
    </div>
  );
}
