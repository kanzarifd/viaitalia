import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";

const Login = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ get navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      if (state === "login") {
        const res = await axiosInstance.post("/auth/login", {
          email: formData.email,
          password: formData.password
        });

        loginUser(res.data.token, res.data.role);

        // ✅ Redirect based on role
        if (res.data.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        const res = await axiosInstance.post("/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "USER"
        });

        alert("User registered successfully! Please login.");
        setState("login");
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data?.message || "Erreur lors de la connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {state === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-gray-500 text-center mb-4">
          {state === "login"
            ? "Please sign in to your account"
            : "Please fill in the details to register"}
        </p>

        {message && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {state === "register" && (
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {state === "login" && (
            <div className="flex justify-between items-center text-sm text-gray-500">
              <button type="button" className="hover:underline">Forgot password?</button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all
              ${isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 active:scale-95"
              }`}
          >
            {isSubmitting
              ? state === "login"
                ? "Logging in..."
                : "Registering..."
              : state === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          {state === "login" ? (
            <>
             
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-indigo-600 font-medium hover:underline cursor-pointer"
                onClick={() => setState("login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
