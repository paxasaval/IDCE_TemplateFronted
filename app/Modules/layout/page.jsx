import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from "../../Shared/Header";
import SideBar from "../../Shared/SideBar";

export default function RootLayout({ children }) {
    return (

        <div>
            <Header></Header>
            <div className="flex">
                <SideBar></SideBar>
                <AntdRegistry>{children}</AntdRegistry>
            </div>
        </div>

        
    );
}
