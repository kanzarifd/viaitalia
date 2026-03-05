import React, { useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import rocket from "../../assets/rocket image.png";
import hand from "../../assets/hand.svg";

gsap.registerPlugin(ScrollTrigger);

const move = keyframes`
0% { transform: translateY(-5px)         }
    50% { transform: translateY(10px) translateX(10px)        }
    100% { transform: translateY(-5px)         }
`;

const AboutSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0b10 0%, #1a1f2e 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5rem 0;
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
      radial-gradient(circle at 20% 50%, rgba(0, 255, 51, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
`;

const FloatingParticle = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
`;

const MovingGradient = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  filter: blur(40px);
`;

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 90%;
  max-width: 1200px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const Title = styled.h1`
  color: var(--white);
  font-size: calc(2rem + 2vw);
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  z-index: 2;
  opacity: 0;
  transform: translateY(50px);
  text-shadow: 0 0 20px rgba(0, 255, 51, 0.3);

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, var(--green), var(--red));
    border-radius: 2px;
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  opacity: 0;
  transform: translateX(-50px);
`;

const AboutText = styled.p`
  color: var(--white);
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.9;
  margin: 0;
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 255, 51, 0.3);
    transform: translateX(0) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 255, 51, 0.2),
      0 10px 20px rgba(239, 68, 68, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, var(--green), var(--red));
  border-radius: 50%;
  transition: all 0.3s ease;

  ${FeatureItem}:hover & {
    transform: scale(1.1) rotate(360deg);
  }
`;

const FeatureCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const FeatureText = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  color: var(--green);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: var(--white);
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
`;

const RocketContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: scale(0.8);
`;

const RocketImage = styled.img`
  width: 150px;
  height: auto;
  animation: ${move} 2.5s ease infinite;
  filter: drop-shadow(0 0 20px rgba(0, 255, 51, 0.5));

  @media (max-width: 768px) {
    width: 100px;
  }
`;

const HandContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  opacity: 0;
  transform: translateX(50px);

  @media (max-width: 768px) {
    display: none;
  }
`;

