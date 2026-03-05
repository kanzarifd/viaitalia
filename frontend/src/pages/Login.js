import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { gsap } from "gsap";
import styled from "styled-components";
import axiosInstance from "../api/axiosInstance";
import logoSvg from "../assets/logo.svg";

// Register GSAP
gsap.registerPlugin();

// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  background: linear-gradient(135deg, #006400, #8B0000);
`;


const LoginCard = styled.div`
  background: rgba(28, 28, 35, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transform: translateY(50px) scale(0.9);
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
    max-width: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  
  img {
    height: 60px;
    width: 150px;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover img {
    transform: translateY(-2px) scale(1.05);
    filter: drop-shadow(0 8px 12px rgba(0, 255, 51, 0.3));
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--green), var(--red));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  opacity: 0;
  transform: translateY(20px);
`;

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, rgba(20, 20, 25, 0.8), rgba(239, 68, 68, 0.1));
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ff6b6b;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(-10px);
`;

const Form = styled.form`
  space-y: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
`;

const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(20, 20, 25, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--white);
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  &:focus {
    outline: none;
    border-color: var(--green);
    background: rgba(20, 20, 25, 0.9);
    box-shadow: 0 0 20px rgba(0, 255, 51, 0.3);
    transform: translateY(-2px);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--green), rgba(0, 255, 51, 0.8));
  border: 1px solid rgba(0, 255, 51, 0.3);
  border-radius: 25px;
  color: var(--white);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 255, 51, 0.2);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 51, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(0, 255, 51, 0.9), var(--green));
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 255, 51, 0.4);
    border-color: rgba(0, 255, 51, 0.5);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
  
  &:disabled {
    background: linear-gradient(135deg, rgba(20, 20, 25, 0.6), rgba(20, 20, 25, 0.4));
    border-color: rgba(255, 255, 255, 0.05);
    cursor: not-allowed;
    transform: none;
  }
`;

const SwitchText = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 2rem;
  font-size: 0.9rem;
  opacity: 0;
  transform: translateY(20px);
  
  span {
    color: var(--green);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      color: rgba(0, 255, 51, 0.8);
      text-shadow: 0 0 10px rgba(0, 255, 51, 0.5);
    }
  }
`;

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
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    // Animate card entrance
    gsap.fromTo(cardRef.current, {
      scale: 0.9,
      opacity: 0,
      y: 50
    }, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2
    });

    // Animate logo
    gsap.fromTo(logoRef.current, {
      scale: 0,
      rotation: -180,
      opacity: 0
    }, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 0.6
    });

    // Animate title and subtitle
    gsap.fromTo(titleRef.current, {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.8
    });

    gsap.fromTo(subtitleRef.current, {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.9
    });

    // Animate form elements with stagger
    gsap.fromTo('.form-group', {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
      delay: 1.1
    });

    // Animate submit button
    gsap.fromTo('.submit-btn', {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 1.5
    });

    // Animate switch text
    gsap.fromTo('.switch-text', {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      delay: 1.7
    });

    // Dynamic background animation
    gsap.to('.login-container', {
      background: 'linear-gradient(135deg, rgba(0, 255, 51, 0.05) 0%, rgba(239, 68, 68, 0.05) 50%, rgba(0, 255, 51, 0.02) 100%)',
      duration: 4,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });
  }, []);

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

        loginUser(res.data.token, res.data.role, res.data.user);

        // Redirect based on role
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
      
      // Animate error message
      gsap.fromTo('.error-message', {
        scale: 0.8,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginContainer className="login-container">
      <LoginCard ref={cardRef}>
        <LogoContainer ref={logoRef}>
          <img src={logoSvg} alt="Via Italia" />
        </LogoContainer>
        
        <Title ref={titleRef}>
          {state === "login" ? "Bienvenue" : "Créer un Compte"}
        </Title>
        
        <Subtitle ref={subtitleRef}>
          {state === "login"
            ? "Connectez-vous à votre espace"
            : "Remplissez les détails pour vous inscrire"}
        </Subtitle>

        {message && (
          <ErrorMessage className="error-message">
            {message}
          </ErrorMessage>
        )}

        <Form ref={formRef} onSubmit={handleSubmit}>
          {state === "register" && (
            <FormGroup className="form-group">
              <Label>Nom</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                required
              />
            </FormGroup>
          )}

          <FormGroup className="form-group">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Adresse email"
              required
            />
          </FormGroup>

          <FormGroup className="form-group">
            <Label>Mot de passe</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              required
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting
              ? state === "login"
                ? "Connexion..."
                : "Inscription..."
              : state === "login"
              ? "Se Connecter"
              : "S'inscrire"}
          </SubmitButton>
        </Form>

        <SwitchText className="switch-text">
          {state === "login" ? (
            <>
              Pas encore de compte?{" "}
              <span onClick={() => setState("register")}>
                S'inscrire
              </span>
            </>
          ) : (
            <>
              Déjà un compte?{" "}
              <span onClick={() => setState("login")}>
                Se Connecter
              </span>
            </>
          )}
        </SwitchText>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
