import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import service icons
import DocumentIcon from "../../assets/service/Folder-File--Streamline-Ultimate.png";
import AcademicIcon from "../../assets/service/Online-Learning-Student-1--Streamline-Ultimate.png";
import MoneyIcon from "../../assets/service/Money-Bags--Streamline-Ultimate.png";
import TestIcon from "../../assets/service/Desktop-Computer-Pc--Streamline-Ultimate.png";
import FolderIcon from "../../assets/service/Folder-Empty-1--Streamline-Ultimate.png";
import VisaIcon from "../../assets/service/Visa-Logo--Streamline-Ultimate.png";

gsap.registerPlugin(ScrollTrigger);

/* ── Animations ── */
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

/* ── Data ── */
const SERVICES = [
  {
    icon: DocumentIcon,
    title: "Traduction & Apostille",
    description: "Traduction certifiée et légalisation de vos documents officiels pour les universités italiennes.",
    features: ["Traduction certifiée", "Apostille La Haye", "Légalisation consulaire", "Délais rapides"],
    accent: "#00c864",
  },
  {
    icon: AcademicIcon,
    title: "Candidatures Universitaires",
    description: "Accompagnement complet pour votre admission dans les meilleures universités d'Italie.",
    features: ["Sélection d'universités", "Préparation du dossier", "Suivi de candidature", "Lettre de motivation"],
    accent: "#3b82f6",
  },
  {
    icon: MoneyIcon,
    title: "Bourses & Logement",
    description: "Recherche de bourses jusqu'à 7 000 € et aide à la recherche de logement étudiant.",
    features: ["Bourses d'études", "Logement étudiant", "Aides financières", "Conseils budgétaires"],
    accent: "#f59e0b",
  },
  {
    icon: TestIcon,
    title: "Tests en Ligne",
    description: "Préparation et passage des tests d'admission en ligne pour les universités italiennes.",
    features: ["Tests de langue", "Examens académiques", "Simulation en ligne", "Résultats instantanés"],
    accent: "#a855f7",
  },
  {
    icon: FolderIcon,
    title: "Dossier Académique",
    description: "Préparation complète de votre dossier académique et financier pour maximiser vos chances.",
    features: ["Vérification des documents", "Compilation académique", "Traduction officielle", "Validation finale"],
    accent: "#ec4899",
  },
  {
    icon: VisaIcon,
    title: "Visa Étudiant",
    description: "Dépôt et suivi complet de votre demande de visa étudiant auprès des autorités consulaires.",
    features: ["Préparation du visa", "Dépôt en ligne", "Suivi du dossier", "Assistance consulaire"],
    accent: "#ef4444",
  },
];

/* ── Styled Components ── */

const ServiceSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 5%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

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
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
`;

/* ── Grid ── */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }
`;

/* ── Card ── */
const Card = styled.div`
  position: relative;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  opacity: 0;
  overflow: hidden;
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  /* top accent bar */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${p => p.$accent || '#00c864'};
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 20px 20px 0 0;
  }

  &:hover {
    border-color: ${p => p.$accent ? `${p.$accent}30` : 'rgba(0,200,100,0.3)'};
    background: rgba(255,255,255,0.07);
    transform: translateY(-6px);
    box-shadow: 0 20px 50px ${p => p.$accent ? `${p.$accent}20` : 'rgba(0,200,100,0.2)'};

    &::before { opacity: 1; }
  }
`;

const IconBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${p => p.$accent ? `${p.$accent}18` : 'rgba(0,200,100,0.12)'};
  border: 1px solid ${p => p.$accent ? `${p.$accent}30` : 'rgba(0,200,100,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  transition: transform 0.3s ease;

  img {
    width: 28px;
    height: 28px;
    filter: brightness(0) invert(1);
    transition: transform 0.3s ease;
  }

  ${Card}:hover & {
    transform: scale(1.1) rotate(-4deg);
    
    img {
      transform: scale(1.1);
    }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.6rem;
  letter-spacing: -0.01em;
`;

const CardDesc = styled.p`
  font-size: 0.88rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.6;
  margin: 0 0 1.25rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const Feature = styled.li`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${p => p.$accent || '#00c864'};
    flex-shrink: 0;
  }
`;

const CardNumber = styled.span`
  position: absolute;
  bottom: 1.25rem;
  right: 1.5rem;
  font-size: 0.65rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.12);
`;

/* ── Component ── */
const Services = () => {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const cardRefs   = useRef([]);
  cardRefs.current = [];

  const addCard = (el) => el && cardRefs.current.push(el);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trig = {
        trigger: sectionRef.current,
        start: "top 65%",
        toggleActions: "play none none reverse",
      };

      gsap.to(headerRef.current, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: trig,
      });

      gsap.to(cardRefs.current, {
        opacity: 1, y: 0, duration: 0.8,
        stagger: 0.1, ease: "power3.out", delay: 0.2,
        scrollTrigger: trig,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <ServiceSection id="services" ref={sectionRef}>

      <Header ref={headerRef}>
        <Eyebrow>Ce que nous offrons</Eyebrow>
        <Title>Nos <span>Services</span></Title>
        <Subtitle>
          Un accompagnement complet pour votre parcours universitaire en Italie,
          de l'inscription jusqu'à votre arrivée.
        </Subtitle>
      </Header>

      <Grid>
        {SERVICES.map((s, i) => (
          <Card key={i} ref={addCard} $accent={s.accent}>
            <IconBox $accent={s.accent}>
              <img src={s.icon} alt={s.title} />
            </IconBox>
            <CardTitle>{s.title}</CardTitle>
            <CardDesc>{s.description}</CardDesc>
            <FeatureList>
              {s.features.map((f, j) => (
                <Feature key={j} $accent={s.accent}>{f}</Feature>
              ))}
            </FeatureList>
            <CardNumber>0{i + 1}</CardNumber>
          </Card>
        ))}
      </Grid>

    </ServiceSection>
  );
};

export default Services;