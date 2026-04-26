import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { DashboardContainer, MainContent } from "./user/styles/DashboardContainer.styles";

// Import new components
import { Header } from "./user/components/Header";
import { Sidebar } from "./user/components/Sidebar";
import { BottomNav } from "./user/components/BottomNav";
import { ContentArea } from "./user/components/ContentArea";

// Import section components
import { AppointmentsSection } from "./user/components/sections/Appointments";
import { MessagingSection } from "./user/components/sections/Messaging";
import { UniversitySection } from "./user/components/sections/University";
import ContractSection from "./user/components/sections/Contract/ContractSection";
import DossierSection from "./user/components/sections/Dossier/DossierSection";
import ProfileSection from "./user/components/sections/Profile/ProfileSection";
import DashboardSection from "./user/components/sections/Dashboard/DashboardSection";

const UserDashboard = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: '🏠', text: 'Tableau de Bord' },
    { id: 'rendezvous', icon: '📅', text: 'Rendez-vous' },
    { id: 'messagerie', icon: '💬', text: 'Messagerie' },
    { id: 'profile', icon: '👤', text: 'Profil' },
    { id: 'parcours', icon: '📄', text: 'Contrat' },
    { id: 'dossier', icon: '📁', text: 'Dossier' },
    { id: 'annonces', icon: '📢', text: 'Annonces' }
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleLogout = () => {
    logoutUser();
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return (
          <ContentArea 
            title="Tableau de Bord"
            subtitle="Bienvenue sur votre espace personnel"
          >
            <DashboardSection />
          </ContentArea>
        );
      
      case 'rendezvous':
        return (
          <ContentArea 
            title="Prendre un Rendez-vous"
            subtitle="Gérez vos rendez-vous avec nos conseillers"
          >
            <AppointmentsSection />
          </ContentArea>
        );
      
      case 'messagerie':
        return (
            <MessagingSection />
        );
      
      case 'profile':
        return (
          <ContentArea 
           
          >
            <ProfileSection />
          </ContentArea>
        );
      
      case 'universite':
        return (
          <ContentArea 
            title="Informations Universitaires"
            subtitle="Sélectionnez votre université et spécialité"
          >
            <UniversitySection />
          </ContentArea>
        );
      
      case 'parcours':
        return <ContractSection />;
      
      case 'dossier':
        return (
          <ContentArea 
            title="Dossier"
            subtitle="Suivez l'évolution de votre dossier d'admission"
          >
            <DossierSection />
          </ContentArea>
        );
      
      case 'annonces':
        return (
          <ContentArea 
            title="Annonces"
            subtitle="Restez informé des dernières nouvelles"
          >
            <div className="text-white text-center py-12">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="text-xl font-semibold mb-2">Section Annonces</h3>
              <p className="text-gray-400">
                La section Annonces sera bientôt disponible avec les composants refactored.
              </p>
            </div>
          </ContentArea>
        );
      
      default:
        return (
          <ContentArea 
            title="Tableau de Bord"
            subtitle="Bienvenue sur votre espace personnel"
          >
            <div className="text-white text-center py-12">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Bienvenue!</h3>
              <p className="text-gray-400">
                Sélectionnez une section dans le menu pour commencer.
              </p>
            </div>
          </ContentArea>
        );
    }
  };

  return (
    <DashboardContainer>
      <Header onLogout={handleLogout} />
      <MainContent>
        <Sidebar 
          activeMenu={activeMenu}
          menuItems={menuItems}
          onMenuClick={handleMenuClick}
        />
        <ContentArea activeMenu={activeMenu}>
          {renderContent()}
        </ContentArea>
      </MainContent>
      <BottomNav 
        activeMenu={activeMenu}
        menuItems={menuItems}
        onMenuClick={handleMenuClick}
      />
    </DashboardContainer>
  );
};

export default UserDashboard;
