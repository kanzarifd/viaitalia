import React, { useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import rocket from "../../assets/rocket image.png";
import hand from "../../assets/hand.svg";
import university from "../../assets/University-of-Pisa-Italy.png";
import support from "../../assets/Support.svg";
import checked from "../../assets/checked.png";

gsap.registerPlugin(ScrollTrigger);

const move = keyframes`
0% { transform: translateY(-5px)         }
    50% { transform: translateY(10px) translateX(10px)        }
    100% { transform: translateY(-5px)         }
`;

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8rem 0;
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
  font-size: 1.5rem;
  line-height: 1.8;
  opacity: 0.9;
  margin: 1rem ;
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

const FeatureIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  transition: all 0.3s ease;

  ${FeatureItem}:hover & {
    transform: scale(1.1) rotate(5deg);
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
      title: "Personalized Guidance",
      description: "We guide you through each step of your journey to study in Italy",
      color: "var(--red)",
      icon: checked
    },
    {
      title: "University Expertise",
      description: "In-depth knowledge of Italian universities and their requirements",
      color: "var(--white)",
      icon: checked
    },
    {
      title: "Full Support",
      description: "From registration to installation, we are by your side",
      color: "var(--green)",
      icon: checked
    }
  ];

  return (
    <AboutSection ref={sectionRef} id="about">
      <Title ref={titleRef}>
About Vialtalia       </Title>
      
      <AboutContainer>
        <AboutContent ref={contentRef}>
          <AboutText>
            Vialtalia is your trusted partner for enrolling in Italian universities. We simplify your
            academic journey with clear, secure, and personalized support from the first application to your arrival in Italy.
          </AboutText>
          
        </AboutContent>
        
        <div>
          <RocketContainer ref={rocketRef}>
          </RocketContainer>
          
          <FeaturesList>
            {features.map((feature, index) => (
              <FeatureItem key={index} ref={addToFeaturesRef}>
                <FeatureIcon src={feature.icon} alt={feature.title} />
                <FeatureText>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureText>
              </FeatureItem>
            ))}
          </FeaturesList>
        </div>
      </AboutContainer>

     
    </AboutSection>
  );
};

export default About;