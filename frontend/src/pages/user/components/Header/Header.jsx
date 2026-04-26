import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';
import { animateNotification, animateHeaderFadeDown } from '../../utils/animations';
import {
  HeaderContainer,
  LogoContainer,
  Logo,
  LogoText,
  HeaderActions,
  NotificationContainer,
  NotificationButton,
  NotificationBadge,
  NotificationDropdown,
  NotificationHeader,
  NotificationTitle,
  NotificationActions,
  NotificationAction,
  NotificationList,
  NotificationItem,
  NotificationIcon,
  NotificationContent,
  NotificationMessage,
  NotificationTime,
  NotificationEmpty,
  NotificationLoading,
  NotificationSpinner,
  LogoutButton,
  UserAvatar,
  UserInfo,
  UserName
} from './Header.styles';

const Header = ({ onLogout }) => {
  const { user } = useAuth();
  const { 
    notifications, 
    unreadCount, 
    isLoading, 
    markAllAsRead, 
    markAsRead, 
    deleteNotification,
    getNotificationIcon,
    formatNotificationTime
  } = useNotifications(user?.id);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Animate header on mount
  useEffect(() => {
    if (headerRef.current) {
      animateHeaderFadeDown(headerRef.current);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.isRead) {
        await markAsRead(notification.id);
      }
      // You can add navigation logic here based on notification type
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  const handleDeleteNotification = async (e, notificationId) => {
    e.stopPropagation();
    try {
      await deleteNotification(notificationId);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const getNotificationType = (notification) => {
    if (notification.type === 'ERROR' || notification.type === 'error') return 'error';
    if (notification.type === 'WARNING' || notification.type === 'warning') return 'warning';
    if (notification.type === 'SUCCESS' || notification.type === 'success') return 'success';
    return 'info';
  };

  return (
    <HeaderContainer ref={headerRef}>
      <LogoContainer>
        <Logo>V</Logo>
        <LogoText>ViaItalia</LogoText>
      </LogoContainer>

      <HeaderActions>
        <NotificationContainer ref={dropdownRef}>
          <NotificationButton onClick={toggleDropdown}>
            🔔
            {unreadCount > 0 && (
              <NotificationBadge>
                {unreadCount > 99 ? '99+' : unreadCount}
              </NotificationBadge>
            )}
          </NotificationButton>

          <NotificationDropdown isOpen={isDropdownOpen}>
            <NotificationHeader>
              <NotificationTitle>Notifications</NotificationTitle>
              <NotificationActions>
                {unreadCount > 0 && (
                  <NotificationAction onClick={handleMarkAllAsRead}>
                    Tout marquer comme lu
                  </NotificationAction>
                )}
              </NotificationActions>
            </NotificationHeader>

            {isLoading ? (
              <NotificationLoading>
                <NotificationSpinner />
                Chargement...
              </NotificationLoading>
            ) : notifications.length === 0 ? (
              <NotificationEmpty>
                Aucune notification
              </NotificationEmpty>
            ) : (
              <NotificationList>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    isUnread={!notification.isRead}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <NotificationIcon type={getNotificationType(notification)}>
                      {getNotificationIcon(notification.type)}
                    </NotificationIcon>
                    <NotificationContent>
                      <NotificationMessage isUnread={!notification.isRead}>
                        {notification.message || notification.title || 'Notification'}
                      </NotificationMessage>
                      <NotificationTime>
                        {formatNotificationTime(notification.createdAt)}
                      </NotificationTime>
                    </NotificationContent>
                  </NotificationItem>
                ))}
              </NotificationList>
            )}
          </NotificationDropdown>
        </NotificationContainer>

        <UserInfo>
          <UserName>
            {user?.firstName && user?.lastName 
              ? `${user.firstName} ${user.lastName}`
              : user?.email || 'Utilisateur'
            }
          </UserName>
          <UserAvatar>
            {user?.firstName?.[0] || user?.email?.[0] || 'U'}
          </UserAvatar>
        </UserInfo>

        <LogoutButton onClick={handleLogout}>
          🚪 Déconnexion
        </LogoutButton>
      </HeaderActions>
    </HeaderContainer>
  );
};

export default Header;
