import React, { useEffect, useRef } from 'react';
import { animateBottomNavSlide } from '../../utils/animations';
import {
  BottomNavContainer,
  BottomNavList,
  BottomNavItem,
  BottomNavButton,
  BottomNavIcon,
  BottomNavText,
  BottomNavBadge,
  BottomNavDivider,
  BottomNavCenterItem,
  BottomNavCenterButton,
  BottomNavCenterIcon
} from './BottomNav.styles';

const BottomNav = ({ activeMenu, menuItems, onMenuClick }) => {
  const navRef = useRef(null);

  // Animate bottom nav on mount
  useEffect(() => {
    if (navRef.current) {
      animateBottomNavSlide(navRef.current);
    }
  }, []);

  const handleMenuClick = (menuId) => {
    if (onMenuClick) {
      onMenuClick(menuId);
    }
  };

  const getBadgeCount = (menuId) => {
    // You can implement badge logic here based on your data
    switch (menuId) {
      case 'messagerie':
        return 0; // Would come from messaging hook
      case 'rendezvous':
        return 0; // Would come from appointments hook
      case 'dossier':
        return 0; // Would come from dossier hook
      default:
        return 0;
    }
  };

  const isCenterItem = (index, totalItems) => {
    return index === Math.floor(totalItems / 2);
  };

  const renderMenuItem = (item, index, totalItems) => {
    const isActive = activeMenu === item.id;
    const badgeCount = getBadgeCount(item.id);
    const isCenter = isCenterItem(index, totalItems);

    const ButtonComponent = isCenter ? BottomNavCenterButton : BottomNavButton;
    const IconComponent = isCenter ? BottomNavCenterIcon : BottomNavIcon;
    const ItemComponent = isCenter ? BottomNavCenterItem : BottomNavItem;

    return (
      <ItemComponent key={item.id}>
        <ButtonComponent
          isActive={isActive}
          onClick={() => handleMenuClick(item.id)}
        >
          <IconComponent>{item.icon}</IconComponent>
          <BottomNavText isActive={isActive}>{item.text}</BottomNavText>
          {badgeCount > 0 && <BottomNavBadge>{badgeCount}</BottomNavBadge>}
        </ButtonComponent>
      </ItemComponent>
    );
  };

  // Filter mobile menu items (show only main ones)
  const mobileMenuItems = menuItems.filter(item => 
    ['rendezvous', 'messagerie', 'universite', 'parcours', 'dossier'].includes(item.id)
  );

  return (
    <BottomNavContainer ref={navRef}>
      <BottomNavList>
        {mobileMenuItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderMenuItem(item, index, mobileMenuItems.length)}
            {index < mobileMenuItems.length - 1 && index < 3 && (
              <BottomNavDivider />
            )}
          </React.Fragment>
        ))}
      </BottomNavList>
    </BottomNavContainer>
  );
};

export default BottomNav;
