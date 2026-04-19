import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tube from "../../assets/3dtube.png";
import Cone from "../../assets/3dtriangle.png";
import Capsule from "../../assets/3dcapsule.png";

import TextBlock from "../../components/Textblock";
import SvgBlock from "../../components/svgblock";

gsap.registerPlugin(ScrollTrigger);

const ServiceSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 5rem 2rem;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(50px);
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: var(--white);
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, var(--green), var(--red));
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  opacity: 0;
  transform: translateY(50px) scale(0.9);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: transparent;
    box-shadow: 
      0 40px 80px rgba(0, 255, 51, 0.2),
      0 20px 40px rgba(239, 68, 68, 0.1),
      inset 0 0 30px rgba(255, 255, 255, 0.05);
  }
`;

const DocumentCard = styled(ServiceCard)`
  &:hover {
    background: linear-gradient(135deg, rgba(9, 201, 51, 0.1), rgba(239, 68, 68, 0.1));
    animation: pulseGlow 2s ease-in-out infinite;
  }
  
  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(9, 201, 51, 0.3);
    }
    50% {
      box-shadow: 0 0 40px rgba(9, 201, 51, 0.5);
    }
  }
`;

const UniversityCard = styled(ServiceCard)`
  &:hover {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
    transform: translateY(-20px) scale(1.03) rotateZ(3deg);
    animation: borderWave 3s ease-in-out infinite;
  }
  
  @keyframes borderWave {
    0%, 100% {
      border-radius: 20px;
    }
    50% {
      border-radius: 30px;
    }
  }
`;

const FinanceCard = styled(ServiceCard)`
  &:hover {
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1));
    transform: translateY(-20px) scale(1.03) rotateX(-3deg);
    animation: shimmer 2s linear infinite;
  }
  
  @keyframes shimmer {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;

const TestCard = styled(ServiceCard)`
 &:hover {
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1));
    transform: translateY(-20px) scale(1.03) rotateX(-3deg);
    animation: shimmer 2s linear infinite;
  }
  
  @keyframes shimmer {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
 
`;

const FolderCard = styled(ServiceCard)`
  &:hover {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(124, 58, 237, 0.1));
    border: 2px solid rgba(168, 85, 247, 0.3);
    box-shadow: 
      0 0 20px rgba(168, 85, 247, 0.4),
      0 0 40px rgba(124, 58, 237, 0.3),
      inset 0 0 30px rgba(255, 255, 255, 0.1);
    animation: folderStack 2.5s ease-in-out infinite;
  }
  
  @keyframes folderStack {
    0%, 100% {
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
    }
    50% {
      box-shadow: 0 0 40px rgba(124, 58, 237, 0.4);
    }
  }
`;

const VisaCard = styled(ServiceCard)`
  &:hover {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1));
    transform: translateY(-20px) scale(1.03) rotateX(3deg);
    animation: stampEffect 3s ease-in-out infinite;
  }
  
  @keyframes stampEffect {
    0%, 100% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
      box-shadow: 0 0 30px rgba(239, 68, 68, 0.4);
    }
  }
`;

const HousingCard = styled(ServiceCard)`
  &:hover {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1));
    transform: translateY(-20px) scale(1.03) rotateZ(-3deg);
    animation: houseGlow 2.5s ease-in-out infinite;
  }
  
  @keyframes houseGlow {
    0%, 100% {
      box-shadow: 0 0 25px rgba(34, 197, 94, 0.3);
    }
    50% {
      box-shadow: 0 0 50px rgba(34, 197, 94, 0.5);
    }
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--green), var(--red));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: white;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, var(--green), var(--red));
    border-radius: 20px;
    z-index: -1;
    opacity: 0.5;
    filter: blur(10px);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceFeature = styled.li`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--green);
    font-weight: bold;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--green), var(--red));
  opacity: 0.1;
  filter: blur(40px);
