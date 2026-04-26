import styled from 'styled-components';

export const BottomNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 999;
  display: none;
  padding: 0.5rem 1rem;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  @media (max-width: 480px) {
    height: 70px;
    padding: 0.5rem;
  }
`;

export const BottomNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`;

export const BottomNavItem = styled.li`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottomNavButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.isActive ? '#667eea' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border-radius: 12px;
  min-width: 60px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%) scaleX(${props => props.isActive ? '1' : '0'});
    width: 20px;
    height: 3px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 480px) {
    min-width: 50px;
    gap: 0.2rem;
    padding: 0.4rem;
  }
`;

export const BottomNavIcon = styled.span`
  font-size: 1.4rem;
  line-height: 1;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const BottomNavText = styled.span`
  font-size: 0.7rem;
  font-weight: ${props => props.isActive ? '600' : '500'};
  line-height: 1;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

export const BottomNavBadge = styled.span`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.15rem 0.35rem;
  border-radius: 8px;
  min-width: 16px;
  text-align: center;
  line-height: 1;
  
  @media (max-width: 480px) {
    font-size: 0.55rem;
    min-width: 14px;
    padding: 0.1rem 0.3rem;
  }
`;

export const BottomNavDivider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  
  @media (max-width: 480px) {
    height: 35px;
  }
`;

export const BottomNavCenterItem = styled(BottomNavItem)`
  max-width: 80px;
`;

export const BottomNavCenterButton = styled(BottomNavButton)`
  background: ${props => props.isActive ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: ${props => props.isActive ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)'};
  min-height: 60px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 480px) {
    min-height: 50px;
  }
`;

export const BottomNavCenterIcon = styled(BottomNavIcon)`
  font-size: 1.6rem;
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const BottomNavHidden = styled(BottomNavContainer)`
  transform: translateY(100%);
  transition: transform 0.3s ease;
`;

export const BottomNavVisible = styled(BottomNavContainer)`
  transform: translateY(0);
  transition: transform 0.3s ease;
`;
