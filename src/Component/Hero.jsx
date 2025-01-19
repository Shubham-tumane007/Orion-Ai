// src/Component/Hero.jsx
import React, { Suspense } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Model as Earth } from './Earth'; 
import line from '../img/line.png';

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    height: auto; /* Adjusted for responsiveness */
  }
`;

const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 100%;
  max-width: 1400px; /* Added max-width for larger screens */
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 74px;

  @media only screen and (max-width: 768px) {
    font-size: 48px; /* Adjusted font size for smaller screens */
    text-align: center;
  }
`;

const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: #da4ea2;
`;

const Desc = styled.p`
  font-size: 24px;
  color: lightgray;

  @media only screen and (max-width: 768px) {
    font-size: 18px; /* Adjusted font size for smaller screens */
    padding: 20px;
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: #da4ea2;
  color: white;
  font-weight: 500;
  width: 150px; /* Increased width for better visibility */
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
 
const Right = styled.div`
  flex: 3;
  position: relative;
  height: 100vh; /* Ensure Canvas takes full height */

  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const Hero = () => {
  return (
    <Section>
      <Navbar />
      <Container>
        <Left>
          <Title>Think. Make. Solve.</Title>
          <WhatWeDo>
            <Line src={line} alt="Decorative line" />
            <Subtitle>What I Do</Subtitle>
          </WhatWeDo>
          <Desc>
            At Vision AI, we transform digital experiences with human-centered artificial intelligence.
          </Desc>
          <Button>Learn More</Button>
        </Left>
        <Right>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Suspense fallback={null}>
              <Earth scale={[2, 2, 2]} /> 
              <OrbitControls autoRotate  enableZoom={false}  />
            </Suspense>
            <Environment preset="night" />
          </Canvas>
        </Right>
      </Container>
    </Section>
  );
};

export default Hero;
