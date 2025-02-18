import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import 'devextreme/dist/css/dx.light.css'; /* O usa dx.dark.css si prefieres el tema oscuro */


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>       
        <AntdRegistry>{children}</AntdRegistry>        
      </body>
    </html>
  );
}
