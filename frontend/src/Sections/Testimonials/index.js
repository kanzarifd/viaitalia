import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Animations ── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

/* ── Data ── */
const TESTIMONIALS = [
  {
    id: 1,
    text: "Grâce à Viaitalia, j'ai pu m'inscrire à l'Université de Milan sans stress. Leur équipe m'a guidé à chaque étape, de la constitution du dossier jusqu'à mon arrivée en Italie. Je recommande vivement !",
    name: "Fedi K.",
    role: "Étudiant en Médecine — Milan",
    avatar: "FK",
    country: "🇹🇳",
    rating: 5,
  },
  {
    id: 2,
    text: "Un service exceptionnel et très professionnel. Ils ont répondu à toutes mes questions rapidement et m'ont aidé à obtenir mon visa étudiant en un temps record. Une expérience vraiment remarquable.",
    name: "Oumayma B.",
    role: "Étudiante en Architecture — Rome",
    avatar: "OB",
    country: "🇹🇳",
    rating: 5,
  },
  {
    id: 3,
    text: "Je n'aurais pas pu réaliser mon rêve d'étudier en Italie sans l'aide de Viaitalia. Leur accompagnement personnalisé et leur expertise m'ont permis d'intégrer l'université de mes rêves.",
    name: "Ameni M.",
    role: "Étudiante en Design — Florence",
    avatar: "AM",
    country: "🇹🇳",
    rating: 5,
  },
  {
    id: 4,
    text: "Processus simple, équipe réactive et résultats excellents. Viaitalia a transformé ce qui semblait impossible en réalité. Mon dossier a été accepté en moins de 3 semaines !",
    name: "Mouhamed T.",
    role: "Étudiant en Ingénierie — Turin",
    avatar: "MT",
    country: "🇹🇳",
    rating: 5,
  },
];

/* ── Styled Components ── */

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 5%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
 
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #00c864;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 1rem;
  letter-spacing: -0.03em;
  line-height: 1.1;

  span {
    background: linear-gradient(90deg, #00c864, #ef4444);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: rgba(255,255,255,0.4);
  margin: 0 auto;
  max-width: 420px;
  line-height: 1.6;
`;

/* ── Slider wrapper ── */
const SliderWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  position: relative;
  opacity: 0;
`;

/* ── Card ── */
const CardOuter = styled.div`
  padding: 0.5rem;
`;

const CardInner = styled.div`
  position: relative;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 24px;
  padding: 3rem;
  transition: border-color 0.3s ease, background 0.3s ease;
  overflow: hidden;

  /* top-left quote mark */
  &::before {
    content: '"';
    position: absolute;
    top: -0.5rem;
    left: 1.5rem;
    font-size: 8rem;
    font-family: Georgia, serif;
    color: rgba(0,200,100,0.08);
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }

  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-bottom: 1.5rem;

  span {
    color: #f59e0b;
    font-size: 1.1rem;
  }
`;

const Quote = styled.p`
  font-size: 1.05rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.8;
  margin: 0 0 2rem;
  font-style: italic;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) { font-size: 0.95rem; }
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00c864, #009944);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(0,200,100,0.3);
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const AuthorRole = styled.div`
  font-size: 0.8rem;
  color: rgba(255,255,255,0.4);
  margin-top: 0.15rem;
`;

/* ── Navigation ── */
const NavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
`;

const NavBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.7);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(0,200,100,0.4);
    background: rgba(0,200,100,0.08);
    color: #00c864;
    transform: scale(1.08);
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Dot = styled.button`
  width: ${p => p.$active ? '24px' : '8px'};
  height: 8px;
  border-radius: 99px;
  border: none;
  background: ${p => p.$active
    ? 'linear-gradient(90deg, #00c864, #ef4444)'
    : 'rgba(255,255,255,0.15)'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: rgba(0,200,100,0.4);
    width: 16px;
  }
`;

/* ── Counter ── */
const Counter = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.25);
  font-variant-numeric: tabular-nums;
`;

/* ── Component ── */
const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const sliderRef  = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trig = { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" };
      gsap.to(headerRef.current,  { opacity: 1, y: 0,  duration: 1,         ease: "power3.out", scrollTrigger: trig });
      gsap.to(sliderRef.current,  { opacity: 1, y: 0,  duration: 1, delay: 0.2, ease: "power3.out", scrollTrigger: trig });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const goTo = (index) => {
    if (animating || index === current) return;
    setAnimating(true);

    gsap.to(cardRef.current, {
      opacity: 0, x: index > current ? -30 : 30, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        setCurrent(index);
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: index > current ? 30 : -30 },
          { opacity: 1, x: 0, duration: 0.35, ease: "power2.out",
            onComplete: () => setAnimating(false) }
        );
      }
    });
  };

  const prev = () => goTo(current === 0 ? TESTIMONIALS.length - 1 : current - 1);
  const next = () => goTo(current === TESTIMONIALS.length - 1 ? 0 : current + 1);

  /* auto-advance */
  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [current]);

  const t = TESTIMONIALS[current];

  return (
    <Section ref={sectionRef}>

      <Header ref={headerRef}>
        <Eyebrow>Ce qu'ils disent de nous</Eyebrow>
        <Title>What Our <span>Students Say</span></Title>
        <Subtitle>Des centaines d'étudiants ont réalisé leur rêve grâce à Viaitalia.</Subtitle>
      </Header>

      <SliderWrapper ref={sliderRef}>
        <CardOuter>
          <CardInner ref={cardRef}>
            <Stars>
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </Stars>
            <Quote>"{t.text}"</Quote>
            <AuthorRow>
              <Avatar>{t.avatar}</Avatar>
              <AuthorInfo>
                <AuthorName>{t.name} <span>{t.country}</span></AuthorName>
                <AuthorRole>{t.role}</AuthorRole>
              </AuthorInfo>
            </AuthorRow>
          </CardInner>
        </CardOuter>

        <NavRow>
          <NavBtn onClick={prev} aria-label="Précédent">←</NavBtn>
          <Dots>
            {TESTIMONIALS.map((_, i) => (
              <Dot key={i} $active={i === current} onClick={() => goTo(i)} />
            ))}
          </Dots>
          <NavBtn onClick={next} aria-label="Suivant">→</NavBtn>
          <Counter>{String(current + 1).padStart(2,'0')} / {String(TESTIMONIALS.length).padStart(2,'0')}</Counter>
        </NavRow>
      </SliderWrapper>

    </Section>
  );
};

export default Testimonials;