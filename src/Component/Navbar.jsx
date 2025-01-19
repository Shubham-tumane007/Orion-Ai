
import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import logo from './../img/logo.png';
import { useAuth0 } from "@auth0/auth0-react";
import DropdownMenu from './DropdownMenu';

const Section = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: none;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  text-decoration: none;
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 52px;
`;

const List = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-family: sans-serif;
  display: inline-block; 
  margin-right: 20px; 
  transition: color 0.3s ease-in, transform 0.3s ease-in;

  &:hover {
    transform: scale(1.6);
  }

  &.active {
    font-weight: bold;
    color: red;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserName = styled.p`
  margin: 0;
  padding: 0;
  color: white;
`;

// const Icons = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 20px;
// `;

// const Icon = styled.img`
//   width: 20px;
//   cursor: pointer;
// `;

const Navbar = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  const handleVisionAILink = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      loginWithRedirect();
    }
  };

  return (
    <Section>
      <Container>
        <Links>
          <Link to="/">
            <Logo src={logo} alt="Logo" />
          </Link>
          <List>
            <StyledNavLink to="/" exact activeClassName="active">
              <ListItem>Home</ListItem>
            </StyledNavLink>
            <StyledNavLink to="/who" activeClassName="active">
              <ListItem>Studio</ListItem>
            </StyledNavLink>
            <StyledNavLink to="/works" activeClassName="active">
              <ListItem>Works</ListItem>
            </StyledNavLink>
            <StyledNavLink to="/contact" activeClassName="active">
              <ListItem>Contact</ListItem>
            </StyledNavLink>
            <StyledNavLink to="/visionai" activeClassName="active" onClick={handleVisionAILink}>
              <ListItem>Vision Ai</ListItem>
            </StyledNavLink>
          </List>
        </Links>
        <RightContainer>
          {isAuthenticated && user && (
            <UserName>{user.name}</UserName>
          )}
          <DropdownMenu />
        </RightContainer>
      </Container>
    </Section>
  );
};

export default Navbar;
