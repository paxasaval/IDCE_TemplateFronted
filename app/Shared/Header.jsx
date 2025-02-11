import React from 'react';
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
const Header= ()=> {
  return (
    <div className='bg-blue-500 w-full flex justify-end p-2'>
      <div className="user flex gap-2">
        <div className="userActions">
          
        </div>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        <div className="userInfo flex flex-col justify-center items-center"> 
          <span>Paul Sanchez</span>
          <span className='text-xs'>Admin</span>
        </div>
      </div>
    </div>
  );
};
export default Header