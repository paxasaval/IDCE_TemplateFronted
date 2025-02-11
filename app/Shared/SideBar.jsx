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
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
            children: [
                {
                  label: 'Option 1',
                  key: 'setting:1',
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