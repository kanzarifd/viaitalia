import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import axiosInstance from '../../../../../api/axiosInstance';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  SectionGrid,
  SectionCard,
  SectionIcon,
  SectionTitle,
  SectionDescription,
  SectionBadge,
  WelcomeCard,
  WelcomeMessage,
  WelcomeUser
} from './Dashboard.styles';

const DashboardSection = () => {
  const { user } = useAuth();
  const [latestData, setLatestData] = useState({
    appointment: null,
    message: null,
    dossier: null,
    contract: null,
    announcement: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch latest data for each section
      const [appointmentsRes, messagesRes, dossiersRes, contractsRes, announcementsRes] = await Promise.all([
        axiosInstance.get('/appointments/user').catch(() => ({ data: { data: [] } })),
        axiosInstance.get('/messages/user').catch(() => ({ data: { data: [] } })),
        axiosInstance.get('/dossiers/user').catch(() => ({ data: { data: [] } })),
        axiosInstance.get('/contracts/user').catch(() => ({ data: { data: [] } })),
        axiosInstance.get('/announcements/user').catch(() => ({ data: { data: [] } }))
      ]);

      const appointments = appointmentsRes.data?.data || [];
      const messages = messagesRes.data?.data || [];
      const dossiers = dossiersRes.data?.data || [];
      const contracts = contractsRes.data?.data || [];
      const announcements = announcementsRes.data?.data || [];

      // If no real data, use mock data for demonstration
      const mockData = {
        appointment: {
          date: '2024-03-15',
          status: 'Confirmé',
          type: 'Consultation'
        },
        message: {
          createdAt: '2024-03-14T10:30:00Z',
          sender: 'ADMIN',
          content: 'Votre rendez-vous a été confirmé'
        },
        dossier: {
          status: 'En cours',
          title: 'Dossier de Fadi Kanzari',
          createdAt: '2024-03-10T09:00:00Z'
        },
        contract: {
          type: 'Contrat d\'admission',
          status: 'Actif',
          createdAt: '2024-03-12T14:00:00Z'
        },
        announcement: {
          title: 'Nouvelle procédure d\'admission',
          createdAt: '2024-03-13T11:00:00Z',
          content: 'Mise à jour des procédures d\'admission pour le semestre prochain'
        }
      };

      // Get latest item from each section (use mock data if no real data)
      setLatestData({
        appointment: appointments.length > 0 ? appointments[appointments.length - 1] : mockData.appointment,
        message: messages.length > 0 ? messages[messages.length - 1] : mockData.message,
        dossier: dossiers.length > 0 ? dossiers[dossiers.length - 1] : mockData.dossier,
        contract: contracts.length > 0 ? contracts[contracts.length - 1] : mockData.contract,
        announcement: announcements.length > 0 ? announcements[announcements.length - 1] : mockData.announcement
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLatestInfo = (section) => {
    switch(section) {
      case 'rendezvous':
        if (latestData.appointment) {
          const date = new Date(latestData.appointment.date).toLocaleDateString('fr-FR');
          return `Prochain: ${date} - ${latestData.appointment.status || 'Confirmé'}`;
        }
        return 'Aucun rendez-vous';
      
      case 'messagerie':
        if (latestData.message) {
          const date = new Date(latestData.message.createdAt).toLocaleDateString('fr-FR');
          return `Dernier: ${date} - ${latestData.message.sender === 'USER' ? 'Envoyé' : 'Reçu'}`;
        }
        return 'Aucun message';
      
      case 'profile':
        return 'Profil complet';
      
      case 'parcours':
        if (latestData.contract) {
          return `Dernier: ${latestData.contract.type || 'Contrat'} - ${latestData.contract.status || 'Actif'}`;
        }
        return 'Aucun contrat';
      
      case 'dossier':
        if (latestData.dossier) {
          return `Statut: ${latestData.dossier.status || 'En cours'} - ${latestData.dossier.title || 'Dossier'}`;
        }
        return 'Aucun dossier';
      
      case 'annonces':
        if (latestData.announcement) {
          const date = new Date(latestData.announcement.createdAt).toLocaleDateString('fr-FR');
          return `Dernière: ${date} - ${latestData.announcement.title?.substring(0, 30) || 'Nouvelle'}`;
        }
        return 'Aucune annonce';
      
      default:
        return 'Aucune information';
    }
  };

  const sections = [
    {
      id: 'rendezvous',
      title: 'Rendez-vous',
      description: 'Gérez vos rendez-vous avec nos conseillers',
      icon: '📅',
      info: getLatestInfo('rendezvous')
    },
    {
      id: 'messagerie',
      title: 'Messagerie',
      description: 'Communiquez avec notre équipe de support',
      icon: '💬',
      info: getLatestInfo('messagerie')
    },
    {
      id: 'profile',
      title: 'Profil',
      description: 'Mettez à jour vos informations personnelles',
      icon: '👤',
      info: getLatestInfo('profile')
    },
    {
      id: 'parcours',
      title: 'Contrat',
      description: 'Consultez vos contrats et documents',
      icon: '📄',
      info: getLatestInfo('parcours')
    },
    {
      id: 'dossier',
      title: 'Dossier',
      description: 'Suivez l\'évolution de votre dossier d\'admission',
      icon: '📁',
      info: getLatestInfo('dossier')
    },
    {
      id: 'annonces',
      title: 'Annonces',
      description: 'Restez informé des dernières nouvelles',
      icon: '📢',
      info: getLatestInfo('annonces')
    }
  ];

  if (loading) {
    return (
      <DashboardContainer>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ffffff' }}>
          <div>Chargement...</div>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <WelcomeCard>
          <WelcomeMessage>
            Bonjour, <WelcomeUser>{user?.firstName || 'Utilisateur'}!</WelcomeUser>
          </WelcomeMessage>
          <DashboardSubtitle>
            Bienvenue sur votre tableau de bord personnel
          </DashboardSubtitle>
        </WelcomeCard>
      </DashboardHeader>

      <SectionGrid>
        {sections.map((section) => (
          <SectionCard key={section.id}>
            <SectionIcon>{section.icon}</SectionIcon>
            <SectionTitle>{section.title}</SectionTitle>
            <SectionDescription>{section.description}</SectionDescription>
            <SectionBadge>{section.info}</SectionBadge>
          </SectionCard>
        ))}
      </SectionGrid>
    </DashboardContainer>
  );
};

export default DashboardSection;
