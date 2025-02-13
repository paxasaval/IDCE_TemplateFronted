import React from 'react';


const HomePageAdmin = () => {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      textAlign: "center" 
    }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "10px", marginLeft: "250px"}}>¡Bienvenido!</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "20px", marginLeft: "250px" }}>Nos alegra verte aquí.</p>
      <img
        src="/assets/images/homePage/bienvenido.PNG"
        alt="Bienvenido"
        style={{ 
          width: "70%", 
          maxWidth: "600px", 
          borderRadius: "15px", 
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          marginLeft: "250px",
        }}
      />
    </div>
  );
};

export default HomePageAdmin;
