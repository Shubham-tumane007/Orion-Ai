import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
// FIXED: Changed FaslidersH to FaSlidersH
import { FaCog, FaSignOutAlt, FaSignInAlt, FaBars, FaTimes, FaRobot, FaSlidersH } from 'react-icons/fa';

// --- Animations ---

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// --- Styled Components ---

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1000;
`;

const MenuButton = styled.button`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: #da4ea2;
  font-size: 1.2rem;
  z-index: 1001;
  position: relative;

  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};

  &:hover {
    background: #da4ea2;
    color: white;
    transform: ${(props) => (props.isOpen ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1.1)')};
    box-shadow: 0 8px 25px rgba(218, 78, 162, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const MenuItems = styled.div`
  position: absolute;
  right: 0;
  top: 60px;
  width: 260px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transform-origin: top right;
  animation: ${slideDown} 0.3s ease-out forwards;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 18px;
    width: 12px;
    height: 12px;
    background: white;
    transform: rotate(45deg);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    right: -10px;
    width: 220px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: #444;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease;
  position: relative;
  
  animation: ${slideInRight} 0.4s ease forwards;
  opacity: 0;
  animation-delay: ${(props) => props.delay || '0s'};

  svg {
    font-size: 1.1rem;
    margin-right: 12px;
    color: #da4ea2;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: linear-gradient(90deg, rgba(218, 78, 162, 0.1) 0%, transparent 100%);
    color: #da4ea2;
    padding-left: 20px;
    
    svg {
      transform: scale(1.2);
    }
  }
`;

const Separator = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.05);
  margin: 5px 10px;
`;

const DropdownMenu = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuContainer ref={menuRef}>
      <MenuButton onClick={toggleMenu} isOpen={isOpen}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>

      {isOpen && (
        <MenuItems>
          {isAuthenticated && user && (
            <MenuItem delay="0.05s" style={{ cursor: 'default', pointerEvents: 'none' }}>
               <img 
                 src={user.picture} 
                 alt={user.name} 
                 style={{ width: '25px', borderRadius: '50%', marginRight: '10px' }} 
               />
               <span style={{ fontSize: '0.85rem', color: '#888' }}>{user.given_name || "User"}</span>
            </MenuItem>
          )}

          {isAuthenticated && <Separator />}

          <MenuItem delay="0.1s">
            <FaRobot />
            My AI
          </MenuItem>
          
          <MenuItem delay="0.15s">
            <FaCog />
            Customize AI
          </MenuItem>
          
          <MenuItem delay="0.2s">
            {/* FIXED: Updated usage here as well */}
            <FaSlidersH />
            Settings
          </MenuItem>

          <Separator />

          {isAuthenticated ? (
            <MenuItem 
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              delay="0.25s"
            >
              <FaSignOutAlt />
              Log Out
            </MenuItem>
          ) : (
            <MenuItem 
              onClick={() => loginWithRedirect()}
              delay="0.25s"
            >
              <FaSignInAlt />
              Log In
            </MenuItem>
          )}
        </MenuItems>
      )}
    </MenuContainer>
  );
};

export default DropdownMenu;