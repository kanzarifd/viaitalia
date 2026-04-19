import styled from "styled-components";

const CARD = styled.div`
  height: 500px;
  width: 300px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 12px;
  position: relative;
  margin-top: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  }
  
  @media only Screen and (max-width: 768px) {
    width: 280px;
    height: 450px;
    padding: 1.5rem;
    margin: 0 auto;
  }
  
  @media only Screen and (max-width: 480px) {
    width: 100%;
    max-width: 320px;
    height: auto;
    min-height: 400px;
    padding: 1.2rem;
    margin: 0 0 1rem;
  }
`;

const Image = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  margin-bottom: 1.5rem;
  
  @media only Screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }
  
  @media only Screen and (max-width: 480px) {
    width: 80px;
    height: 80px;
    margin-bottom: 0.8rem;
  }
`;

const TEXT = styled.h4`
  color: var(--white);
  padding: 0;
  text-align: center;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-weight: 400;
  
  @media only Screen and (max-width: 768px) {
    font-size: clamp(0.85rem, 3vw, 0.95rem);
    margin-bottom: 0.8rem;
  }
  
  @media only Screen and (max-width: 480px) {
    font-size: clamp(0.8rem, 4vw, 0.9rem);
    margin-bottom: 0.6rem;
    line-height: 1.5;
  }
`;

const NAME = styled.h3`
  color: var(--pink);
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 600;
  margin-bottom: 0.5rem;
  
  @media only Screen and (max-width: 768px) {
    font-size: clamp(0.9rem, 3.5vw, 1.1rem);
    margin-bottom: 0.4rem;
  }
  
  @media only Screen and (max-width: 480px) {
    font-size: clamp(0.85rem, 4vw, 1rem);
    margin-bottom: 0.3rem;
  }
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #ffd700;
`;

const Card = ({ name, text, image }) => {
  const Avatar = require(`../../assets/${image}.jpg`);

  return (
    <CARD>
      <Image img={Avatar} />
      <Stars>⭐⭐⭐⭐⭐</Stars>
      <TEXT>{text}</TEXT>
      <NAME>{name}</NAME>
    </CARD>
  );
};

export default Card;