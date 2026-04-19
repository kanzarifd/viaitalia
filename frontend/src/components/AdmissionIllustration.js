import React from 'react';
import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const particleFloat = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
`;

const IllustrationContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 400px;
  margin: 0 auto;
  perspective: 1000px;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, #0d4f3c 0%, #0a2f24 50%, #061a14 100%);
  border-radius: 20px;
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 100%);
  border-radius: 50%;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation: ${particleFloat} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  filter: blur(1px);
`;

const PhoneContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-5deg) translateZ(50px);
  animation: ${floatAnimation} 6s ease-in-out infinite;
`;

const Phone = styled.div`
  width: 180px;
  height: 320px;
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border-radius: 30px;
  padding: 8px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 60px rgba(0, 255, 51, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
  position: relative;
`;

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  border-radius: 22px;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const ItalianFlag = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 20px;
  background: linear-gradient(90deg, #009246 33.33%, #ffffff 33.33%, #ffffff 66.66%, #ce2b37 66.66%);
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AcceptanceCard = styled.div`
  width: 100%;
  background: white;
  border-radius: 12px;
  padding: 15px;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Checkmark = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(145deg, #00c853, #00e676);
  border-radius: 50%;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 200, 83, 0.3);
`;

const CheckmarkIcon = styled.div`
  width: 20px;
  height: 12px;
  border-left: 3px solid white;
  border-bottom: 3px solid white;
  transform: rotate(-45deg);
  margin-left: 4px;
`;

const AcceptedText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #00c853;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

const PlaceholderLines = styled.div`
  width: 100%;
`;

const PlaceholderLine = styled.div`
  height: 6px;
  background: linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%);
  border-radius: 3px;
  margin-bottom: 6px;
  width: ${props => props.width};
`;

const Passport = styled.div`
  position: absolute;
  bottom: 80px;
  right: 80px;
  width: 140px;
  height: 90px;
  background: linear-gradient(145deg, #1b5e20, #0d3d0f);
  border-radius: 8px;
  padding: 10px;
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(0, 255, 51, 0.1);
  transform: rotate(8deg) translateZ(30px);
  animation: ${floatAnimation} 7s ease-in-out infinite;
  animation-delay: 1s;
`;

const PassportText = styled.div`
  color: #ffd700;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 255, 51, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: ${pulseGlow} 4s ease-in-out infinite;
  pointer-events: none;
`;

const AdmissionIllustration = () => {
  return (
    <IllustrationContainer>
      <Background />
      
      {/* Light particles */}
      <Particle size={3} top={20} left={15} duration={8} delay={0} />
      <Particle size={2} top={80} left={85} duration={6} delay={1} />
      <Particle size={4} top={30} left={70} duration={10} delay={2} />
      <Particle size={2} top={60} left={25} duration={7} delay={3} />
      <Particle size={3} top={15} left={45} duration={9} delay={1.5} />
      <Particle size={5} top={75} left={60} duration={8} delay={0.5} />
      <Particle size={2} top={40} left={90} duration={6} delay={2.5} />
      <Particle size={3} top={85} left={10} duration={7} delay={1} />
      
      <GlowEffect />
      
      <PhoneContainer>
        <Phone>
          <PhoneScreen>
            <ItalianFlag />
            <AcceptanceCard>
              <Checkmark>
                <CheckmarkIcon />
              </Checkmark>
              <AcceptedText>Accepted</AcceptedText>
              <PlaceholderLines>
                <PlaceholderLine width="80%" />
                <PlaceholderLine width="60%" />
                <PlaceholderLine width="90%" />
              </PlaceholderLines>
            </AcceptanceCard>
          </PhoneScreen>
        </Phone>
      </PhoneContainer>
      
      <Passport>
        <PassportText>PASSAPORTO</PassportText>
      </Passport>
    </IllustrationContainer>
  );
};

export default AdmissionIllustration;
