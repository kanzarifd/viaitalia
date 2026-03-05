import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { gsap } from "gsap";
import styled from "styled-components";
import axios from "axios";
import messageService from "../api/messageService";

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
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
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
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: linear-gradient(135deg, 
    rgba(239, 68, 68, 0.05) 20%, 
    rgba(0, 255, 51, 0.02) 100%);
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(30px);
`;

const UserList = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  max-height: 400px;
  overflow-y: auto;
`;

const UserItem = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(0, 255, 51, 0.1);
    transform: translateX(5px);
  }

  &.active {
    background: rgba(0, 255, 51, 0.2);
    border-left: 3px solid var(--green);
  }

  .user-info {
    flex: 1;
  }

  .user-name {
    font-weight: 600;
    color: white;
  }

  .user-email {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .message-count {
    background: var(--green);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 600;
  }
`;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [activeMenu, setActiveMenu] = useState('messagerie');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const sidebarRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  // Load users and messages on component mount
  useEffect(() => {
    fetchUsers();
    fetchAllUsers();
    fetchMessages(); // Fetch all messages
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/auth/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Users API Response:', response.data);
      
      // Handle different response structures
      let usersData = [];
      if (response.data && response.data.data) {
        usersData = response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
        usersData = response.data;
      }
      
      setUsers(usersData.filter(u => u.role === 'USER'));
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/auth/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('All Users API Response:', response.data);
      
      // Handle different response structures
      let usersData = [];
      if (response.data && response.data.data) {
        usersData = response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
        usersData = response.data;
      }
      
      setAllUsers(usersData);
    } catch (error) {
      console.error('Error fetching all users:', error);
      setAllUsers([]);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await messageService.getAllMessages();
      
      if (response.success && response.data) {
        // Sort messages by createdAt (oldest first for proper chat flow)
        const sortedMessages = response.data.sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        );
        setMessages(sortedMessages);
        console.log('Admin messages loaded:', sortedMessages.length);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    
    setIsSendingMessage(true);
    
    try {
      const response = await messageService.createMessage({
        content: newMessage.trim(),
        sender: 'ADMIN',
        userId: parseInt(selectedUser.id)
      });
      
      if (response.success && response.data) {
        setMessages([...messages, response.data]);
        setNewMessage('');
        console.log('Message sent successfully:', response.data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error notification
      const errorText = 'Erreur lors de l\'envoi: ' + (error.response?.data?.message || error.message);
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      errorDiv.innerHTML = `
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>${errorText}</span>
      `;
      document.body.appendChild(errorDiv);
      
      gsap.fromTo(errorDiv, {
        scale: 0, opacity: 0, rotation: 180, x: 100
      }, {
        scale: 1, opacity: 1, rotation: 0, x: 0, duration: 0.6, ease: "back.out(1.7)",
        onComplete: () => {
          gsap.to(errorDiv, {
            scale: 0, opacity: 0, x: 100, duration: 0.3, delay: 3, ease: "power2.in"
          });
          setTimeout(() => {
            document.body.removeChild(errorDiv);
          }, 3300);
        }
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const menuItems = [
    { id: 'messagerie', icon: '💬', text: 'Messagerie' },
    { id: 'users', icon: '👥', text: 'Utilisateurs' },
    { id: 'appointments', icon: '📅', text: 'Rendez-vous' },
    { id: 'university', icon: '🎓', text: 'Université' }
  ];

  const renderContent = () => {
    switch(activeMenu) {
      case 'messagerie':
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User List */}
              <div className="lg:col-span-1">
                <ContentCard className="content-card">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    👥 Utilisateurs
                  </h2>
                  <UserList>
                    {users.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400">
                          Aucun utilisateur trouvé
                        </p>
                      </div>
                    ) : (
                      users.map((user) => (
                        <UserItem
                          key={user.id}
                          className={selectedUser?.id === user.id ? 'active' : ''}
                          onClick={() => setSelectedUser(user)}
                        >
                          <div className="user-info">
                            <div className="user-name">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="user-email">
                              {user.email}
                            </div>
                          </div>
                          <div className="message-count">
                            💬
                          </div>
                        </UserItem>
                      ))
                    )}
                  </UserList>
                </ContentCard>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <ContentCard className="content-card">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    💬 Messagerie
                    {selectedUser && (
                      <span className="text-lg font-normal text-gray-400 ml-2">
                        - {selectedUser.firstName} {selectedUser.lastName}
                      </span>
                    )}
                  </h2>
                  
                  {selectedUser ? (
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 h-[500px] flex flex-col">
                      {/* Messages Container */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.length === 0 ? (
                          <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">
                              💬 Aucun message avec cet utilisateur
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                              Envoyez votre premier message pour commencer la conversation
                            </p>
                          </div>
                        ) : (
                          messages
                            .filter(message => message.userId === selectedUser.id)
                            .map((message) => (
                              <div
                                key={message.id}
                                className={`flex ${message.sender === 'ADMIN' ? 'justify-end' : 'justify-start'} admin-message-item`}
                              >
                                <div
                                  className={`max-w-xs px-4 py-2 rounded-lg ${
                                    message.sender === 'ADMIN'
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-gray-600 text-white'
                                  }`}
                                >
                                  <p className="text-sm">{message.content}</p>
                                  <p className={`text-xs mt-1 ${
                                    message.sender === 'ADMIN' ? 'text-blue-200' : 'text-gray-300'
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
                      <div className="border-t border-gray-700/50 p-4">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder={`Message à ${selectedUser.firstName}...`}
                            className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            disabled={isSendingMessage}
                          />
                          <button
                            onClick={sendMessage}
                            disabled={isSendingMessage || !newMessage.trim()}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                  ) : (
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-12 text-center">
                      <p className="text-gray-400 text-lg">
                        👥 Sélectionnez un utilisateur pour commencer à discuter
                      </p>
                    </div>
                  )}
                </ContentCard>
              </div>
            </div>
          </>
        );
      
      case 'users':
        return (
          <ContentCard className="content-card">
            <h2 className="text-2xl font-bold text-white mb-6">
              👥 Tous les Utilisateurs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-4">Nom</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Rôle</th>
                    <th className="text-left p-4">Date d'inscription</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-4">{user.firstName} {user.lastName}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === 'ADMIN' 
                            ? 'bg-red-500 text-white' 
                            : 'bg-green-500 text-white'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ContentCard>
        );
      
      case 'appointments':
        return (
          <ContentCard className="content-card">
            <h2 className="text-2xl font-bold text-white mb-6">
              📅 Tous les Rendez-vous
            </h2>
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                📅 Gestion des rendez-vous coming soon
              </p>
            </div>
          </ContentCard>
        );
      
      case 'university':
        return (
          <ContentCard className="content-card">
            <h2 className="text-2xl font-bold text-white mb-6">
              🎓 Informations Universitaires
            </h2>
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                🎓 Consultation des informations universitaires coming soon
              </p>
            </div>
          </ContentCard>
        );
      
      default:
        return null;
    }
  };

  // GSAP Animations
  useEffect(() => {
    // Animate sidebar
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

    // Animate messaging interface
    if (activeMenu === 'messagerie') {
      // Animate user list
      gsap.fromTo('.user-item', {
        x: -30,
        opacity: 0,
        scale: 0.8
      }, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        stagger: 0.1,
        delay: 1.0
      });

      // Animate message container
      gsap.fromTo('#admin-messages-container', {
        y: 30,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 1.2
      });

      // Animate message items
      gsap.fromTo('.admin-message-item', {
        y: 20,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        stagger: 0.1,
        delay: 1.4
      });
    }
  }, [activeMenu]);

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar ref={sidebarRef}>
        <div className="px-4 mb-8">
          <h3 className="text-white font-bold text-lg mb-2">
            Via Italia Admin
          </h3>
          <p className="text-gray-400 text-sm">
            Panneau d'administration
          </p>
        </div>
        
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            className={activeMenu === item.id ? 'active' : ''}
            onClick={() => setActiveMenu(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span className="text">{item.text}</span>
          </SidebarItem>
        ))}
      </Sidebar>

      <MainContent>
        <Header ref={headerRef}>
          <HeaderLeft>
            <h1 className="text-2xl font-bold text-white">
              Tableau de Bord Administrateur
            </h1>
          </HeaderLeft>
          
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
    </DashboardContainer>
  );
} 

