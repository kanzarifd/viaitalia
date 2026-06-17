import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";
import { translations } from "../../translations";
import { useLanguage } from "../../contexts/LanguageContext";

import arrow from "../../assets/Arrow Right.svg";

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

/* ── Section ── */
const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 5%;
`;

/* ── Container ── */
const Container = styled.div`
  max-width: 1100px;
  width: 100%;
  text-align: center;
`;

/* ── Badge ── */
const Badge = styled.div`
  display: inline-block;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #00c864;
  margin-bottom: 1.5rem;
  opacity: 0;
`;

/* ── Title ── */
const Title = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  opacity: 0;

  span {
    background: linear-gradient(90deg, #00c864, #ef4444);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 4s linear infinite;
  }
`;

/* ── Subtitle ── */
const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255,255,255,0.6);
  max-width: 520px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
  opacity: 0;
`;

/* ── Buttons ── */
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  opacity: 0;
`;

const Button = styled.button`
  padding: 1rem 1.8rem;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  transition: all 0.25s ease;

  background: ${p => p.primary ? "#00c864" : "rgba(255,255,255,0.05)"};
  color: white;
  border: ${p => p.primary ? "none" : "1px solid rgba(255,255,255,0.15)"};

  &:hover {
    transform: translateY(-3px);
    background: ${p => p.primary ? "#00b85a" : "rgba(255,255,255,0.08)"};
    border-color: rgba(0,200,100,0.4);
  }

  img {
    width: 1rem;
  }
`;

/* ── Trust Line ── */
const Trust = styled.div`
  margin-top: 2.5rem;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.35);
  opacity: 0;
`;

const Hero = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language].hero;

  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
      .to(trustRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
  }, []);

  return (
    <Section id="home">

      <Container>
        <Badge ref={badgeRef}>{t.badge}</Badge>

        <Title ref={titleRef}>
          {t.title} <span>Italy</span>
        </Title>

        <Subtitle ref={subtitleRef}>
          {t.subtitle}
        </Subtitle>

        <Buttons ref={buttonsRef}>
          <Button primary onClick={() => window.open('https://calendly.com/viaitaliaagency/30min', '_blank')}>
            {t.button1}
          </Button>

          <Button onClick={() => navigate('/study-form')}>
            {t.button2}
            <img src={arrow} alt="" />
          </Button>
        </Buttons>

        <Trust ref={trustRef}>
          {t.trust}
        </Trust>
      </Container>

    </Section>
  );
};

export default Hero;