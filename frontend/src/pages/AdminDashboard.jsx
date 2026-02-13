import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage so token & role are gone
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Go back to Accueil
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "40px" }}>
        Welcome to Admin Dashboard
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
}

/// logout button 5aleha simple link fo now 

