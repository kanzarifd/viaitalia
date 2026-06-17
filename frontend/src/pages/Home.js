import React, { useState, useEffect, useRef } from "react";

//This is home page, It will contains all the sections require in this page.

//Import all the require sections here
import HeroSection from "../Sections/Hero/index";
import About from "../Sections/About/index";
import Services from "../Sections/Services/index";
import Stats from "../Sections/Stats/index";
import Universities from "../Sections/Universities/index";
import HowItWorks from "../Sections/HowItWorks/index";
import Testimonials from "../Sections/Testimonials/index";
import Contact from "../Sections/Contact/index";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";

/* ───────── BACKGROUND ANIMATIONS ───────── */
const greenMove = keyframes`
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
    background: linear-gradient(135deg, rgba(0, 200, 100, 0.6) 0%, transparent 70%);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
  50% { 
    transform: translate(30%, -30%) scale(1.2) rotate(180deg);
    background: linear-gradient(45deg, rgba(0, 255, 150, 0.8) 0%, transparent 70%);
    clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  }
`;

const redMove = keyframes`
  0%, 100% { 
    transform: translate(50%, 50%) scale(1) rotate(0deg);
    background: linear-gradient(225deg, rgba(239, 68, 68, 0.6) 0%, transparent 70%);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
  50% { 
    transform: translate(-30%, 30%) scale(1.2) rotate(-180deg);
    background: linear-gradient(315deg, rgba(255, 100, 100, 0.8) 0%, transparent 70%);
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    /* soft lighting layer */
    radial-gradient(circle at 10% 9%, rgba(0, 255, 255, 0.12), transparent 10%),
    radial-gradient(circle at 10% 9%, rgba(0, 100, 80, 0.12), transparent 10%),
    /* base gradient */
    linear-gradient(
      90deg,
      #0b3d2c 0%,
      #0a2a1f 25%,
      #1a1a1a 50%,
      #3a0f0f 75%,
      #4a2a2a 100%
    );

  /* star / particle effect */
  & > div:nth-child(1)::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.2), transparent),
      radial-gradient(1.5px 1.5px at 70% 60%, rgba(255,255,255,0.15), transparent),
      radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.15), transparent),
      radial-gradient(1.5px 1.5px at 90% 20%, rgba(255,255,255,0.15), transparent),
      radial-gradient(1px 1px at 10% 70%, rgba(255,255,255,0.12), transparent),
      radial-gradient(2px 2px at 85% 85%, rgba(255,255,255,0.18), transparent),
      radial-gradient(1.2px 1.2px at 55% 25%, rgba(255,255,255,0.14), transparent),
      radial-gradient(0.8px 0.8px at 30% 90%, rgba(255,255,255,0.16), transparent);
    background-repeat: repeat;
    background-size: 500px 500px;
    opacity: 0.9;
    pointer-events: none;
    z-index: 2;
  }
`;

const AnimatedBg = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 200, 100, 0.6) 0%, transparent 70%);
  filter: blur(40px);
  z-index: 1;
`;

const AnimatedBg2 = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, transparent 70%);
  filter: blur(40px);
  z-index: 1;
`;

const Home = () => {
  const bgRef = useRef(null);
  const bgRef2 = useRef(null);

  useEffect(() => {
    // GSAP timeline for green background
    gsap.timeline({ repeat: -1 })
      .to(bgRef.current, {
        x: 100,
        y: -80,
        scale: 1.2,
        rotation: 180,
        duration: 4,
        ease: "power2.inOut"
      })
      .to(bgRef.current, {
        x: -50,
        y: 60,
        scale: 0.8,
        rotation: 360,
        duration: 4,
        ease: "power2.inOut"
      })
      .to(bgRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 4,
        ease: "power2.inOut"
      });

    // GSAP timeline for red background
    gsap.timeline({ repeat: -1 })
      .to(bgRef2.current, {
        x: -120,
        y: 100,
        scale: 1.3,
        rotation: -180,
        duration: 5,
        ease: "power2.inOut"
      })
      .to(bgRef2.current, {
        x: 80,
        y: -60,
        scale: 0.7,
        rotation: -360,
        duration: 5,
        ease: "power2.inOut"
      })
      .to(bgRef2.current, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 5,
        ease: "power2.inOut"
      });
  }, []);

  return (
    <Container>
      <AnimatedBg ref={bgRef} style={{ top: '20%', left: '20%' }} />
      <AnimatedBg2 ref={bgRef2} style={{ bottom: '20%', right: '20%' }} />
      <HeroSection />
      <Stats />
      <About />
      <HowItWorks />
      <Universities />
      <Services />
      <Testimonials />
      <Contact />
    </Container>
  );
};

export default Home;