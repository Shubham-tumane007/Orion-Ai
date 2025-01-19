import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import { FaUser, FaCog, FaSignOutAlt, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 20px;
`;

const MenuButton = styled.div`
  width: 30px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  position: relative;
  color: #da4ea2;
  font-size: 1.5rem;
  
  &:hover {
    color: #da4ea2;
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 20px;
  }
`;

const MenuIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MenuItems = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  right: 0;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  top: 40px;
  animation: ${(props) => (props.isOpen ? fadeIn : fadeOut)} 0.3s ease-in-out;
  
  @media (max-width: 768px) {
    width: 100vw;
    left: 0;
    right: 0;
    top: 60px; /* Adjust based on your button size and position */
  }
`;

const MenuItem = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgb(218, 78, 162);
  }

  & > svg {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
  }
`;

const DropdownMenu = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
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
      <MenuButton onClick={toggleMenu}>
        <MenuIcon>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuIcon>
      </MenuButton>
      <MenuItems isOpen={isOpen}>
        <MenuItem>
          <FaUser />
          My AI
        </MenuItem>
        <MenuItem>
          <FaCog />
          Customize AI
        </MenuItem>
        <MenuItem>
          <FaCog />
          Settings
        </MenuItem>
        {isAuthenticated ? (
          <MenuItem onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            <FaSignOutAlt />
            Log Out
          </MenuItem>
        ) : (
          <MenuItem onClick={() => loginWithRedirect()}>
            <FaSignInAlt />
            Log In
          </MenuItem>
        )}
      </MenuItems>
    </MenuContainer>
  );
};

export default DropdownMenu;
