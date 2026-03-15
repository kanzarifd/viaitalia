// The Ultimate Hero Section - Best Design Ever
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import arrow from "../../assets/Arrow Right.svg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Epic animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(120deg); }
  66% { transform: translateY(-8px) rotate(240deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0b10 0%, #1a1f2e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(0, 255, 51, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
    animation: ${pulseAnimation} 10s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  @media only Screen and (max-width: 768px) {
    padding: 5rem 0;
    min-height: auto;
  }
`;

const CosmicBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
`;

const Star = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px white;
  animation: ${floatAnimation} 8s linear infinite;
`;

const Nebula = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(0, 255, 51, 0.1) 0%, 
    rgba(239, 68, 68, 0.1) 50%, 
    transparent 100%);
  filter: blur(60px);
  animation: ${gradientShift} 20s ease-in-out infinite;
`;

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  z-index: 10;
  position: relative;
  
  @media only Screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 0 2rem;
  }
`;

const ContentBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 15;
  
  @media only Screen and (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--white);
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);

  &:hover {
    background: rgba(0, 255, 51, 0.2);
    border-color: rgba(0, 255, 51, 0.5);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 255, 51, 0.3);
  }
`;

const BadgeIcon = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(90deg, var(--green), var(--red));
  margin-right: 0.8rem;
  box-shadow: 0 0 15px rgba(0, 255, 51, 0.8);
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, var(--white), var(--green), var(--red));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(0, 255, 51, 0.3);
  opacity: 0;
  transform: translateY(30px);
  font-weight: 800;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(20px);
  max-width: 600px;
`;

const CTAButton = styled.button`
  background: linear-gradient(90deg, var(--green), var(--red));
  color: var(--white);
  padding: 1.2rem 2.5rem;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  transition: all 0.4s ease;
  border: none;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px) scale(0.9);
  width: auto;
  min-width: 200px;

@media only screen and (max-width: 768px) {
  width: 100%;          /* button stretches to full width */
  max-width: 300px;     /* optional max width */
  padding: 1rem 2rem;
  font-size: 1rem;
  margin: 0 auto;       /* centers the button horizontally */
  display: flex;        /* ensures content inside button is aligned */
  justify-content: center; /* centers icon/text inside the button */
}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s ease;
  }

  img {
    width: 1.5rem;
    margin-left: 0.8rem;
    transition: transform 0.3s ease;

    @media only Screen and (max-width: 768px) {
      width: 1.2rem;
      margin-left: 0.6rem;
    }
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 
      0 25px 50px rgba(0, 255, 51, 0.4),
      0 15px 30px rgba(239, 68, 68, 0.3);

    &::before {
      left: 100%;
    }

    img {
      transform: translateX(5px);
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }
`;

const VisualBlock = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 15;
  
  @media only Screen and (max-width: 768px) {
    flex: none;
    margin-top: 3rem;
  }
`;

const MobileContainer = styled.div`
  position: relative;
  opacity: 0;
  transform: translateX(50px) scale(0.8);
  
  @media only Screen and (max-width: 768px) {
    transform: translateY(50px) scale(0.8);
  }
`;

const MobileImage = styled.img`
  width: min(400px, 50vw);
  height: auto;
  filter: drop-shadow(0 0 40px rgba(0, 255, 51, 0.4));
  animation: ${floatAnimation} 4s ease-in-out infinite;
  
  @media only Screen and (max-width: 768px) {
    width: min(300px, 70vw);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
`;

const FloatingShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(0, 255, 51, 0.1) 0%, 
    rgba(239, 68, 68, 0.1) 100%);
  filter: blur(30px);
  animation: ${floatAnimation} 15s ease-in-out infinite;
