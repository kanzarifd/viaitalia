import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
   const navigate = useNavigate();
 
   const handleLogout = () => {
     // Clear localStorage so token & role are gone
     localStorage.removeItem("token");
     localStorage.removeItem("role");
 
     // Go back to Accueil
     navigate("/");
   };
 
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to User Dashboard 👤
      </h1>

     <button
        onClick={handleLogout}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#f44336",
          color: "white",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
