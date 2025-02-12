import React from 'react';
import { Avatar, Menu } from "antd";
import { UserOutlined } from '@ant-design/icons';
const SideBar= ()=> {
  return (
    <div className='bg-neutral-50 w-1/4 h-screen'>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: 'Modules/Admin',
            icon: <UserOutlined />,
            label: 'Administrador',
            children: [
                {
                  label: 'Option 1',
                  key: 'Perfiles',
                },
                {
                  label: 'Option 2',
                  key: 'setting:2',
                },
            ]
          },
          {
            key: '2',
            icon: <UserOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UserOutlined />,
            label: 'nav 3',
          },
        ]}
      />
    </div>
  );
};
export default SideBar