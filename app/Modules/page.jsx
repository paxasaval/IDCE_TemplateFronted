import React from "react";

const HomePageAdmin = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">¡Bienvenido!</h1>
      <p className="text-lg md:text-xl mb-6">Nos alegra verte aquí.</p>
      
      <img
        src="/assets/images/homePage/bienvenido.png"
        alt="Bienvenido"
        className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-lg rounded-lg shadow-lg"
      />
    </div>
  );
};

export default HomePageAdmin;