`;

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const appointmentBtnRef = useRef(null);
  const registerBtnRef = useRef(null);
  const mobileRef = useRef(null);
  const cosmicRef = useRef(null);
  const shapesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse tracking for mobile image
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      mouseRef.current = { x, y };
      
      // Apply rotation and movement to mobile image
      if (mobileRef.current) {
        const rotateY = (x - 0.5) * 20;
        const rotateX = (y - 0.5) * -20;
        const translateX = (x - 0.5) * 30;
        const translateY = (y - 0.5) * 30;
        
        gsap.to(mobileRef.current, {
          rotationY: rotateY,
          rotationX: rotateX,
          x: translateX,
          y: translateY,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    };

    // Reset mobile position when mouse leaves
    const handleMouseLeave = () => {
      if (mobileRef.current) {
        gsap.to(mobileRef.current, {
          rotationY: 0,
          rotationX: 0,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
      }
    };

    // Add mouse event listeners
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      heroElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Create cosmic background - REDUCED ELEMENTS
    const createCosmicBackground = () => {
      // Create fewer stars for better performance
      for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
          position: absolute;
          width: ${Math.random() * 2 + 1}px;
          height: ${Math.random() * 2 + 1}px;
          background: white;
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
          opacity: ${Math.random() * 0.8 + 0.2};
        `;
        
        if (cosmicRef.current) {
          cosmicRef.current.appendChild(star);
        }
      }

      // Create fewer nebulas
      for (let i = 0; i < 3; i++) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula';
        nebula.style.cssText = `
          position: absolute;
          width: ${Math.random() * 200 + 100}px;
          height: ${Math.random() * 200 + 100}px;
          border-radius: 50%;
          background: radial-gradient(circle, 
            ${Math.random() > 0.5 ? 'rgba(0, 255, 51, 0.1)' : 'rgba(239, 68, 68, 0.1)'} 0%, 
            transparent 70%);
          filter: blur(${Math.random() * 30 + 15}px);
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: gradientShift ${Math.random() * 10 + 5}s ease-in-out infinite;
          opacity: ${Math.random() * 0.2 + 0.1};
        `;
        
        if (cosmicRef.current) {
          cosmicRef.current.appendChild(nebula);
        }
      }

      // Create fewer floating shapes
      for (let i = 0; i < 4; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.cssText = `
          position: absolute;
          width: ${Math.random() * 80 + 40}px;
          height: ${Math.random() * 80 + 40}px;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(0, 255, 51, 0.05) 0%, 
            rgba(239, 68, 68, 0.05) 100%);
          filter: blur(15px);
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${Math.random() * 15 + 8}s ease-in-out infinite;
        `;
        
        if (heroRef.current) {
          heroRef.current.appendChild(shape);
          shapesRef.current.push(shape);

          gsap.to(shape, {
            x: `+=${Math.random() * 50 - 25}`,
            y: `+=${Math.random() * 50 - 25}`,
            scale: Math.random() * 1.1 + 0.9,
            opacity: Math.random() * 0.2 + 0.1,
            duration: Math.random() * 6 + 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 1
          });
        }
      }
    };

    // Epic entrance animations - FASTER
    const tl = gsap.timeline();
    
    tl.fromTo(badgeRef.current, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    .fromTo(titleRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3")
    .fromTo(subtitleRef.current, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2")
    .fromTo(appointmentBtnRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.7)"
    }, "-=0.1")
    .fromTo(registerBtnRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.7)"
    }, "-=0.05")
    .fromTo(mobileRef.current, {
      opacity: 0,
      x: 50,
      scale: 0.8
    }, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.3");

    // Scroll-based animations
    gsap.to(heroRef.current, {
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Create cosmic background
    createCosmicBackground();

    // Cleanup
    return () => {
      shapesRef.current.forEach(shape => shape.remove());
      shapesRef.current = [];
    };
  }, []);

  return (
    <HeroSection ref={heroRef} id="home">
      <CosmicBackground ref={cosmicRef} />
      <FloatingElements>
        {shapesRef.current.map((shape, index) => (
          <FloatingShape key={index} />
        ))}
      </FloatingElements>
      
      <HeroContainer>
        <ContentBlock>
        
          
 <Title ref={titleRef}>
  <span style={{ color: 'red' }}>Via</span>{" "}
  <span style={{ color: 'green' }}>Italia</span>

</Title>
          
          <Subtitle ref={subtitleRef}>
            ViaItalia propose plusieurs formules d'accompagnement pour les étudiants souhaitant poursuivre leurs études en Italie.
            Chaque pack inclut un suivi personnalisé et une assistance administrative afin de faciliter les démarches universitaires et l'organisation du projet d'études.
          </Subtitle>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <CTAButton ref={appointmentBtnRef} onClick={() => window.open('https://calendly.com/viaitaliaagency/30min', '_blank')}>
               Rendez-vous Free
              <img src={arrow} alt="Arrow" />
            </CTAButton>
            <CTAButton ref={registerBtnRef} onClick={() => navigate('/study-form')} style={{ background: 'linear-gradient(90deg, var(--red), var(--green))' }}>
              Inscription
              <img src={arrow} alt="Arrow" />
            </CTAButton>
          </div>
        </ContentBlock>
        
        <VisualBlock>
        
        </VisualBlock>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;