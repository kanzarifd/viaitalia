import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    height: 70px;
    padding: 0 1rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const Logo = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
`;

export const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NotificationContainer = styled.div`
  position: relative;
`;

export const NotificationButton = styled.button`
  position: relative;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 1.2rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.4rem;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.6rem;
    min-width: 18px;
    padding: 0.15rem 0.35rem;
  }
`;

export const NotificationDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 350px;
  max-height: 400px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  z-index: 1001;
  
  @media (max-width: 768px) {
    width: 300px;
    max-height: 350px;
    right: -50px;
  }
`;

export const NotificationHeader = styled.div`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(102, 126, 234, 0.1);
`;

export const NotificationTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const NotificationActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const NotificationAction = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }
`;

export const NotificationList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(102, 126, 234, 0.3);
    border-radius: 3px;
  }
`;

export const NotificationItem = styled.div`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  
  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  ${props => props.isUnread && `
    background: rgba(102, 126, 234, 0.05);
    border-left: 3px solid #667eea;
  `}
`;

export const NotificationIcon = styled.div`
  width: 36px;
  height: 36px;
  background: ${props => {
    if (props.type === 'success') return 'rgba(0, 176, 155, 0.1)';
    if (props.type === 'warning') return 'rgba(240, 147, 251, 0.1)';
    if (props.type === 'error') return 'rgba(255, 107, 107, 0.1)';
    return 'rgba(102, 126, 234, 0.1)';
  }};
  color: ${props => {
    if (props.type === 'success') return '#00b09b';
    if (props.type === 'warning') return '#f093fb';
    if (props.type === 'error') return '#ff6b6b';
    return '#667eea';
  }};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`;

export const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NotificationMessage = styled.div`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.25rem;
  line-height: 1.4;
  
  ${props => props.isUnread && `
    font-weight: 600;
  `}
`;

export const NotificationTime = styled.div`
  font-size: 0.75rem;
  color: #666;
`;

export const NotificationEmpty = styled.div`
  padding: 2rem 1.25rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
`;

export const NotificationLoading = styled.div`
  padding: 2rem 1.25rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

export const NotificationSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LogoutButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border: none;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.625rem 1rem;
    font-size: 0.8rem;
  }
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  
  @media (max-width: 768px) {
    display: none;
  }
`;
