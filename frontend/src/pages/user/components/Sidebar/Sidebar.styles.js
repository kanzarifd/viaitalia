import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 80px;
  width: 280px;
  height: calc(100vh - 80px);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 0;
  overflow-y: auto;
  z-index: 999;
  transition: all 0.3s ease;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  
  @media (max-width: 1024px) {
    width: 240px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SidebarItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const SidebarButton = styled.button`
  width: 100%;
  background: ${props => props.isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent'};
  border: ${props => props.isActive ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent'};
  color: white;
  padding: 1rem 2rem;
  font-size: 0.95rem;
  font-weight: ${props => props.isActive ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    transform: translateX(${props => props.isActive ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    
    &::before {
      transform: translateX(0);
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 1024px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
`;

export const SidebarIcon = styled.span`
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    font-size: 1.1rem;
    width: 20px;
  }
`;

export const SidebarText = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SidebarBadge = styled.span`
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    font-size: 0.65rem;
    padding: 0.15rem 0.4rem;
    min-width: 18px;
  }
`;

export const SidebarSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SidebarSectionTitle = styled.div`
  padding: 0 2rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (max-width: 1024px) {
    padding: 0 1.5rem;
    font-size: 0.75rem;
  }
`;

export const SidebarDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 1.5rem 0;
  
  @media (max-width: 1024px) {
    margin: 1rem 0;
  }
`;

export const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.1);
  
  @media (max-width: 1024px) {
    padding: 1rem 1.5rem;
  }
`;

export const SidebarUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const SidebarUserAvatar = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
`;

export const SidebarUserDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SidebarUserName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 1024px) {
    font-size: 0.85rem;
  }
`;

export const SidebarUserEmail = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 1024px) {
    font-size: 0.7rem;
  }
`;

export const SidebarVersion = styled.div`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  margin-top: 0.5rem;
`;

export const SidebarCollapsed = styled(SidebarContainer)`
  width: 80px;
  
  ${SidebarButton} {
    justify-content: center;
    padding: 1rem;
  }
  
  ${SidebarText}, ${SidebarSectionTitle}, ${SidebarUserInfo}, ${SidebarFooter} {
    display: none;
  }
  
  ${SidebarIcon} {
    margin: 0;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;
