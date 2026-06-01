import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import logo from './../img/logo.png';
import { useAuth0 } from "@auth0/auth0-react";
import DropdownMenu from './DropdownMenu';

const Section = styled.div`
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: 0;
width: 100%;
z-index: 100;
backdrop-filter: blur(20px) saturate(180%);
background: rgba(3, 0, 31, 0.6);
border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Container = styled.div`
width: 1400px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 14px 0px;

@media only screen and (max-width: 768px) {
width: 100%;
padding: 12px 20px;
}
`;

const Links = styled.div`
display: flex;
align-items: center;
gap: 50px;
`;

const Logo = styled(motion.img)`
height: 48px;
filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.4));
cursor: pointer;
`;

const List = styled.ul`
display: flex;
gap: 8px;
list-style: none;

@media only screen and (max-width: 768px) {
display: none;
}
`;

const StyledNavLink = styled(NavLink)`
text-decoration: none;
color: #cbd5e1;
font-family: 'Inter', sans-serif;
font-size: 0.95rem;
font-weight: 500;
padding: 10px 18px;
border-radius: 10px;
transition: all 0.3s ease;
position: relative;

&:hover {
color: #fff;
background: rgba(139, 92, 246, 0.12);
transform: translateY(-2px);
}

&.active {
color: #fff;
background: rgba(139, 92, 246, 0.2);
border: 1px solid rgba(139, 92, 246, 0.4);
box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}
`;

const RightContainer = styled.div`
display: flex;
align-items: center;
gap: 16px;
`;

const UserName = styled(motion.p)`
margin: 0;
padding: 8px 16px;
color: #e2e8f0;
font-family: 'Inter', sans-serif;
font-size: 0.9rem;
font-weight: 500;
background: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 20px;
`;

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
<Logo
src={logo}
alt="Logo"
whileHover={{ scale: 1.1, rotate: 5 }}
whileTap={{ scale: 0.95 }}
/>
</Link>
<List>
<StyledNavLink to="/" end>
Home
</StyledNavLink>
<StyledNavLink to="/who">
Studio
</StyledNavLink>
<StyledNavLink to="/works">
Works
</StyledNavLink>
<StyledNavLink to="/contact">
Contact
</StyledNavLink>
<StyledNavLink to="/visionai" onClick={handleVisionAILink}>
Orion AI
</StyledNavLink>
</List>
</Links>
<RightContainer>
{isAuthenticated && user && (
<UserName
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.3 }}
>
{user.name}
</UserName>
)}
<DropdownMenu />
</RightContainer>
</Container>
</Section>
);
};

export default Navbar;