import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { gsap } from "gsap";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GSAP refs
  const formRef = useRef(null);
  const titleRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axiosInstance.post("/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: "USER",
      });

      if (response.data && response.data.userId) {
        alert("User registered successfully! Please login.");
        navigate("/login");
      } else {
        setMessage(response.data?.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // GSAP animations on component mount
  useEffect(() => {
    // Delay animations to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        // Animate title
        if (titleRef.current) {
          gsap.from(titleRef.current, {
            duration: 1,
            y: -20,
            opacity: 0,
            ease: "power3.out",
            clearProps: true
          });
        }

        // Animate form container
        if (formRef.current) {
          gsap.from(formRef.current, {
            duration: 1.2,
            scale: 0.8,
            opacity: 0,
            ease: "back.out(1.7)",
            clearProps: true
          });

          // Animate form fields with stagger
          const inputs = formRef.current.querySelectorAll('input');
          if (inputs && inputs.length > 0) {
            gsap.from(inputs, {
              duration: 0.8,
              y: 20,
              opacity: 0,
              stagger: 0.1,
              ease: "power2.out",
              clearProps: true
            });
          }

          // Animate button
          const button = formRef.current.querySelector('button');
          if (button) {
            gsap.from(button, {
              duration: 0.8,
              scale: 0.8,
              opacity: 0,
              ease: "elastic.out(1, 0.5)",
              clearProps: true
            });
          }
        }
      } catch (error) {
        console.log('GSAP Animation Error:', error);
      }
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-indigo-950 to-black">
      <div className="bg-gray-900 text-gray-100 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-80">
        <div className="text-center mb-8">
          <h1 ref={titleRef} className="text-3xl font-bold text-white mb-2">VIA ITALIA</h1>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* First Name Field */}
          <div>
            <label className="block text-gray-400 mb-1">Nome</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Inserisci il tuo nome"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label className="block text-gray-400 mb-1">Cognome</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Inserisci il tuo cognome"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Inserisci la tua email"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Inserisci la tua password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-gray-400 mb-1">Conferma Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Conferma la tua password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${isSubmitting ? "bg-indigo-800 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 active:scale-95"}`}
          >
            {isSubmitting ? "Registrazione in corso..." : "Registrati"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Hai già un account?{" "}
          <span
            className="text-indigo-400 font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Accedi
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;