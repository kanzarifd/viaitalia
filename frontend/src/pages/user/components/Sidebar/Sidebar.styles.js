import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  position: fixed;
  left: 10px;
  top: 110px;
  width: 280px;
  height: calc(100vh - 120px);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 1.5rem;
  overflow-y: auto;
  z-index: 999;
  transition: all 0.3s ease;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  
  @media (max-width: 1024px) {
    width: 240px;
    padding: 1.25rem;
    border-radius: 16px;
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
  background: ${props => props.isActive ? 'rgba(96, 165, 250, 0.2)' : 'transparent'};
  border: ${props => props.isActive ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid transparent'};
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.875rem 1.25rem;
  font-size: 0.9rem;
  font-weight: ${props => props.isActive ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  text-align: left;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 1024px) {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    gap: 0.75rem;
    border-radius: 10px;
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
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  min-width: 20px;
  text-align: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  
  @media (max-width: 1024px) {
    font-size: 0.65rem;
    padding: 0.2rem 0.4rem;
    min-width: 18px;
    border-radius: 6px;
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
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
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
