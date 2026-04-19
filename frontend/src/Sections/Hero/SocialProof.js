import React, { useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Epic animations matching Hero section


const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const SocialProofSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    pointer-events: none;
    z-index: 1;
  }

  @media only Screen and (max-width: 768px) {
    padding: 3rem 0;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  z-index: 10;
  position: relative;
  
  @media only Screen and (max-width: 768px) {
    width: 95%;
    padding: 0 2rem;
  }
`;

const Headline = styled.h2`
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 4rem;
  background: linear-gradient(90deg, var(--white), var(--green), var(--red));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(0, 255, 51, 0.3);
  opacity: 1;
  transform: translateY(0);
  text-align: center;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
  opacity: 1;
  transform: translateY(0);
  width: 100%;
  
  @media only Screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
  padding: 2rem 1rem;
  position: relative;
  transition: all 0.3s ease;
  
  @media only Screen and (min-width: 768px) {
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      right: -0.5rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 60%;
      background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    }
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    filter: brightness(1.1);
  }
`;

const StatNumber = styled.div`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 200;
  color: var(--white);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
  line-height: 1;
`;

const StatSubtext = styled.div`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  letter-spacing: 0.02em;
  text-transform: none;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  margin-bottom: 4rem;
  opacity: 1;
  transform: scaleX(1);
  transform-origin: center;
`;

const LogosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  opacity: 1;
  transform: translateY(0);
  width: 100%;
  
  @media only Screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
`;

const UniversityLogo = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: rgba(0, 255, 51, 0.1);
    border-color: rgba(0, 255, 51, 0.3);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 10px 30px rgba(0, 255, 51, 0.2);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  @media only Screen and (max-width: 768px) {
    padding: 0.8rem 1rem;
    font-size: 0.7rem;
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
`;

const SocialProof = () => {
  const sectionRef = useRef(null);
  const cosmicRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef(null);
  const dividerRef = useRef(null);
  const logosRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    // Create cosmic background
    const createCosmicBackground = () => {
      // Create stars
      for (let i = 0; i < 20; i++) {
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

      // Create nebulas
      for (let i = 0; i < 2; i++) {
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

      // Create floating shapes
      for (let i = 0; i < 3; i++) {
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
        
        if (sectionRef.current) {
          sectionRef.current.appendChild(shape);
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

    // Epic entrance animations
    const tl = gsap.timeline();
    
    tl.fromTo(headlineRef.current, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .fromTo(statsRef.current.children, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.2")
    .fromTo(dividerRef.current, {
      scaleX: 0,
      opacity: 0
    }, {
      scaleX: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      transformOrigin: "center center"
    }, "-=0.1")
    .fromTo(logosRef.current.children, {
      opacity: 0,
      y: 15,
      scale: 0.95
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: "back.out(1.7)"
    }, "-=0.1");

    // Create cosmic background
    createCosmicBackground();

    // Cleanup
    return () => {
      shapesRef.current.forEach(shape => shape.remove());
      shapesRef.current = [];
    };
  }, []);

  return (
    <>
      <SocialProofSection ref={sectionRef} id="social-proof">
        
        <Container>
          <Headline ref={headlineRef}>
            Trusted by 500+ students worldwide
          </Headline>
          
          <StatsContainer ref={statsRef}>
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatSubtext>students helped</StatSubtext>
            </StatItem>
            
            <StatItem>
              <StatNumber>20+</StatNumber>
              <StatSubtext>universities</StatSubtext>
            </StatItem>
            
            <StatItem>
              <StatNumber>95%</StatNumber>
              <StatSubtext>success rate</StatSubtext>
            </StatItem>
          </StatsContainer>
          
          <Divider ref={dividerRef} />
          
          <LogosContainer ref={logosRef}>
            <UniversityLogo>University of Milan</UniversityLogo>
            <UniversityLogo>University of Bologna</UniversityLogo>
            <UniversityLogo>Università di Trento</UniversityLogo>
            <UniversityLogo>University of Padua</UniversityLogo>
            <UniversityLogo>University of Florence</UniversityLogo>
            <UniversityLogo>University of Pisa</UniversityLogo>
          </LogosContainer>
        </Container>
      </SocialProofSection>
    </>
  );
};

export default SocialProof;