const HandImage = styled.img`
  width: 200px;
  height: auto;
  filter: invert(1) drop-shadow(0 0 20px rgba(239, 68, 68, 0.5));

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef([]);
  const rocketRef = useRef(null);
  const handRef = useRef(null);
  const particlesRef = useRef([]);
  const gradientsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    
    // Create moving stars
    const createStars = () => {
      const colors = ['rgba(255, 255, 255, 0.8)', 'rgba(0, 255, 51, 0.8)', 'rgba(239, 68, 68, 0.8)'];
      
      for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        star.style.cssText = `
          position: absolute;
          width: ${Math.random() * 3 + 1}px;
          height: ${Math.random() * 3 + 1}px;
          background: ${color};
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          pointer-events: none;
          z-index: 1;
          box-shadow: 0 0 ${Math.random() * 10 + 5}px ${color};
        `;
        section.appendChild(star);
        particlesRef.current.push(star);

        // Animate each star
        gsap.set(star, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          scale: 0
        });

        gsap.to(star, {
          x: `+=${Math.random() * 300 - 150}`,
          y: `+=${Math.random() * 300 - 150}`,
          rotation: `+=${Math.random() * 360 - 180}`,
          scale: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 8 + 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 3
        });

        // Twinkling effect
        gsap.to(star, {
          opacity: Math.random() * 0.5 + 0.5,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    };

    // Create floating particles
    const createParticles = () => {
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 1}px;
          height: ${Math.random() * 4 + 1}px;
          background: ${Math.random() > 0.5 ? 'rgba(0, 255, 51, 0.6)' : 'rgba(239, 68, 68, 0.6)'};
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        `;
        section.appendChild(particle);
        particlesRef.current.push(particle);

        // Animate each particle
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: 0
        });

        gsap.to(particle, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          scale: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 10 + 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 5
        });
      }
    };

    // Create moving gradients
    const createMovingGradients = () => {
      for (let i = 0; i < 5; i++) {
        const gradient = document.createElement('div');
        gradient.className = 'moving-gradient';
        gradient.style.cssText = `
          position: absolute;
          width: ${Math.random() * 300 + 100}px;
          height: ${Math.random() * 300 + 100}px;
          background: ${Math.random() > 0.5 ? 
            'radial-gradient(circle, rgba(0, 255, 51, 0.3) 0%, transparent 70%)' : 
            'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)'};
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          filter: blur(40px);
        `;
        section.appendChild(gradient);
        gradientsRef.current.push(gradient);

        // Animate each gradient
        gsap.set(gradient, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: 0
        });

        gsap.to(gradient, {
          x: `+=${Math.random() * 400 - 200}`,
          y: `+=${Math.random() * 400 - 200}`,
          scale: Math.random() * 3 + 1,
          opacity: Math.random() * 0.4 + 0.1,
          duration: Math.random() * 15 + 10,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 3
        });
      }
    };

    // Background color animation
    const bgTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    
    bgTimeline
      .to(section, {
        duration: 3,
        background: 'linear-gradient(135deg, rgba(0, 255, 51, 0.05) 0%, #1a1f2e 100%)',
        ease: "power2.inOut"
      })
      .to(section, {
        duration: 3,
        background: 'linear-gradient(135deg, #0a0b10 0%, rgba(239, 68, 68, 0.05) 100%)',
        ease: "power2.inOut"
      })
      .to(section, {
        duration: 3,
        background: 'linear-gradient(135deg, rgba(0, 255, 51, 0.03) 0%, rgba(239, 68, 68, 0.03) 100%)',
        ease: "power2.inOut"
      })
      .to(section, {
        duration: 3,
        background: 'linear-gradient(135deg, #0a0b10 0%, #1a1f2e 100%)',
        ease: "power2.inOut"
      });

    // Create dynamic elements
    createStars();
    createParticles();
    createMovingGradients();

    // Pulsing radial overlay
    gsap.to(section.querySelector('::before'), {
      opacity: 0.5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Title animation
    gsap.fromTo(titleRef.current, {
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

    // Content animation
    gsap.fromTo(contentRef.current, {
      opacity: 0,
      x: -50
    }, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });

    // Features animation
    gsap.fromTo(featuresRef.current, {
      opacity: 0,
      x: 50
    }, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });

    // Rocket animation
    gsap.fromTo(rocketRef.current, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });

    // Hand animation
    gsap.fromTo(handRef.current, {
      opacity: 0,
      x: 50
    }, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });

    // Cleanup
    return () => {
      particlesRef.current.forEach(particle => particle.remove());
      gradientsRef.current.forEach(gradient => gradient.remove());
    };
  }, []);

  const addToFeaturesRef = (el) => {
    if (el && !featuresRef.current.includes(el)) {
      featuresRef.current.push(el);
    }
  };

  const features = [
    {
      title: "Accompagnement Personnalisé",
      description: "Nous vous guidons à chaque étape de votre parcours académique en Italie",
      color: "var(--red)"
    },
    {
      title: "Expertise Universitaire",
      description: "Connaissance approfondie des universités italiennes et de leurs exigences",
      color: "var(--white)"
    },
    {
      title: "Support Complet",
      description: "De l'inscription à l'installation, nous sommes à vos côtés",
      color: "var(--green)"
    }
  ];

  return (
    <AboutSection ref={sectionRef} id="about">
      <Title ref={titleRef}>
        À Propos de Viaitalia
      </Title>
      
      <AboutContainer>
        <AboutContent ref={contentRef}>
          <AboutText>
            Viaitalia est une plateforme spécialisée dans l'accompagnement des étudiants souhaitant poursuivre leurs études en Italie. 
            Notre mission est simple : rendre votre projet académique clair, sécurisé et réalisable, de la première inscription jusqu'à votre installation en Italie.
          </AboutText>
          <AboutText>
            Nous mettons à votre disposition notre expertise et notre réseau pour garantir votre succès dans les meilleures universités italiennes.
          </AboutText>
        </AboutContent>
        
        <div>
          <RocketContainer ref={rocketRef}>
            <RocketImage src={rocket} alt="Rocket" />
          </RocketContainer>
          
          <FeaturesList>
            {features.map((feature, index) => (
              <FeatureItem key={index} ref={addToFeaturesRef}>
                <FeatureIcon>
                  <FeatureCircle color={feature.color} />
                </FeatureIcon>
                <FeatureText>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureText>
              </FeatureItem>
            ))}
          </FeaturesList>
        </div>
      </AboutContainer>

      <HandContainer ref={handRef}>
        <HandImage src={hand} alt="Hand" />
      </HandContainer>
    </AboutSection>
  );
};

export default About;