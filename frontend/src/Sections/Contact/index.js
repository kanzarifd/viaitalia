import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Facebook from "../../assets/facebook-square-brands.svg";
import Instagram from "../../assets/instagram-square-brands.svg";
import Mail from "../../assets/envelope-open-solid.svg";
import Mobile from "../../assets/mobile.svg";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = styled.section`
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

const ContactContainer = styled.div`
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

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 255, 51, 0.3);
    transform: translateX(0) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 255, 51, 0.2),
      0 10px 20px rgba(239, 68, 68, 0.1);
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
    filter: invert(1);
    transition: all 0.3s ease;
  }

  &:hover img {
    filter: invert(1) brightness(1.5) drop-shadow(0 0 10px rgba(0, 255, 51, 0.5));
  }
`;

const ContactText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactLabel = styled.h3`
  color: var(--green);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const ContactValue = styled.p`
  color: var(--white);
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 0;
  transform: translateX(50px);
`;

const FormGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: var(--white);
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(0, 255, 51, 0.5);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 20px rgba(0, 255, 51, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: var(--white);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(0, 255, 51, 0.5);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 20px rgba(0, 255, 51, 0.2);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(90deg, var(--green), var(--red));
  border: none;
  border-radius: 25px;
  color: var(--white);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;
  min-width: 200px;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 
      0 20px 40px rgba(0, 255, 51, 0.3),
      0 10px 20px rgba(239, 68, 68, 0.2);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialIcon = styled.a`
  width: 50px;
  height: 50px;
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
    width: 1.5rem;
    height: 1.5rem;
    filter: invert(1);
    transition: all 0.3s ease;
  }

  &:hover {
    background: rgba(0, 255, 51, 0.2);
    border-color: rgba(0, 255, 51, 0.5);
    transform: scale(1.1) rotate(360deg);

    img {
      filter: invert(1) brightness(1.5) drop-shadow(0 0 10px rgba(0, 255, 51, 0.8));
    }
  }
`;

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contactItemsRef = useRef([]);
  const formRef = useRef(null);
  const socialIconsRef = useRef([]);

  useEffect(() => {
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

    // Contact items animation
    gsap.fromTo(contactItemsRef.current, {
      opacity: 0,
      x: -50
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

    // Form animation
    gsap.fromTo(formRef.current, {
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
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  const addToContactItemsRef = (el) => {
    if (el && !contactItemsRef.current.includes(el)) {
      contactItemsRef.current.push(el);
    }
  };

  const addToSocialIconsRef = (el) => {
    if (el && !socialIconsRef.current.includes(el)) {
      socialIconsRef.current.push(el);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <ContactSection ref={sectionRef} id="contact">
      <Title ref={titleRef}>
        Contactez-Nous
      </Title>
      
      <ContactContainer>
        <ContactInfo>
          <ContactItem ref={addToContactItemsRef}>
            <img src={Mobile} alt="Location" />
            <ContactText>
              <ContactLabel>Adresse</ContactLabel>
              <ContactValue>Via Roma, 123 - 00100 Rome, Italie</ContactValue>
            </ContactText>
          </ContactItem>
          
          <ContactItem ref={addToContactItemsRef}>
            <img src={Mobile} alt="Phone" />
            <ContactText>
              <ContactLabel>Téléphone</ContactLabel>
              <ContactValue>+39 06 12345678</ContactValue>
            </ContactText>
          </ContactItem>
          
          <ContactItem ref={addToContactItemsRef}>
            <img src={Mail} alt="Email" />
            <ContactText>
              <ContactLabel>Email</ContactLabel>
              <ContactValue>contact@viaitalia.it</ContactValue>
            </ContactText>
          </ContactItem>
          
          <SocialIcons>
            <SocialIcon ref={addToSocialIconsRef} href="https://facebook.com">
              <img src={Facebook} alt="Facebook" />
            </SocialIcon>
            <SocialIcon ref={addToSocialIconsRef} href="https://instagram.com">
              <img src={Instagram} alt="Instagram" />
            </SocialIcon>
          </SocialIcons>
        </ContactInfo>
        
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormGroup>
            <Input type="text" placeholder="Nom complet" required />
            <Input type="email" placeholder="Email" required />
          </FormGroup>
          <Input type="tel" placeholder="Téléphone" />
          <TextArea placeholder="Votre message..." required />
          <SubmitButton type="submit">
            Envoyer le Message
          </SubmitButton>
        </Form>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;