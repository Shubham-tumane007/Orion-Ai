import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

const MenuContainer = styled(motion.div)`
position: absolute;
top: 60px;
right: 0;
background: rgba(15, 12, 41, 0.8);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.12);
border-radius: 16px;
padding: 12px;
min-width: 220px;
box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
z-index: 200;
`;

const UserInfo = styled.div`
display: flex;
align-items: center;
gap: 12px;
padding: 12px;
border-bottom: 1px solid rgba(255, 255, 255, 0.08);
margin-bottom: 8px;
`;

const Avatar = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background: linear-gradient(135deg, #8b5cf6, #ec4899);
display: flex;
align-items: center;
justify-content: center;
font-weight: 600;
color: white;
font-size: 1.1rem;
`;

const UserName = styled.div`
color: #f1f5f9;
font-weight: 600;
font-size: 0.95rem;
font-family: 'Inter', sans-serif;
`;

const MenuItem = styled(motion.button)`
width: 100%;
display: flex;
align-items: center;
gap: 12px;
padding: 12px 14px;
background: transparent;
border: none;
border-radius: 10px;
color: #cbd5e1;
font-size: 0.9rem;
font-weight: 500;
font-family: 'Inter', sans-serif;
cursor: pointer;
transition: all 0.2s ease;
text-align: left;

&:hover {
background: rgba(139, 92, 246, 0.15);
color: #fff;
}
`;

const Divider = styled.div`
height: 1px;
background: rgba(255, 255, 255, 0.08);
margin: 8px 0;
`;

const Menu1 = () => {
const { user, logout } = useAuth0();

return (
<MenuContainer
initial={{ opacity: 0, y: -10, scale: 0.95 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -10, scale: 0.95 }}
transition={{ duration: 0.2 }}
>
<UserInfo>
<Avatar>{user?.name?.charAt(0)?.toUpperCase() || 'S'}</Avatar>
<UserName>{user?.name || 'Shubham'}</UserName>
</UserInfo>

<MenuItem whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
<User size={18} />
Profile
</MenuItem>

<MenuItem whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
<Settings size={18} />
Settings
</MenuItem>

<Divider />

<MenuItem 
whileHover={{ x: 5, backgroundColor: 'rgba(239, 68, 68, 0.15)' }} 
whileTap={{ scale: 0.98 }}
onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
>
<LogOut size={18} />
Logout
</MenuItem>
</MenuContainer>
);
};

export default Menu1;