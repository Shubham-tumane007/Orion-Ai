import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

const Section = styled.div`
height: 100vh;
scroll-snap-align: center;
background: radial-gradient(ellipse at top, #1e1b4b 0%, #03001f 70%);
position: relative;
overflow: hidden;
display: flex;
flex-direction: column;
font-family: 'Inter', sans-serif;

&::before {
content: '';
position: absolute;
width: 200%;
height: 200%;
top: -50%;
left: -50%;
background-image:
linear-gradient(rgba(139, 92, 246, 0.08) 1px, transparent 1px),
linear-gradient(90deg, rgba(139, 92, 246, 0.08) 1px, transparent 1px);
background-size: 50px 50px;
transform: rotateX(60deg);
animation: gridMove 4s linear infinite;
z-index: 0;
pointer-events: none;
}

&::after {
content: '';
position: absolute;
top: 0; left: 0; right: 0; bottom: 0;
background: radial-gradient(circle at center, transparent 20%, #03001f 90%);
pointer-events: none;
z-index: 1;
}

@keyframes gridMove {
0% { transform: translateY(0) rotateX(60deg); }
100% { transform: translateY(50px) rotateX(60deg); }
}
`;

const MainContainer = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
padding: 40px;
z-index: 2;

@media (max-width: 768px) {
flex-direction: column;
padding: 20px;
gap: 30px;
}
`;

const GridDisplay = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
width: 100%;
max-width: 1100px;
gap: 50px;
align-items: center;

@media (max-width: 768px) {
grid-template-columns: 1fr;
gap: 30px;
}
`;

const ProjectShowcase = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
`;

const ProjectTab = styled(motion.button)`
background: ${props => props.active? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
backdrop-filter: blur(10px);
border: 1px solid ${props => props.active? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)'};
color: ${props => props.active? '#fff' : '#a0a0ba'};
padding: 22px 28px;
font-size: 1.4rem;
font-weight: 600;
text-align: left;
border-radius: 16px;
cursor: pointer;
position: relative;
overflow: hidden;
font-family: 'Inter', sans-serif;

&::before {
content: '';
position: absolute;
left: 0;
top: 0;
height: 100%;
width: 4px;
background: linear-gradient(180deg, #8b5cf6, #ec4899);
transform: scaleY(${props => props.active? 1 : 0});
transition: transform 0.3s ease;
transform-origin: top;
}
`;

const TerminalCard = styled(motion.div)`
background: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.12);
border-radius: 24px;
padding: 45px;
min-height: 380px;
display: flex;
flex-direction: column;
justify-content: center;
box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
`;

const ProjectTitle = styled.h2`
font-size: 2.4rem;
font-weight: 700;
background: linear-gradient(135deg, #fff, #cbd5e1);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
margin-bottom: 18px;
letter-spacing: -0.5px;
font-family: 'Playfair Display', serif;
`;

const ProjectDesc = styled.p`
font-size: 1.1rem;
color: #cbd5e1;
line-height: 1.7;
margin-bottom: 32px;
font-weight: 400;
`;

const TechStack = styled.div`
display: flex;
flex-wrap: wrap;
gap: 12px;
`;

const TechBadge = styled(motion.span)`
background: rgba(139, 92, 246, 0.12);
border: 1px solid rgba(139, 92, 246, 0.3);
color: #e2e8f0;
padding: 8px 16px;
font-size: 0.9rem;
font-weight: 500;
border-radius: 24px;
letter-spacing: 0.3px;
`;

const projectData = {
OrionAI: {
title: "Orion AI",
desc: "A highly advanced, full-stack predictive chatbot ecosystem integrated with cloud synchronization layers to provide secure, real-time context streaming architecture.",
tech: ["React.js", "Java", "Spring Boot", "Supabase", "Gemini API"]
},
FullStack: {
title: "Web Engineering",
desc: "Architecting high-throughput data pipelines and interactive web interfaces powered by robust relational schemas and fine-tuned database management subsystems.",
tech: ["Java", "Spring Boot", "MySQL", "Hibernate", "REST APIs"]
},
Systems: {
title: "Intelligence Systems",
desc: "Explorations into automation pipelines, device deployment frameworks, and metaheuristic algorithms designed to compute and optimize complex operations workflows.",
tech: ["Python", "Metaheuristic Algorithms", "ADB Terminal Tools", "Big Data Frameworks"]
}
};

const Works = () => {
const [activeProject, setActiveProject] = useState('OrionAI');

return (
<Section>
<Navbar />
<MainContainer>
<GridDisplay>
<motion.div
initial={{ x: -50, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
transition={{ duration: 0.5 }}
>
<ProjectShowcase>
{Object.keys(projectData).map((key, index) => (
<ProjectTab
key={key}
active={activeProject === key}
onClick={() => setActiveProject(key)}
whileHover={{ x: 8, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
whileTap={{ scale: 0.98 }}
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.1 }}
>
{projectData[key].title}
</ProjectTab>
))}
</ProjectShowcase>
</motion.div>

<AnimatePresence mode="wait">
<TerminalCard
key={activeProject}
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -30 }}
transition={{ duration: 0.4, ease: "easeOut" }}
>
<ProjectTitle>{projectData[activeProject].title}</ProjectTitle>
<ProjectDesc>{projectData[activeProject].desc}</ProjectDesc>
<TechStack>
{projectData[activeProject].tech.map((tech, index) => (
<TechBadge
key={index}
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ delay: index * 0.05 }}
whileHover={{ scale: 1.05, borderColor: '#8b5cf6' }}
>
{tech}
</TechBadge>
))}
</TechStack>
</TerminalCard>
</AnimatePresence>

</GridDisplay>
</MainContainer>
</Section>
);
};

export default Works;