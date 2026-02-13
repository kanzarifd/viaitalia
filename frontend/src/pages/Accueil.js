import { useNavigate } from "react-router-dom";

export default function Accueil() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <h1 style={{ marginBottom: "40px", fontSize: "32px", color: "#333" }}>
        Bienvenue sur ViaItalia
      </h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          Inscription
        </button>

        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2196F3",
            color: "white",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
