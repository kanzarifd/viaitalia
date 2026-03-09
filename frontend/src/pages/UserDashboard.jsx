import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { gsap } from "gsap";
import axiosInstance from "../api/axiosInstance";
import appointmentService from "../api/appointmentService";
import universityInfoService from "../api/universityInfoService";
import messageService from "../api/messageService";
import contractService from "../api/contractService";
import announcementService from "../api/announcementService";
import notificationService from "../api/notificationService";
import AnnouncementCard from "../components/AnnouncementCard";
import styled from "styled-components";

// Register GSAP
gsap.registerPlugin();

// Logo SVG
const logoSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'%3E%3Ctext x='10' y='50' font-family='Arial, sans-serif' font-size='24' font-weight='bold' fill='white'%3EVia Italia%3C/text%3E%3C/svg%3E";

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #0a0b10 0%, #1a1f2e 100%);
  display: flex;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
  }
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: var(--nav);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  color: var(--white);

  @media (max-width: 768px) {
    display: none !important;
    width: 0;
    padding: 0;
    border: none;
    position: absolute;
    left: -100%;
    visibility: hidden;
  }
`;
const BottomNav = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }

  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  height: 65px;

  background: rgba(28, 28, 35, 0.85);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);

  justify-content: space-around;
  align-items: center;
  z-index: 1000;
`;
const BottomNavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;

  color: rgba(255, 255, 255, 0.55);
  transition: color 0.3s ease;

  .icon {
    font-size: 1.3rem;
  }

  &.active {
    color: var(--green);
  }
`;



const SidebarItem = styled.div`
  padding: 1rem 2rem;
  margin: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;

  &:hover {
    background: rgba(0, 255, 51, 0.1);
    color: var(--green);
    transform: translateX(5px);
  }

  &.active {
    background: linear-gradient(90deg, rgba(0, 255, 51, 0.2), rgba(239, 68, 68, 0.1));
    color: var(--green);
    border-left: 3px solid var(--green);
  }

  .icon {
    font-size: 1.2rem;
  }

  .text {
    font-size: 0.95rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5; 

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: space-between;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    order: 1;
  }
`;

const HeaderCenter = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    display: flex;
    order: 2;
  }
`;

const AgencyLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--green), var(--red));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    order: 3;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 4rem;
  height: auto;
  cursor: pointer;
  
  img {
    height: 80px;
    width: 200px;
  }
  
  @media (max-width: 768px) {
    width: 12rem;
    height: auto;
    
    img {
      height: 110px;
      width: 200px;
    }
  }
`;

const NotificationButton = styled.button`
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--white);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 255, 51, 0.2);
    border-color: var(--green);
    transform: scale(1.1);
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: var(--red);
    color: var(--white);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 0.7rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const LogoutButton = styled.button`
  background-color: var(--green);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
  @media only Screen and (max-width: 40em) {
    font-size: 1.2rem;
    &:hover {
      transform: none;
    }
    &:focus {
      transform: none;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  @media only Screen and (max-width: 48em) {
    display: inline-block;
  }
  position: relative;
  background-color: transparent;
  width: 2rem;
  height: 2px;
  margin-top: 0rem;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
  color: var(--white);
  
  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    width: 2rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    cursor: pointer;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;



const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: linear-gradient(135deg, 
    rgba(239, 68, 68, 0.05) 20%, 
    rgba(0, 255, 51, 0.02) 100%);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  @media (max-width: 48em) {
    width: 100%;
  }
`;

