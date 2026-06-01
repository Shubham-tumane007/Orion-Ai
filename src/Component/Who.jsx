import React, { Suspense, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { Model as EarthModel } from "./Earth";
import moon from "../img/moon.png";

const Section = styled.div`
height: 100vh;
background: radial-gradient(ellipse at top, #1e1b4b 0%, #03001f 70%);
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
position: relative;
overflow: hidden;
perspective: 1000px;

@media only screen and (max-width: 768px) {
height: auto;
padding: 20px 0;
}
`;

const Container = styled.div`
height: 100%;
width: 100%;
max-width: 1400px;
display: flex;
justify-content: space-between;
padding: 0 40px;
z-index: 2;

@media only screen and (max-width: 768px) {
width: 100%;
flex-direction: column-reverse;
align-items: center;
justify-content: center;
gap: 30px;
padding: 0 20px;
}
`;

const Left = styled.div`
flex: 3;
position: relative;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;

@media only screen and (max-width: 768px) {
height: 45vh;
margin-bottom: 20px;
}
`;

const Right = styled(motion.div)`
flex: 2;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
gap: 25px;
transform-style: preserve-3d;
transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
transition: transform 0.1s ease-out;

@media only screen and (max-width: 768px) {
align-items: center;
text-align: center;
}
`;

const Title = styled.h1`
font-size: 4.5rem;
font-weight: 800;
line-height: 1.1;
background: linear-gradient(135deg, #fff 0%, #e2e8f0 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
letter-spacing: -1px;
transform: translateZ(40px);
font-family: 'Playfair Display', serif;

@media only screen and (max-width: 1024px) { font-size: 3.5rem; }
@media only screen and (max-width: 768px) { font-size: 2.8rem; }
`;

const Subtitle = styled.h2`
color: #8b5cf6;
font-size: 1.1rem;
font-weight: 700;
letter-spacing: 4px;
text-transform: uppercase;
transform: translateZ(20px);
text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
`;

const Desc = styled.p`
font-size: 1.3rem;
color: #cbd5e1;
line-height: 1.7;
transform: translateZ(30px);
font-weight: 400;

@media only screen and (max-width: 768px) {
font-size: 1.05rem;
}
`;

const Button = styled(motion.button)`
background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
color: white;
font-weight: 600;
font-size: 1rem;
letter-spacing: 1px;
width: 170px;
padding: 16px;
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 14px;
cursor: pointer;
box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
transform: translateZ(50px);
font-family: 'Inter', sans-serif;
`;

const Img = styled(motion.img)`
width: 100%;
max-width: 650px;
height: auto;
object-fit: contain;
position: absolute;
margin: auto;
pointer-events: none;
filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.7));

@media only screen and (max-width: 1024px) { max-width: 500px; }
@media only screen and (max-width: 768px) { max-width: 280px; }
`;

const Hero = () => {
const textBlockRef = useRef(null);
const navigate = useNavigate();

useEffect(() => {
const element = textBlockRef.current;
if (!element || window.innerWidth <= 768) return;

const handleMouseMove = (e) => {
const x = e.clientX - window.innerWidth / 2;
const y = e.clientY - window.innerHeight / 2;
const rx = -(y / (window.innerHeight / 2)) * 8;
const ry = (x / (window.innerWidth / 2)) * 8;
element.style.setProperty('--rx', `${rx}deg`);
element.style.setProperty('--ry', `${ry}deg`);
};

const handleMouseLeave = () => {
element.style.setProperty('--rx', '0deg');
element.style.setProperty('--ry', '0deg');
};

window.addEventListener('mousemove', handleMouseMove);
element.addEventListener('mouseleave', handleMouseLeave);

return () => {
window.removeEventListener('mousemove', handleMouseMove);
element.removeEventListener('mouseleave', handleMouseLeave);
};
}, []);

return (
<Section>
<Navbar />
<Container>
<Left>
<Canvas camera={{ position: [0, 0, 4.5] }} style={{ width: "100%", height: "100%" }}>
<Suspense fallback={null}>
<OrbitControls enableZoom={false} autoRotate={false} />
<ambientLight intensity={1.2} />
<directionalLight position={[5, 3, 2]} intensity={2} />
<pointLight position={[-5, -3, -2]} color="#8b5cf6" intensity={2} />
<Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
<EarthModel scale={1.8} position={[0, 0, 0]} />
</Float>
</Suspense>
</Canvas>
<Img
src={moon}
alt="Atmospheric Layer Overlay"
animate={{ y: [0, -15, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
/>
</Left>

<Right ref={textBlockRef}>
<Subtitle>Who I am</Subtitle>
<Title>Think outside the square space</Title>
<Desc>
Empowering creativity with cutting-edge AI solutions for visionary designers and developers
</Desc>
<Button
onClick={() => navigate('/visionai')}
whileHover={{ scale: 1.05, y: -3, boxShadow: '0 8px 30px rgba(139, 92, 246, 0.6)' }}
whileTap={{ scale: 0.98, y: 0 }}
>
Get Started
</Button>
</Right>
</Container>
</Section>
);
};

export default Hero;