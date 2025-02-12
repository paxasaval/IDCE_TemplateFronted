import React from 'react';
import Header from '../../Shared/Header';
import Image from 'next/image';

const SecurityPage= ()=> {
  return (
      <div className='container h-full justify-center items-center px-4 py-8'>
          <h1>Seguridad</h1>
          <div className="content relative h-full flex justify-center items-center overflow-hidden">
              <Image src="/assets/products.jpg" alt="producto1" fill className='object-cover' />
          
          </div>
        {/* <Image src="../../public/images/productos.jpg" alt="producto1" width={300} height={300} /> */}
      </div>
    );
};      
export default SecurityPage