const ContentCard = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(239, 68, 68, 0.12) 50%,
    rgba(0, 255, 51, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(40px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(0) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(0, 255, 51, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 48em) {
    width: 100%;
    padding: 1rem;
  }
`;

const UserDashboard = () => {
  // Helper functions for announcement cards
  const getTypeColor = (type) => {
    switch(type) {
      case 'INFO':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'SUCCESS':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'WARNING':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      case 'URGENT':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getTypeTextColor = (type) => {
    switch(type) {
      case 'INFO':
        return 'text-blue-600';
      case 'SUCCESS':
        return 'text-green-600';
      case 'WARNING':
        return 'text-yellow-600';
      case 'URGENT':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'INFO':
        return '📢';
      case 'SUCCESS':
        return '✅';
      case 'WARNING':
        return '⚠️';
      case 'URGENT':
        return '🔴';
      default:
        return '📢';
    }
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 24)) / (1000 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60)) / 1000);

    if (diffDays > 0) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else if (diffMinutes > 0) {
      return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return 'À l\'instant';
    }
  };

  useEffect(() => {
  if (window.innerWidth < 768) {
    const sidebar = document.querySelector(".MuiDrawer-root, .sidebar, .sider");
    if (sidebar) {
      sidebar.style.display = "none";
    }
  }
}, []);
  const navRef = useRef([]);
navRef.current = [];
const addToRefs = (el) => {
  if (el && !navRef.current.includes(el)) {
    navRef.current.push(el);
  }
};
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [appointments, setAppointments] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeMenu, setActiveMenu] = useState('rendezvous');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    type: '',
    date: '',
    time: '',
    status: 'PENDING',
    etat: 'PRESENTIEL',
    notes: ''
  });
  const [universityInfo, setUniversityInfo] = useState({
    university: '',
    specialty: '',
    level: ''
  });
  const [savedUniversityInfo, setSavedUniversityInfo] = useState(null);
  const [isUniversityConfirmed, setIsUniversityConfirmed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Messaging state
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Contract state
  const [contractFile, setContractFile] = useState(null);
  const [contractStatus, setContractStatus] = useState('PENDING'); // PENDING, UPLOADED, CONFIRMED, REJECTED
  const [isUploadingContract, setIsUploadingContract] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedContract, setUploadedContract] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success'); // success, error, info

  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const notificationDropdownRef = useRef(null);

  // Announcements state
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);

  const sidebarRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  // Load appointments from backend on component mount
  useEffect(() => {
    console.log('=== NOTIFICATION DEBUG ===');
    console.log('User from context:', user);
    console.log('User ID:', user?.id);
    console.log('Token from localStorage:', localStorage.getItem('token'));
    
    fetchAppointments();
    fetchAnnouncements();
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  // Periodic notification refresh (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Notification functions
  const fetchNotifications = async () => {
    try {
      console.log('Fetching notifications...');
      const response = await notificationService.getAllNotifications();
      console.log('Notifications response:', response);
      if (response.success) {
        setNotifications(response.data || []);
        console.log('Notifications set:', response.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      console.log('Fetching unread count...');
      const response = await notificationService.getUnreadCount();
      console.log('Unread count response:', response);
      if (response.success) {
        setUnreadCount(response.data || 0);
        console.log('Unread count set:', response.data);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
      setUnreadCount(0);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      console.log('Marking all notifications as read...');
      setUnreadCount(0);
      fetchNotifications(); // Refresh notifications list
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  // Notification dropdown handlers
  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    
    if (!showNotificationDropdown) {
      // Animate dropdown opening
      gsap.fromTo(notificationDropdownRef.current, {
        opacity: 0,
        scale: 0.8,
        transformOrigin: "top right"
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setShowNotificationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAppointments = async () => {
    try {
      if (!user || !user.id) {
        console.log('No user logged in, cannot fetch appointments');
        setAppointments([]);
        return;
      }
      
      const response = await appointmentService.getAppointmentsByUserId(user.id);
      setAppointments(response.data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    }
  };

  // Fetch announcements from backend
  const fetchAnnouncements = async () => {
    try {
      setLoadingAnnouncements(true);
      const response = await announcementService.getActiveAnnouncements();
      setAnnouncements(response.data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setAnnouncements([]);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== BOOKING SUBMIT DEBUG ===');
    console.log('Form data:', newAppointment);
    console.log('User ID:', user?.id);
    
    // Check if appointment already exists for this date
    const existingAppointment = appointments.find(apt => {
      const aptDate = new Date(apt.date).toISOString().split('T')[0];
      const newDate = new Date(newAppointment.date).toISOString().split('T')[0];
      return aptDate === newDate && apt.status !== 'CANCELLED';
    });
    
    console.log('Checking duplicate:', {
      existingAppointments: appointments.map(a => ({ date: a.date, status: a.status })),
      newDate: newAppointment.date,
      found: existingAppointment
    });
    
    if (existingAppointment) {
      // GSAP animation for error
      gsap.fromTo('.booking-form', {
        x: 0,
        backgroundColor: 'rgba(239, 68, 68, 0.1)'
      }, {
        x: [0, -10, 10, -10, 10, 0],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        duration: 0.5,
        ease: "power2.inOut"
      });
      
      // Show professional error notification
      const errorText = 'Vous avez déjà un rendez-vous prévu pour cette date!';
      document.querySelector('.error-text').textContent = errorText;
      
      gsap.fromTo('.error-message', {
        scale: 0,
        opacity: 0,
        rotation: 180,
        x: 100
      }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        x: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        onComplete: () => {
          gsap.to('.error-message', {
            scale: 0,
            opacity: 0,
            x: 100,
            duration: 0.3,
            delay: 3,
            ease: "power2.in"
          });
        }
      });
      
      return;
    }
    
    setIsCreatingAppointment(true);
    
    try {
      if (!user || !user.id) {
        console.log('No user logged in, cannot create appointment');
        const errorText = 'Vous devez être connecté pour créer un rendez-vous';
        document.querySelector('.error-text').textContent = errorText;
        
        gsap.fromTo('.error-message', {
          scale: 0,
          opacity: 0,
          rotation: 180,
          x: 100
        }, {
          scale: 1,
          opacity: 1,
          rotation: 0,
          x: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to('.error-message', {
              scale: 0,
              opacity: 0,
              x: 100,
              duration: 0.3,
              delay: 3,
              ease: "power2.in"
            });
          }
        });
        return;
      }
      
      console.log('Current user from context:', user);
      console.log('User ID being used:', user.id);
      
      const appointmentData = {
        ...newAppointment,
        userId: user.id, // Use actual user ID, no fallback
        date: new Date(`${newAppointment.date}T${newAppointment.time || '09:00'}`),
        status: 'PENDING',
        etat: 'PRESENTIEL'
      };
      
      console.log('Sending appointment data:', appointmentData);
      
      const response = await appointmentService.createAppointment(appointmentData);
      
      console.log('API Response:', response);
      
      if (response && response.data) {
        console.log('Appointment created successfully');
        
        // GSAP success animation - professional version
        gsap.fromTo('.success-message', {
          scale: 0,
          opacity: 0,
          rotation: -180,
          x: -100
        }, {
          scale: 1,
          opacity: 1,
          rotation: 0,
          x: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to('.success-message', {
              scale: 0,
              opacity: 0,
              x: -100,
              duration: 0.3,
              delay: 2,
              ease: "power2.in"
            });
          }
        });
        
        setAppointments([...appointments, response.data]);
        setNewAppointment({ type: '', date: '', time: '', status: 'PENDING', etat: 'PRESENTIEL', notes: '' });
        setShowBookingForm(false);
      } else {
        console.error('No data in response');
        
        // Show error for no data
        const errorText = 'Erreur: Aucune donnée reçue du serveur';
        document.querySelector('.error-text').textContent = errorText;
        
        gsap.fromTo('.error-message', {
          scale: 0,
          opacity: 0,
          rotation: 180,
          x: 100
        }, {
          scale: 1,
          opacity: 1,
          rotation: 0,
          x: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to('.error-message', {
              scale: 0,
              opacity: 0,
              x: 100,
              duration: 0.3,
              delay: 3,
              ease: "power2.in"
            });
          }
        });
      }
    } catch (error) {
      console.error('=== BOOKING ERROR ===');
      console.error('Error object:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      
      // GSAP error animation
      gsap.fromTo('.booking-form', {
        x: 0,
        backgroundColor: 'rgba(239, 68, 68, 0.1)'
      }, {
        x: [0, -10, 10, -10, 10, 0],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        duration: 0.5,
        ease: "power2.inOut"
      });
      
      // Show professional error notification
      const errorText = 'Erreur lors de la création du rendez-vous: ' + (error.response?.data?.message || error.message);
      document.querySelector('.error-text').textContent = errorText;
      
      gsap.fromTo('.error-message', {
        scale: 0,
        opacity: 0,
        rotation: 180,
        x: 100
      }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        x: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        onComplete: () => {
          gsap.to('.error-message', {
            scale: 0,
            opacity: 0,
            x: 100,
            duration: 0.3,
            delay: 3,
            ease: "power2.in"
          });
        }
      });
    } finally {
      setIsCreatingAppointment(false);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      console.log('Updating appointment:', { id, status });
      const response = await appointmentService.updateAppointmentStatus(id, status);
      
      console.log('Update response:', response);
      setAppointments(appointments.map(apt => 
        apt.id === id ? response.data : apt
      ));
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Erreur lors de la mise à jour du rendez-vous: ' + (error.response?.data?.message || error.message));
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await appointmentService.deleteAppointment(id);
      setAppointments(appointments.filter(apt => apt.id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  // GSAP Animations
  useEffect(() => {
    // Animate sidebar (desktop)
    gsap.fromTo(sidebarRef.current, {
      x: -100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });

    // Animate header
    gsap.fromTo(headerRef.current, {
      y: -50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.4
    });

    // Animate content cards
    gsap.fromTo('.content-card', {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
      delay: 0.6
    });

    // Animate form elements
    gsap.fromTo('.booking-form input', {
      y: 30,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.1,
      delay: 0.8
    });

    // Animate select dropdown
    gsap.fromTo('.booking-form select', {
      y: 30,
      opacity: 0,
      scale: 0.8,
      rotation: -5
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 1.0
    });

    // Animate select options
    gsap.fromTo('.booking-form option', {
      y: 15,
      opacity: 0,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.7)",
      stagger: 0.05,
      delay: 1.2
    });

    // Animate textarea
    gsap.fromTo('.booking-form textarea', {
      y: 30,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 1.1
    });

    // Animate submit button
    gsap.fromTo('.booking-form button', {
      y: 30,
      opacity: 0,
      scale: 0.7,
      rotation: -3
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 1.3
    });

    // Mobile sidebar animation
    if (window.innerWidth <= 768) {
      if (sidebarOpen) {
        gsap.to(sidebarRef.current, {
          x: 0,
          duration: 0.4,
          ease: "power3.out"
        });
      } else {
        gsap.to(sidebarRef.current, {
          x: "-100%",
          duration: 0.4,
          ease: "power3.in"
        });
      }
    }

    // Dynamic background animation - combine red and green
    const contentArea = contentRef.current;
    if (contentArea) {
      // Create animated gradient background
      gsap.to(contentArea, {
        background: 'linear-gradient(135deg, rgba(0, 255, 51, 0.1) 0%, rgba(239, 68, 68, 0.1) 50%, rgba(0, 255, 51, 0.05) 100%)',
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      // Add professional background effects
      gsap.to(contentArea, {
        background: 'linear-gradient(135deg, rgba(0, 255, 51, 0.15) 0%, rgba(239, 68, 68, 0.1) 50%, rgba(0, 255, 51, 0.05) 100%)',
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      // Add subtle floating particles effect
      const particles = [];
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 2}px;
          height: ${Math.random() * 4 + 2}px;
          background: ${Math.random() > 0.5 ? 'rgba(0, 255, 51, 0.6)' : 'rgba(239, 68, 68, 0.6)'};
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        `;
        contentArea.appendChild(particle);
        particles.push(particle);

        // Animate each particle
        gsap.to(particle, {
          x: `+=${Math.random() * 200 - 100}px`,
          y: `+=${Math.random() * 200 - 100}px`,
          scale: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 10 + 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2
        });
      }
    }
  }, [sidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value
    });
  };

  const handleUniversityInputChange = (e) => {
    if (isUniversityConfirmed) return; // Prevent changes if confirmed
    setUniversityInfo({
      ...universityInfo,
      [e.target.name]: e.target.value
    });
  };

