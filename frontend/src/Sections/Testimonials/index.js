
import React, { lazy } from "react";
import styled from "styled-components";

import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

const Card = lazy(() => import("../../components/card/index"));

const Section = styled.div`
  min-height: 100vh;
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

    pointer-events: none;
    z-index: 1;
  }
  
  @media only Screen and (max-width: 768px) {
    padding: 3rem 0;
    min-height: auto;
    justify-content: flex-start;
    align-items: stretch;
  }
  
  @media only Screen and (max-width: 480px) {
    padding: 2rem 0;
    min-height: auto;
    justify-content: flex-start;
    align-items: stretch;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  display: inline-block;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  text-align: center;
  
  &::before {
    content: "";
    height: 4px;
    width: 80%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0.5rem);
    background: linear-gradient(90deg, var(--green), var(--red));
    border-radius: 2px;
  }
  
  @media only Screen and (max-width: 768px) {
    font-size: clamp(1.3rem, 5vw, 2rem);
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    
    &::before {
      width: 90%;
      transform: translate(-50%, 0.4rem);
    }
  }
  
  @media only Screen and (max-width: 480px) {
    font-size: clamp(1.2rem, 6vw, 1.8rem);
    margin-top: 0.8rem;
    margin-bottom: 1rem;
    padding: 0 1rem;
    
    &::before {
      width: 100%;
      height: 3px;
      transform: translate(-50%, 0.3rem);
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
  
  @media only Screen and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.8rem;
    width: 95%;
  }
  
  @media only Screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    width: 95%;
    padding: 1.5rem 0;
  }
  
  @media only Screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    width: 100%;
    padding: 1rem;
  }
  
  @media only Screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
    padding: 1rem 0.5rem;
  }
`;

const Testimonials = () => {
  return (
    <Section>
      <Title>Few good words about us!</Title>
      <Grid>
        <Card
          text="Viaitalia m’a beaucoup aidé dans toutes les étapes, du choix de l’université jusqu’à la préparation de mon dossier. Le processus était beaucoup plus simple que je ne l’imaginais. Je recommande vivement.
          "
            name="Rania B. – Sousse"
            image="avatar-1"
        />

        <Card
          text="Grâce à Viaitalia, j’ai été accepté dans une université en Italie sans stress. L’équipe est très professionnelle et toujours disponible pour répondre aux questions."
            name="Fedi K. – Tunis"
            image="avatar-2"
        />

        <Card
          text="J’étais un peu perdu au début, mais Viaitalia m’a guidé étape par étape. Ils savent vraiment ce qu’ils font. Service de qualité."
            name="Ahmed M. – Sfax"
            image="avatar-3"
        />


      </Grid>
    </Section>
  );
};

export default Testimonials;