`;

const Services = () => {
  const ref = useRef(null);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const floatingRefs = useRef([]);

  useEffect(() => {
    // Header animation - slower and more elegant
    gsap.fromTo(headerRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Cards animation with stagger - slower and more elegant
    gsap.fromTo(cardRefs.current, {
      opacity: 0,
      y: 50,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Floating elements animation - slower and more subtle
    floatingRefs.current.forEach((circle, index) => {
      gsap.to(circle, {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: "random(25, 35)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5
      });
    });
    
    // Parallax effect on scroll
    gsap.to(floatingRefs.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
    
  }, []);

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const addToFloatingRefs = (el) => {
    if (el && !floatingRefs.current.includes(el)) {
      floatingRefs.current.push(el);
    }
  };

  const services = [
    {
      icon: "📄",
      title: "Traduction & Apostille",
      description: "Certified document translation",
      features: [
        "Certified document translation",
        "The Hague Apostille"
      ]
    },
    {
      icon: "🎓",
      title: "University Applications", 
      description: "Complete admission support",
      features: [
        "Selection of universities",
        "File preparation"
      ]
    },
    {
      icon: "💰",
      title: "Scholarships & Housing",
      description: "Financial aid up to €7000",
      features: [
        "Recherche of bourses",
        "Surj ase samigolares"
      ]
    },
 /*
    {
      icon: "💻",
      title: "Tests en Ligne",
      description: "Préparation et passage des tests d'admission en ligne",
      features: [
        "Tests de langue",
        "Examens académiques",
        "Simulation en ligne",
        "Résultats instantanés"
      ]
    },
    {
      icon: "📁",
      title: "Dossier Académique",
      description: "Préparation complète de votre dossier académique et financier",
      features: [
        "Vérification des documents",
        "Compilation académique",
        "Traduction officielle",
        "Validation finale"
      ]
    },
    {
      icon: "🛂",
      title: "Visa Étudiant",
      description: "Dépôt et suivi complet de votre demande de visa étudiant",
      features: [
        "Préparation du visa",
        "Dépôt en ligne",
        "Suivi du dossier",
        "Assistance consulaire"
      ]
    },*/

  ];

  return (
    <ServiceSection id="services" ref={sectionRef}>
      <FloatingElements>
        <FloatingCircle 
          ref={addToFloatingRefs}
          style={{
            width: '200px',
            height: '200px',
            top: '10%',
            left: '10%'
          }}
        />
        <FloatingCircle 
          ref={addToFloatingRefs}
          style={{
            width: '150px',
            height: '150px',
            top: '60%',
            right: '15%'
          }}
        />
        <FloatingCircle 
          ref={addToFloatingRefs}
          style={{
            width: '100px',
            height: '100px',
            bottom: '20%',
            left: '20%'
          }}
        />
      </FloatingElements>
      
      <SectionHeader ref={headerRef}>
        <SectionTitle>Our Services</SectionTitle>
        <SectionSubtitle>
          We deliver comprehensive digital solutions to help your business thrive in modern world
        </SectionSubtitle>
      </SectionHeader>
      
      <ServicesGrid>
        {services.map((service, index) => {
          let CardComponent;
          switch(index) {
            case 0:
              CardComponent = DocumentCard;
              break;
            case 1:
              CardComponent = UniversityCard;
              break;
            case 2:
              CardComponent = FinanceCard;
              break;
            case 3:
              CardComponent = TestCard;
              break;
            case 4:
              CardComponent = FolderCard;
              break;
            case 5:
              CardComponent = VisaCard;
              break;
            case 6:
              CardComponent = HousingCard;
              break;
            default:
              CardComponent = ServiceCard;
          }
          
          return (
            <CardComponent key={index} ref={addToCardRefs}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature, featureIndex) => (
                  <ServiceFeature key={featureIndex}>
                    {feature}
                  </ServiceFeature>
                ))}
              </ServiceFeatures>
            </CardComponent>
          );
        })}
      </ServicesGrid>
    </ServiceSection>
  );
};

export default Services;