// Load appointments and university info from backend on component mount
useEffect(() => {
  fetchAppointments();
  fetchUniversityInfo();
  fetchMessages();
  fetchContractStatus();
}, []);

const fetchUniversityInfo = async () => {
  try {
    if (!user || !user.id) {
      console.log('No user logged in, cannot fetch university info');
      return;
    }
    
    const response = await universityInfoService.getUniversityInfoByUserId(user.id);
    if (response.success && response.data && response.data.length > 0) {
      // Load the most recent university info
      setSavedUniversityInfo(response.data[0]);
      setUniversityInfo({
        university: response.data[0].university,
        specialty: response.data[0].specialty,
        level: response.data[0].level
      });
      setIsUniversityConfirmed(true);
    }
  } catch (error) {
    console.error('Error fetching university info:', error);
  }
};

const handleSaveUniversityInfo = async () => {
    if (!universityInfo.university || !universityInfo.specialty || !universityInfo.level) {
      // Show error message
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSaving(true);
    
    try {
      let response;
      
      if (savedUniversityInfo) {
        // Update existing university info
        response = await universityInfoService.updateUniversityInfo(savedUniversityInfo.id, {
          university: universityInfo.university,
          specialty: universityInfo.specialty,
          level: universityInfo.level
        });
      } else {
        // Create new university info
        response = await universityInfoService.createUniversityInfo({
          university: universityInfo.university,
          specialty: universityInfo.specialty,
          level: universityInfo.level,
          userId: user.id
        });
      }

      if (response.success) {
        // Update saved info state
        const updatedInfo = savedUniversityInfo 
          ? { ...savedUniversityInfo, ...response.data }
          : { ...response.data, userId: user.id };
        
        setSavedUniversityInfo(updatedInfo);
        setIsUniversityConfirmed(true);
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error('Error saving university info:', error);
      alert('Erreur lors de la sauvegarde des informations universitaires');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetUniversityInfo = () => {
    setUniversityInfo({
      university: '',
      specialty: '',
      level: ''
    });
    setIsUniversityConfirmed(false);
    setShowConfirmation(false);
  };

  const handleConfirmSave = async () => {
    setShowConfirmation(false);
  };

  // Contract functions
  const fetchContractStatus = async () => {
    try {
      if (!user || !user.id) {
        console.log('No user logged in, cannot fetch contract status');
        return;
      }
      
      const response = await contractService.getContractByUserId(user.id);
      if (response.success && response.data) {
        setContractStatus(response.data.status);
        setUploadedContract(response.data);
      }
    } catch (error) {
      console.error('Error fetching contract status:', error);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setNotificationVisible(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  };

  const handleContractFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setContractFile(file);
    } else {
      showNotification('Veuillez sélectionner un fichier PDF', 'error');
      return;
    }
  };

  const handleContractUpload = async () => {
    if (!contractFile) {
      showNotification('Veuillez sélectionner un fichier PDF', 'error');
      return;
    }

    setIsUploadingContract(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('contract', contractFile);

      const response = await contractService.uploadContract(formData);
      
      if (response.success) {
        setContractStatus('UPLOADED');
        setUploadedContract(response.data);
        setContractFile(null);
        
        // Reset file input
        document.getElementById('contract-file-input').value = '';
        
        showNotification('Contrat téléversé avec succès!', 'success');
      }
    } catch (error) {
      console.error('Error uploading contract:', error);
      
      // Handle specific error for existing contract
      if (error.response?.status === 400 && 
          error.response?.data?.message?.includes('déjà téléversé')) {
        showNotification('Vous avez déjà téléversé un contrat', 'info');
      } else {
        showNotification('Erreur lors du téléversement du contrat', 'error');
      }
    } finally {
      setIsUploadingContract(false);
      setUploadProgress(0);
    }
  };

  const triggerContractConfirmationCelebration = () => {
    // Create celebration animation
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.zIndex = '9999';
    container.style.fontSize = '4rem';
    container.innerHTML = '🎉';
    document.body.appendChild(container);

    gsap.fromTo(container, {
      scale: 0,
      rotation: -180,
      opacity: 0
    }, {
      scale: 3,
      rotation: 360,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.to(container, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          delay: 2,
          onComplete: () => {
            document.body.removeChild(container);
          }
        });
      }
    });
  };

  // Messaging functions
  const fetchMessages = async () => {
    try {
      if (!user || !user.id) {
        console.log('No user logged in, cannot fetch messages');
        return;
      }
      
      const response = await messageService.getMessagesByUserId(user.id);
      if (response.success && response.data) {
        // Sort messages by createdAt (oldest first for proper chat flow)
        const sortedMessages = response.data.sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        );
        setMessages(sortedMessages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsSendingMessage(true);
    
    try {
      const response = await messageService.createMessage({
        content: newMessage.trim(),
        sender: 'USER',
        userId: user.id
      });

      if (response.success && response.data) {
        // Add the new message to the messages list
        setMessages(prev => [...prev, response.data]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Erreur lors de l\'envoi du message');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const menuItems = [
       { id: 'rendezvous', icon: '📅', text: 'Rendez-vous' },
    { id: 'universite', icon: '🏫', text: 'Université' },
    { id: 'messagerie', icon: '💬', text: 'Messagerie' },
    { id: 'parcours', icon: '📄', text: 'Contrat' },
    { id: 'dossier', icon: '📁', text: 'Dossier' },

  ];

  const renderContent = () => {
    switch(activeMenu) {
      case 'rendezvous':
        // ... (rest of the code remains the same)
        return (
          <ContentCard className="content-card">
            <h2 className="text-2xl font-bold text-white mb-6">
              Prendre un Rendez-vous
            </h2>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                Nouveau Rendez-vous ({appointments.length})
              </h3>
              <button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {showBookingForm ? 'Annuler' : 'Ajouter'}
              </button>
            </div>

            {showBookingForm && (
              <>
                <div className="success-message fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center opacity-0 scale-0">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2m0 0l2-2m-2 2l-2-2" />
                  </svg>
                  <span className="success-text">Rendez-vous créé avec succès!</span>
                </div>
                <div className="error-message fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center opacity-0 scale-0">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="error-text">Erreur lors de la création</span>
                </div>
                <form onSubmit={handleBookingSubmit} className="booking-form space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={newAppointment.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Heure
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={newAppointment.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label >
                      Service
                    </label>
                    <select
                      name="type"
                      value={newAppointment.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                    >
                      <option value="">Sélectionnez un service</option>
                      <option value="consultation">Consultation d'admission</option>
                      <option value="documents">Aide aux documents</option>
                      <option value="visa">Assistance visa</option>
                      <option value="logement">Recherche logement</option>
                      <option value="orientation">Orientation académique</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mode de rendez-vous
                    </label>
                    <select
                      name="etat"
                      value={newAppointment.etat}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                    >
                      <option value="PRESENTIEL">Présentiel</option>
                      <option value="EN_LIGNE">En ligne</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Notes (optionnel)
                    </label>
                    <textarea
                      name="notes"
                      value={newAppointment.notes}
                      onChange={handleInputChange}
                      rows="3"
                      cols="30"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                      placeholder="Ajoutez des notes supplémentaires..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isCreatingAppointment}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isCreatingAppointment ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Création en cours...
                      </>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2m0 0l2-2m-2 2l-2-2" />
                        </svg>
                        Confirmer le Rendez-vous
                      </span>
                    )}
                  </button>
                </form>
              </>
            )}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Mes Rendez-vous
              </h3>
              
              {appointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">
                    Vous n'avez pas encore de rendez-vous.
                  </p>
                </div>
              ) : (
                appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white/10 border border-white/20 rounded-lg p-4 hover:bg-white/15 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'CONFIRMED' 
                              ? 'bg-green-500/20 text-green-400'
                              : appointment.status === 'CANCELLED'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {appointment.status === 'CONFIRMED' ? 'Confirmé' : 
                             appointment.status === 'CANCELLED' ? 'Annulé' : 'En attente'}
                          </span>
                        </div>
                        
                        <h4 className="font-semibold text-white mb-1">
                          {appointment.type}
                        </h4>
                        
                        <div className="text-gray-300 space-y-1">
                          <p>📅 {new Date(appointment.date).toLocaleDateString('fr-FR')}</p>
                          <p>🕐 {new Date(appointment.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                          <p>📍 {appointment.etat === 'PRESENTIEL' ? 'Présentiel' : 'En ligne'}</p>
                          {appointment.notes && (
                            <p className="text-sm italic mt-2">
                              📝 {appointment.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {appointment.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'CANCELLED')}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              Annuler
                            </button>
                          </>
                        )}
                        {appointment.status === 'CONFIRMED' && (
                          <span className="text-green-400 text-sm font-medium">
                            Confirmé
                          </span>
                        )}
                        {appointment.status === 'CANCELLED' && (
                          <span className="text-red-400 text-sm font-medium">
                            Annulé
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ContentCard>
        );
      
      case 'messagerie':
        return (
          <ContentCard className="content-card">
            <h2 className="text-2xl font-bold text-white mb-6">
              Messagerie
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 h-[500px] flex flex-col">
                  {/* Messages Container */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">
                          💬 Aucun message pour le moment
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          Envoyez votre premier message pour commencer la conversation
                        </p>
                      </div>
                    ) : (
                      messages.map((message, index) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'USER' ? 'justify-end' : 'justify-start'} message-item`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                              message.sender === 'USER'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-600 text-white'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'USER' ? 'text-green-200' : 'text-gray-300'
                            }`}>
                              {new Date(message.createdAt).toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className="border-t border-gray-700/50 p-4 message-input-container">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Tapez votre message..."
                        className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
                        disabled={isSendingMessage}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={isSendingMessage || !newMessage.trim()}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        {isSendingMessage ? (
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-blue-900/30 rounded-xl border border-blue-700/50 p-6 contact-info-card">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contactez-nous
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-white font-medium">Email</p>
                        <p className="text-gray-300 text-sm">contact@viaitalia.fr</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="text-white font-medium">Téléphone</p>
                        <p className="text-gray-300 text-sm">+33 1 23 45 67 89</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-white font-medium">Heures d'ouverture</p>
                        <p className="text-gray-300 text-sm">Lun-Ven: 9h-18h</p>
                        <p className="text-gray-300 text-sm">Sam: 10h-16h</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-800/30 rounded-lg border border-blue-600/50">
                    <p className="text-blue-200 text-sm">
                      <strong>Temps de réponse moyen:</strong> 2-4 heures pendant les heures d'ouverture
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ContentCard>
        );
      
      case 'parcours':
        return (
          <ContentCard className="content-card">
            <h2 className="text-2xl font-bold text-white mb-6">
              📄 Contrat
            </h2>
            
            {/* Notification Component */}
            {notificationVisible && (
              <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center ${
                notificationType === 'success' ? 'bg-green-500' :
                notificationType === 'error' ? 'bg-red-500' :
                'bg-blue-500'
              } text-white`}>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {notificationType === 'success' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2m0 0l2-2m-2 2l-2-2" />
                  ) : notificationType === 'error' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                <span>{notificationMessage}</span>
              </div>
            )}
            
            {/* Contract Status Display */}
         

            {/* PDF Viewing Section */}
            <div className="mb-8">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  📄 Voir et Télécharger le Contrat
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm">
                    Vous pouvez consulter votre contrat modèle ci-dessous et le télécharger pour le signer.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => window.open('/contrat.pdf', '_blank')}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Voir le Contrat
                    </button>
                    
                    <a
                      href="/contrat.pdf"
                      download="contrat.pdf"
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                    >
                      <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Télécharger le Contrat
                    </a>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <p className="text-gray-400 text-xs">
                      <strong>Note:</strong> Le contrat doit être téléversé au format PDF après avoir été signé.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Section - Show only when status is PENDING */}
            {contractStatus === 'PENDING' && (
              <div className="space-y-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    📋 Instructions
                  </h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Téléversez votre contrat signé au format PDF</li>
                    <li>• Taille maximale: 10MB</li>
                    <li>• Assurez-vous que le document est clair et lisible</li>
                    <li>• Une fois téléversé, le contrat sera vérifié par l'administration</li>
                  </ul>
                </div>

                <div className="border-2 border-dashed border-gray-500 rounded-lg p-8 text-center">
                  <div className="mb-4">
                    <span className="text-4xl">📁</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Téléverser le Contrat Signé
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Glissez-déposez votre fichier PDF ici ou cliquez pour sélectionner
                  </p>
                  
                  <input
                    id="contract-file-input"
                    type="file"
                    accept=".pdf"
                    onChange={handleContractFileChange}
                    className="hidden"
                  />
                  
                  <label
                    htmlFor="contract-file-input"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105"
                  >
                    Sélectionner un fichier
                  </label>
                  
                  {contractFile && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm">
                        ✅ Fichier sélectionné: {contractFile.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Taille: {(contractFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>

                {contractFile && (
                  <button
                    onClick={handleContractUpload}
                    disabled={isUploadingContract}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isUploadingContract ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Téléversement en cours...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Téléverser le Contrat
                      </>
                    )}
                  </button>
                )}

                {uploadProgress > 0 && (
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}

            {/* Status-specific messages - Show when user already has contract */}
            {(contractStatus === 'UPLOADED' || contractStatus === 'CONFIRMED' || contractStatus === 'REJECTED') && (
              <div className="space-y-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    📋 Statut de votre contrat
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-300 text-sm">
                      <strong>État actuel:</strong> {
                        contractStatus === 'UPLOADED' ? 'En cours de vérification' :
                        contractStatus === 'CONFIRMED' ? 'Approuvé' :
                        'Rejeté'
                      }
                    </p>
                    {uploadedContract && (
                      <>
                        <p className="text-gray-300 text-sm">
                          <strong>Fichier:</strong> {uploadedContract.fileName}
                        </p>
                        <p className="text-gray-300 text-sm">
                          <strong>Date de soumission:</strong> {new Date(uploadedContract.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-center py-8">
                  <span className="text-4xl mb-4 block">
                    {contractStatus === 'UPLOADED' ? '⏳' :
                     contractStatus === 'CONFIRMED' ? '🎉' : '❌'}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {contractStatus === 'UPLOADED' ? 'Contrat en cours de vérification' :
                     contractStatus === 'CONFIRMED' ? 'Contrat Approuvé!' : 'Contrat Rejeté'}
                  </h3>
                  <p className="text-gray-400">
                    {contractStatus === 'UPLOADED' ? 
                      'Votre contrat est en cours d\'examen par l\'administration. Vous recevrez une notification dès qu\'une décision sera prise.' :
                     contractStatus === 'CONFIRMED' ? 
                      'Félicitations! Votre contrat a été approuvé. Vous pouvez maintenant continuer avec les prochaines étapes de votre dossier.' :
                      'Votre contrat a été rejeté. Veuillez contacter le support pour plus d\'informations.'
                    }
                  </p>
                </div>
              </div>
            )}
          </ContentCard>
        );
      
      case 'dossier':
        return (
          <ContentCard className="content-card">
            <h2 className="text-2xl font-bold text-white mb-6">
              Dossier Administratif
            </h2>
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                📁 Vos documents seront bientôt disponibles
              </p>
            </div>
          </ContentCard>
        );
      
      case 'annonce':
        return (
          <ContentCard className="content-card">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg mb-2">
                📢 Annonces
              </h2>
              <p className="text-yellow-200 text-sm font-medium">Découvrez les dernières nouvelles de Via Italia</p>
            </div>
            
            {loadingAnnouncements ? (
              <div className="flex justify-center items-center py-16">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-yellow-400 text-2xl">📢</span>
                  </div>
                </div>
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 shadow-inner">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="col-span-full md:col-span-2 lg:col-span-3 text-center py-12">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <span className="text-6xl text-gray-400 mb-3">📢</span>
                        <span className="text-xl font-medium text-gray-600">Aucune annonce pour le moment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 justify-center">
                {announcements.map((announcement, index) => (
                  <div 
                    key={announcement.id}
                    className="announcement-wrapper flex-shrink-0"
                    ref={el => addToRefs(el)}
                  >
                    <AnnouncementCard
                      announcement={announcement}
                      onLike={() => {
                        console.log('Liked announcement:', announcement.id);
                        // Add like functionality here
                      }}
                      onComment={() => {
                        console.log('Commented on announcement:', announcement.id);
                        // Add comment functionality here
                      }}
                      onShare={() => {
                        console.log('Shared announcement:', announcement.id);
                        // Add share functionality here
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </ContentCard>
        );
      
      case 'universite':
        return (
          <ContentCard className="content-card">
            <h2 className="text-2xl font-bold text-white mb-6">
              Informations Universitaires
            </h2>
            <h2 className="text-2xl font-bold text-white mb-6"> Informations Universitaires </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="university-card">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🏫</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Université</h3>
                </div>
                <select 
                  name="university" 
                  value={universityInfo.university} 
                  onChange={handleUniversityInputChange}
                  disabled={isUniversityConfirmed}
                  className="university-select w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white transition-all duration-300 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Sélectionnez une université italienne</option>
                  <option value="bologna">Université de Bologne (Alma Mater Studiorum)</option>
                  <option value="padova">Université de Padoue</option>
                  <option value="pavia">Université de Pavie</option>
                  <option value="napoli">Université de Naples - Federico II</option>
                  <option value="roma1">Université Sapienza de Rome</option>
                  <option value="roma2">Université de Rome - Tor Vergata</option>
                  <option value="roma3">Université de Rome - Roma Tre</option>
                  <option value="milano">Université de Milan</option>
                  <option value="milanobocconi">Université Bocconi de Milan</option>
                  <option value="milanopolitecnico">Université Polytechnique de Milan</option>
                  <option value="torino">Université de Turin</option>
                  <option value="torinopolitecnico">Université Polytechnique de Turin</option>
                  <option value="genova">Université de Gênes</option>
                  <option value="firenze">Université de Florence</option>
                  <option value="bari">Université de Bari</option>
                  <option value="catania">Université de Catane</option>
                  <option value="palermo">Université de Palerme</option>
                  <option value="salerno">Université de Salerne</option>
                  <option value="perugia">Université de Pérouse</option>
                  <option value="pisa">Université de Pise</option>
                  <option value="siena">Université de Sienne</option>
                  <option value="trieste">Université de Trieste</option>
                  <option value="udine">Université d'Udine</option>
                  <option value="verona">Université de Vérone</option>
                  <option value="trento">Université de Trente</option>
                  <option value="sassari">Université de Sassari</option>
                  <option value="cagliari">Université de Cagliari</option>
                  <option value="ferrara">Université de Ferrare</option>
                  <option value="modena">Université de Modène et Reggio d'Émilie</option>
                  <option value="parma">Université de Parme</option>
                  <option value="bergamo">Université de Bergame</option>
                  <option value="brescia">Université de Brescia</option>
                  <option value="como">Université de Côme</option>
                  <option value="varese">Université de Varèse</option>
                  <option value="lecce">Université de Lecce</option>
                  <option value="messina">Université de Messine</option>
                  <option value="potenza">Université de la Basilicate</option>
                  <option value="campobasso">Université du Molise</option>
                  <option value="aosta">Université de la Vallée d'Aoste</option>
                </select>
              </div>
              <div className="specialty-card">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">📚</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Spécialité</h3>
                </div>
                <select 
                  name="specialty" 
                  value={universityInfo.specialty} 
                  onChange={handleUniversityInputChange}
                  disabled={isUniversityConfirmed}
                  className="specialty-select w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white transition-all duration-300 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Sélectionnez une spécialité</option>
                  <option value="droit">Droit</option>
                  <option value="economie">Économie</option>
                  <option value="gestion">Gestion</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="comptabilite">Comptabilité</option>
                  <option value="commerce">Commerce International</option>
                  <option value="communication">Communication</option>
                  <option value="informatique">Informatique</option>
                  <option value="mathematiques">Mathématiques</option>
                  <option value="physique">Physique</option>
                  <option value="chimie">Chimie</option>
                  <option value="biologie">Biologie</option>
                  <option value="medecine">Médecine</option>
                  <option value="pharmacie">Pharmacie</option>
                  <option value="psychologie">Psychologie</option>
                  <option value="sociologie">Sociologie</option>
                  <option value="histoire">Histoire</option>
                  <option value="geographie">Géographie</option>
                  <option value="lettres">Lettres Modernes</option>
                  <option value="langues">Langues Étrangères</option>
                  <option value="philosophie">Philosophie</option>
                  <option value="arts">Arts Plastiques</option>
                  <option value="musique">Musique</option>
                  <option value="theatre">Théâtre</option>
                  <option value="cinema">Cinéma</option>
                  <option value="journalisme">Journalisme</option>
                  <option value="tourisme">Tourisme</option>
                  <option value="sport">Sciences du Sport</option>
                  <option value="education">Sciences de l'Éducation</option>
                  <option value="urbanisme">Urbanisme</option>
                  <option value="architecture">Architecture</option>
                  <option value="ingenierie">Ingénierie</option>
                </select>
              </div>
              <div className="level-card">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🎯</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Niveau d'Étude</h3>
                </div>
                <select 
                  name="level" 
                  value={universityInfo.level} 
                  onChange={handleUniversityInputChange}
                  disabled={isUniversityConfirmed}
                  className="level-select w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white transition-all duration-300 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Sélectionnez un niveau</option>
                  <option value="licence1">Licence 1ère année</option>
                  <option value="licence2">Licence 2ème année</option>
                  <option value="licence3">Licence 3ème année</option>
                  <option value="master1">Master 1ère année</option>
                  <option value="master2">Master 2ème année</option>
                  <option value="doctorat">Doctorat</option>
                  <option value="prepa">Classe Préparatoire</option>
                  <option value="dut">DUT</option>
                  <option value="bts">BTS</option>
                  <option value="but">BUT</option>
                </select>
              </div>
            </div>
            <div className="university-summary bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Résumé de votre parcours</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">🏫</div>
                  <p className="text-green-400 font-medium">
                    {universityInfo.university ? 
                      universityInfo.university === 'bologna' ? 'Université de Bologne' : 
                      universityInfo.university === 'padova' ? 'Université de Padoue' : 
                      universityInfo.university === 'pavia' ? 'Université de Pavie' : 
                      universityInfo.university === 'napoli' ? 'Université de Naples' : 
                      universityInfo.university === 'roma1' ? 'Université Sapienza de Rome' : 
                      universityInfo.university === 'roma2' ? 'Université de Rome - Tor Vergata' : 
                      universityInfo.university === 'roma3' ? 'Université de Rome - Roma Tre' : 
                      universityInfo.university === 'milano' ? 'Université de Milan' : 
                      universityInfo.university === 'milanobocconi' ? 'Université Bocconi' : 
                      universityInfo.university === 'milanopolitecnico' ? 'Université Polytechnique de Milan' : 
                      universityInfo.university === 'torino' ? 'Université de Turin' : 
                      universityInfo.university === 'torinopolitecnico' ? 'Université Polytechnique de Turin' : 
                      universityInfo.university === 'genova' ? 'Université de Gênes' : 
                      universityInfo.university === 'firenze' ? 'Université de Florence' : 
                      universityInfo.university === 'bari' ? 'Université de Bari' : 
                      universityInfo.university === 'catania' ? 'Université de Catane' : 
                      universityInfo.university === 'palermo' ? 'Université de Palerme' : 
                      universityInfo.university === 'salerno' ? 'Université de Salerne' : 
                      universityInfo.university === 'perugia' ? 'Université de Pérouse' : 
                      universityInfo.university === 'pisa' ? 'Université de Pise' : 
                      universityInfo.university === 'siena' ? 'Université de Sienne' : 
                      universityInfo.university === 'trieste' ? 'Université de Trieste' : 
                      universityInfo.university === 'udine' ? 'Université d\'Udine' : 
                      universityInfo.university === 'verona' ? 'Université de Vérone' : 
                      universityInfo.university === 'trento' ? 'Université de Trente' : 
                      universityInfo.university === 'sassari' ? 'Université de Sassari' : 
                      universityInfo.university === 'cagliari' ? 'Université de Cagliari' : 
                      universityInfo.university === 'ferrara' ? 'Université de Ferrare' : 
                      universityInfo.university === 'modena' ? 'Université de Modène' : 
                      universityInfo.university === 'parma' ? 'Université de Parme' : 
                      universityInfo.university === 'bergamo' ? 'Université de Bergame' : 
                      universityInfo.university === 'brescia' ? 'Université de Brescia' : 
                      universityInfo.university === 'como' ? 'Université de Côme' : 
                      universityInfo.university === 'varese' ? 'Université de Varèse' : 
                      universityInfo.university === 'lecce' ? 'Université de Lecce' : 
                      universityInfo.university === 'messina' ? 'Université de Messine' : 
                      universityInfo.university === 'potenza' ? 'Université de la Basilicate' : 
                      universityInfo.university === 'campobasso' ? 'Université du Molise' : 
                      universityInfo.university === 'aosta' ? 'Université de la Vallée d\'Aoste' : 
                      'Non sélectionnée'
                    : 'Non sélectionnée'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📚</div>
                  <p className="text-green-400 font-medium capitalize">
                    {universityInfo.specialty || 'Non sélectionnée'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-green-400 font-medium">
                    {universityInfo.level ? 
                      universityInfo.level === 'licence1' ? 'Licence 1' : 
                      universityInfo.level === 'licence2' ? 'Licence 2' : 
                      universityInfo.level === 'licence3' ? 'Licence 3' : 
                      universityInfo.level === 'master1' ? 'Master 1' : 
                      universityInfo.level === 'master2' ? 'Master 2' : 
                      universityInfo.level === 'doctorat' ? 'Doctorat' : 
                      universityInfo.level === 'prepa' ? 'Prépa' : 
                      universityInfo.level === 'dut' ? 'DUT' : 
                      universityInfo.level === 'bts' ? 'BTS' : 
                      universityInfo.level === 'but' ? 'BUT' : 
                      universityInfo.level : 'Non sélectionné'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Save/Reset Button */}
            <div className="flex justify-center mt-6">
              {!isUniversityConfirmed ? (
                <button
                  onClick={handleSaveUniversityInfo}
                  disabled={isSaving || !universityInfo.university || !universityInfo.specialty || !universityInfo.level}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2m0 0l2-2m-2 2l-2-2" />
                      </svg>
                      Confirmer mes choix
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleResetUniversityInfo}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Modifier mes choix
                </button>
              )}
            </div>
            
            {/* Confirmation Modal */}
            {showConfirmation && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-md mx-4 transform transition-all">
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 2L9 19l-4-4h6"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Informations Enregistrées!</h3>
                    <p className="text-gray-600 mb-6">
                      Vos informations universitaires ont été enregistrées avec succès. Vous pouvez maintenant continuer à explorer d'autres universités ou modifier votre sélection.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={handleConfirmSave}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Continuer
                      </button>
                      <button
                        onClick={() => setShowConfirmation(false)}
                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ContentCard>
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        {menuItems.map((item, index) => (
          <SidebarItem
            key={item.id}
            ref={addToRefs}
            className={activeMenu === item.id ? "active" : ""}
            onClick={(e) => {
              setActiveMenu(item.id);

              // Haptic-like tap animation
              gsap.fromTo(
                e.currentTarget,
                { scale: 0.9 },
                {
                  scale: 1,
                  duration: 0.3,
                  ease: "power3.out"
                }
              );
            }}
          >
            <span className="icon">{item.icon}</span>
            <span className="text">{item.text}</span>
          </SidebarItem>
        ))}
      </Sidebar>

      <MainContent>
        <Header ref={headerRef}>
          <HeaderLeft>
            <NotificationButton onClick={toggleNotificationDropdown}>
              🔔
              {unreadCount > 0 && (
                <span className="badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
              )}
            </NotificationButton>
            
            {/* Notification Dropdown */}
            {showNotificationDropdown && (
              <div 
                ref={notificationDropdownRef}
                style={{
                  position: 'absolute',
                  top: '60px',
                  right: '0',
                  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  minWidth: '320px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  padding: '16px'
                }}
              >
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                  🔔 Notifications ({unreadCount})
                </h3>
                
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      marginBottom: '12px'
                    }}
                  >
                    Tout marquer comme lu
                  </button>
                )}
                
                {notifications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔔</div>
                    <p style={{ color: '#9ca3af', margin: 0, fontSize: '14px' }}>
                      Aucune notification
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        {!notification.isRead && (
                          <span style={{
                            width: '8px',
                            height: '8px',
                            background: '#3b82f6',
                            borderRadius: '50%',
                            marginTop: '6px',
                            flexShrink: 0
                          }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <p style={{ 
                            color: 'white', 
                            margin: '0 0 4px 0', 
                            fontSize: '14px'
                          }}>
                            {notification.content}
                          </p>
                          <p style={{ 
                            color: '#9ca3af', 
                            margin: 0, 
                            fontSize: '12px' 
                          }}>
                            {formatRelativeTime(notification.createdAt)}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            notificationService.deleteNotification(notification.id);
                            setNotifications(notifications.filter(n => n.id !== notification.id));
                            if (!notification.isRead) {
                              setUnreadCount(Math.max(0, unreadCount - 1));
                            }
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#9ca3af',
                            cursor: 'pointer',
                            fontSize: '16px'
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </HeaderLeft>
          
          <HeaderCenter>
            <Logo>
              <img src={logoSvg} alt="Via Italia" />
            </Logo>
          </HeaderCenter>
          
          <HeaderRight>
            <LogoutButton onClick={handleLogout}>
              Déconnexion
            </LogoutButton>
          </HeaderRight>
        </Header>

        <ContentArea ref={contentRef}>
          {renderContent()}
        </ContentArea>
      </MainContent>
      
      <BottomNav>
        {menuItems.map((item, index) => (
          <BottomNavItem
            key={item.id}
            ref={addToRefs}
            className={activeMenu === item.id ? "active" : ""}
            onClick={(e) => {
              setActiveMenu(item.id);

              // Haptic-like tap animation
              gsap.fromTo(
                e.currentTarget,
                { scale: 0.9 },
                {
                  scale: 1,
                  duration: 0.3,
                  ease: "power3.out"
                }
              );
            }}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.text}</span>
          </BottomNavItem>
        ))}
      </BottomNav>
    </DashboardContainer>
  );
};

const announcementCardStyles = `
  .announcement-card {
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
    border-bottom: 2px solid;
    border-bottom-color: rgb(59 130 246 / 0.3);
  }
`;

export default UserDashboard; 