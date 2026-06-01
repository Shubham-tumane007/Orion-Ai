import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Menu1 from './Menu1';

const MenuContainer = styled.div`
position: relative;
display: inline-block;
z-index: 1000;
`;

const MenuButton = styled(motion.button)`
width: 45px;
height: 45px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 12px;
backdrop-filter: blur(12px);
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
color: #cbd5e1;
font-size: 1.2rem;
position: absolute;
right: 20px;
top: 15px;
z-index: 1001;

&:hover {
background: rgba(139, 92, 246, 0.15);
border-color: rgba(139, 92, 246, 0.3);
color: #fff;
box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
}
`;

const DropdownMenu = () => {
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

return (
<MenuContainer ref={menuRef}>
<MenuButton
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={() => setIsOpen(!isOpen)}
aria-label="Toggle menu"
>
{isOpen ? <X size={22} /> : <Menu size={22} />}
</MenuButton>

<AnimatePresence>
{isOpen && <Menu1 />}
</AnimatePresence>
</MenuContainer>
);
};

export default DropdownMenu;