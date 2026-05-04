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
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  background:
    /* soft lighting layer (was ::before) */
    radial-gradient(circle at 15% 50%, rgba(0, 255, 150, 0.12), transparent 40%),
    radial-gradient(circle at 85% 50%, rgba(255, 80, 80, 0.12), transparent 40%),
    radial-gradient(circle at center, rgba(0,0,0,0.3), transparent 70%),
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
  &::after {
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
  }
`;

const Home = () => {
  return (
    <Container>
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