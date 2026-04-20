import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Instagram from "../../assets/instagram-square-brands.svg";
import Facebook from "../../assets/facebook-square-brands.svg";
import Mail from "../../assets/envelope-open-solid.svg";
import Mobile from "../../assets/mobile.svg";
import CTAButton from '../CTAButton'; // added import for CTAButton

gsap.registerPlugin(ScrollTrigger);

const FOOTER = styled.footer`
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
    background: 
      radial-gradient(circle at 20% 50%, rgba(0, 255, 51, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
`;

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4rem;
  width: 90%;
  max-width: 1200px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(50px);
`;

const SectionTitle = styled.h3`
  color: var(--green);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, var(--green), var(--red));
    border-radius: 2px;

    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterText = styled.p`
  color: var(--white);
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
  margin: 0;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 255, 51, 0.3);
    transform: translateX(5px) scale(1.02);
    box-shadow: 
      0 10px 20px rgba(0, 255, 51, 0.2),
      0 5px 10px rgba(239, 68, 68, 0.1);
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    filter: invert(1);
    transition: all 0.3s ease;
  }

  &:hover img {
    filter: invert(1) brightness(1.5) drop-shadow(0 0 8px rgba(0, 255, 51, 0.5));
  }
`;

const ContactText = styled.span`
  color: var(--white);
  font-size: 0.9rem;
  opacity: 0.9;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
  opacity: 0;
  transform: scale(0);

  img {
    width: 1.2rem;
    height: 1.2rem;
    filter: invert(1);
    transition: all 0.3s ease;
  }

  &:hover {
    background: rgba(0, 255, 51, 0.2);
    border-color: rgba(0, 255, 51, 0.5);
    transform: scale(1.1) rotate(360deg);

    img {
      filter: invert(1) brightness(1.5) drop-shadow(0 0 8px rgba(0, 255, 51, 0.8));
    }
  }
`;

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterLink = styled.a`
  color: var(--white);
  font-size: 1rem;
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 1rem;

  &::before {
    content: '→';
    position: absolute;
    left: 0;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
    color: var(--green);
  }

  &:hover {
    color: var(--green);
    opacity: 1;
    padding-left: 1.5rem;

    &::before {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsletterInput = styled.input`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: var(--white);
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(0, 255, 51, 0.5);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 15px rgba(0, 255, 51, 0.2);
  }
`;

const NewsletterButton = styled.button`
  padding: 1rem;
  background: linear-gradient(90deg, var(--green), var(--red));
  border: none;
  border-radius: 10px;
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 15px 30px rgba(0, 255, 51, 0.3),
      0 8px 15px rgba(239, 68, 68, 0.2);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const BottomBar = styled.div`
  width: 100%;
  padding: 2rem 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
  margin-top: 4rem;
`;

const BottomContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: var(--white);
  font-size: 0.9rem;
  opacity: 0.7;
  margin: 0;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const BottomLink = styled.a`
  color: var(--white);
  font-size: 0.9rem;
  text-decoration: none;
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    color: var(--green);
    opacity: 1;
  }
`;

const Footer = () => {
  const footerRef = useRef(null);
  const sectionsRef = useRef([]);
  const socialIconsRef = useRef([]);
  const bottomBarRef = useRef(null);
  const appointmentBtnRef = useRef(null);

  useEffect(() => {
    // Footer sections animation
    gsap.fromTo(sectionsRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });

    // Social icons animation
    gsap.fromTo(socialIconsRef.current, {
      opacity: 0,
      scale: 0
    }, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });

    // Bottom bar animation
    gsap.fromTo(bottomBarRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  const addToSectionsRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addToSocialIconsRef = (el) => {
    if (el && !socialIconsRef.current.includes(el)) {
      socialIconsRef.current.push(el);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log('Newsletter submitted');
  };

  return (
    <FOOTER ref={footerRef}>
      <FooterContainer>
        <FooterSection ref={addToSectionsRef}>
          <SectionTitle>À Propos de Viaitalia</SectionTitle>
          <FooterText>
            Vialtalia is your trusted partner for enrolling in Italian universities. We simplify your academic journey with clear, secure, and personalized support 
            from the first application to your arrival in Italy.
          </FooterText>
          <SocialIcons>
            <SocialIcon ref={addToSocialIconsRef} href="https://www.facebook.com/share/18gE6aiDxC/?mibextid=wwXIfr">
              <img src={Facebook} alt="Facebook" />
            </SocialIcon>
            <SocialIcon ref={addToSocialIconsRef} href="https://www.instagram.com/via_italiaconsulting?igsh=cW96NWZ4czBnOXZh">
              <img src={Instagram} alt="Instagram" />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>

        <FooterSection ref={addToSectionsRef}>
          <SectionTitle>Contact Rapide</SectionTitle>
          <ContactInfo>
         
            <ContactItem>
              <img src={Mobile} alt="Phone" />
              <ContactText>+216 22 552 722</ContactText>
            </ContactItem>
            <ContactItem>
              <img src={Mail} alt="Email" />
              <ContactText>viaitaliaagency@gmail.com</ContactText>
            </ContactItem>
          </ContactInfo>
        </FooterSection>

        <FooterSection ref={addToSectionsRef}>
          <SectionTitle>Liens Utiles</SectionTitle>
          <QuickLinks>
            <FooterLink href="#services">Nos Services</FooterLink>
            <FooterLink href="#testimonials">Témoignages</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
            <FooterLink href="#about">À Propos</FooterLink>
          </QuickLinks>
                     <CTAButton ref={appointmentBtnRef} primary onClick={() => window.open('https://calendly.com/viaitaliaagency/30min', '_blank')}>
              Book free consultation
              <span style={{ marginLeft: '0.6rem', fontSize: '1.2rem', filter: 'brightness(0.7)' }}>📅</span>
            </CTAButton>
        </FooterSection>
      </FooterContainer>

      <BottomBar ref={bottomBarRef}>
        <BottomContent>
          <Copyright>
            &copy; 2026 Viaitalia. Tous droits réservés.
          </Copyright>
          <BottomLinks>
            <BottomLink href="#privacy">Politique de Confidentialité</BottomLink>
            <BottomLink href="#terms">Conditions d'Utilisation</BottomLink>
            <BottomLink href="#cookies">Politique de Cookies</BottomLink>
          </BottomLinks>
        </BottomContent>
      </BottomBar>
    </FOOTER>
  );
};

export default Footer;