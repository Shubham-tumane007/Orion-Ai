import React, { Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model as EarthModel } from "./Earth";
import moon from "../img/moon.png";

const Section = styled.div`
height: 100vh;
background: linear-gradient(180deg, #03001f 0%, #06004d 100%);
display: flex;
flex-direction: column;
align-items: center;
position: relative;
overflow: hidden;

@media only screen and (max-width: 768px) { 
height: auto;
padding-top: 100px;
padding-bottom: 60px;
}
`;

const GradientOrb = styled(motion.div)`
position: absolute;
width: 600px;
height: 600px;
border-radius: 50%;
background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
filter: blur(80px);
top: 20%;
left: -10%;
z-index: 0;

@media only screen and (max-width: 768px) {
width: 400px;
height: 400px;
left: -20%;
}
`;

const GradientOrb2 = styled(motion.div)`
position: absolute;
width: 500px;
height: 500px;
border-radius: 50%;
background: radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%);
filter: blur(70px);
bottom: 10%;
right: -5%;
z-index: 0;
`;

const Container = styled.div`
height: 100%;
width: 100%;
max-width: 1400px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 40px;
z-index: 2;
margin-top: 80px;

@media only screen and (max-width: 768px) { 
width: 100%; 
flex-direction: column-reverse; 
gap: 50px;
padding: 0 20px;
margin-top: 40px;
}
`;

const Left = styled(motion.div)`
flex: 3;
position: relative;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;

@media only screen and (max-width: 768px) { 
height: 45vh;
}
`;

const Right = styled(motion.div)`
flex: 2;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
gap: 25px;

@media only screen and (max-width: 768px) { 
align-items: center;
text-align: center;
}
`;

const Subtitle = styled(motion.h2)` 
color: #a78bfa;
font-size: 0.9rem;
font-weight: 600;
letter-spacing: 3px;
text-transform: uppercase;
font-family: 'Inter', sans-serif;
`;

const Title = styled(motion.h1)`
font-size: 4.2rem;
font-weight: 800;
line-height: 1.1;
background: linear-gradient(135deg, #f8fafc 0%, #c084fc 50%, #f8fafc 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
letter-spacing: -2px;
font-family: 'Inter', sans-serif;

@media only screen and (max-width: 1024px) { font-size: 3.2rem; }
@media only screen and (max-width: 768px) { font-size: 2.5rem; }
`;

const Desc = styled(motion.p)`
font-size: 1.2rem;
color: #cbd5e1;
line-height: 1.7;
font-family: 'Inter', sans-serif;
max-width: 500px;

@media only screen and (max-width: 768px) { 
font-size: 1rem;
}
`;

const Button = styled(motion.button)`
background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
color: white;
font-weight: 600;
font-size: 1rem;
letter-spacing: 0.5px;
padding: 16px 40px;
border: none;
border-radius: 12px;
cursor: pointer;
font-family: 'Inter', sans-serif;
box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
position: relative;
overflow: hidden;

&::before {
content: '';
position: absolute;
top: 0;
left: -100%;
width: 100%;
height: 100%;
background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
transition: left 0.5s;
}

&:hover::before {
left: 100%;
}
`;

const Img = styled(motion.img)`
width: 100%;
max-width: 650px;
height: auto;
object-fit: contain;
position: absolute;
pointer-events: none;
filter: drop-shadow(0 20px 50px rgba(139, 92, 246, 0.4));

@media only screen and (max-width: 1024px) { max-width: 500px; }
@media only screen and (max-width: 768px) { max-width: 280px; }
`;

const Hero = () => {
const navigate = useNavigate();

return (
<Section>
<GradientOrb
animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
/>
<GradientOrb2
animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
/>

<Navbar />

<Container>
<Left
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}
>
<Canvas camera={{ position: [0, 0, 4.5] }} style={{ width: "100%", height: "100%" }}>
<Suspense fallback={null}>
<OrbitControls enableZoom={false} autoRotate enablePan={false} />
<ambientLight intensity={1.8} />
<directionalLight position={[5, 3, 2]} intensity={2.5} />
<pointLight position={[-5, -3, -2]} color="#8b5cf6" intensity={2} />
<EarthModel scale={1.8} position={[0, 0, 0]} />
</Suspense>
</Canvas>
<Img
src={moon}
alt="Atmosphere"
animate={{ y: [0, -15, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
/>
</Left>

<Right
initial={{ opacity: 0, x: 50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8, delay: 0.2 }}
>
<Subtitle
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.4 }}
>
Who I Am
</Subtitle>
<Title
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.5 }}
>
Think outside the square space
</Title>
<Desc
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.6 }}
>
Empowering creativity with cutting-edge AI solutions for visionary designers and developers.
</Desc>
<Button
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.7 }}
whileHover={{ scale: 1.05, boxShadow: "0 12px 35px rgba(139, 92, 246, 0.6)" }}
whileTap={{ scale: 0.95 }}
onClick={() => navigate('/visionai')}
>
Get Started
</Button>
</Right>
</Container>
</Section>
);
};

export default Hero;