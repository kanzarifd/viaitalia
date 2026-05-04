import React, { useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const shimmer = keyframes`
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
`;

/* ───────── SECTION ───────── */
const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* ───────── HEADER ───────── */
const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const Eyebrow = styled.div`
  color: #00c864;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: #fff;
  margin: 1rem 0;

  span {
    background: linear-gradient(90deg, #00c864, #ef4444);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 4s linear infinite;
  }
`;

const Subtitle = styled.p`
  color: rgba(255,255,255,0.6);
  max-width: 600px;
  margin: 1rem auto 0;
`;

/* ───────── TIMELINE ───────── */
const Timeline = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(#00c864, #ef4444);
    transform: translateX(-50%);
  }

  @media (max-width: 768px) {
    &::before {
      left: 20px;
    }
  }
`;

/* ───────── ITEM ───────── */
const Item = styled.div`
  display: flex;
  justify-content: ${({ left }) => (left ? "flex-start" : "flex-end")};
  margin-bottom: 4rem;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 50px;
  }
`;

/* ───────── CARD ───────── */
const Card = styled.div`
  width: 45%;
  background: rgba(20,20,25,0.7);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 2rem;
  transition: 0.3s;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(0,200,100,0.3);
    box-shadow: 0 20px 40px rgba(0,200,100,0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* ───────── DOT ───────── */
const Dot = styled.div`
  position: absolute;
  left: 50%;
  top: 20px;
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, #00c864, #ef4444);
  border-radius: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    left: 20px;
  }
`;

/* ───────── TEXT ───────── */
const Step = styled.h4`
  color: #00c864;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const Desc = styled.p`
  color: rgba(255,255,255,0.6);
  font-size: 0.95rem;
  line-height: 1.6;
`;

/* ───────── COMPONENT ───────── */
const HowItWorks = () => {
  const itemsRef = useRef([]);

  const steps = [
    {
      step: "STEP 1",
      title: "Free Consultation",
      desc: "Discuss your goals and eligibility with our experts."
    },
    {
      step: "STEP 2",
      title: "Document Preparation",
      desc: "We prepare, translate and legalize all documents."
    },
    {
      step: "STEP 3",
      title: "University Application",
      desc: "We apply and track your admission process."
    },
    {
      step: "STEP 4",
      title: "Arrival in Italy",
      desc: "Visa, housing and full support when you arrive."
    }
  ];

  useEffect(() => {
    itemsRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <Section id="how-it-works">
      <Header>
        <Eyebrow>PROCESS</Eyebrow>
        <Title>
          How It <span>Works</span>
        </Title>
        <Subtitle>
          A simple and structured path to study in Italy
        </Subtitle>
      </Header>

      <Timeline>
        {steps.map((item, i) => (
          <Item
            key={i}
            left={i % 2 === 0}
            ref={(el) => (itemsRef.current[i] = el)}
          >
            <Card>
              <Step>{item.step}</Step>
              <CardTitle>{item.title}</CardTitle>
              <Desc>{item.desc}</Desc>
            </Card>

            <Dot />
          </Item>
        ))}
      </Timeline>
    </Section>
  );
};

export default HowItWorks;