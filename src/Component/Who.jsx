import React, { Suspense } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import moon from "../img/moon.png";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    height: auto; /* Adjust height for smaller screens */
    padding: 20px; /* Add padding for breathing space */
  }
`;

const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column-reverse; /* Reverse the order on small screens */
    align-items: center;
    justify-content: center;
  }
`;

const Left = styled.div`
  flex: 3;
  position: relative;

  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
    margin-bottom: 20px; /* Add margin between sections on small screens */
  }
`;

const Right = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex: 1;
    text-align: center; /* Center align text on small screens */
  }
`;

const Title = styled.h1`
  font-size: 74px;
  text-align: center; /* Center align title on small screens */

  @media only screen and (max-width: 768px) {
    font-size: 48px; /* Adjust font size for smaller screens */
  }
`;

const Subtitle = styled.h2`
  color: #da4ea2;
`;

const Desc = styled.p`
  font-size: 24px;
  color: lightgray;
  text-align: center; /* Center align text on small screens */

  @media only screen and (max-width: 768px) {
    font-size: 18px; /* Adjust font size for smaller screens */
    padding: 0 20px; /* Add padding for breathing space */
  }
`;

const Button = styled.button`
  background-color: #da4ea2;
  color: white;
  font-weight: 500;
  width: 150px; /* Increase button width for better touchability on small screens */
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 800px;
  height: 600px;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const SphereComponent = () => {
  return (
    <Sphere args={[1, 100, 200]} scale={2.4}>
      <MeshDistortMaterial
        color="#3d1c56"
        attach="material"
        distort={0.5}
        speed={2}
      />
    </Sphere>
  );
};

const Hero = () => {
  return (
    <Section>
      <Navbar />
      <Container>
        <Left>
          <Canvas style={{ width: "100%", height: "100%" }}>
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={3} />
              <directionalLight position={[3, 2, 1]} />
              <SphereComponent />
            </Suspense>
          </Canvas>
          <Img src={moon} alt="Moon" />
        </Left>
        <Right>
          <Title>Think outside the square space</Title>
          <Subtitle>Who I am</Subtitle>
          <Desc>
            Empowering creativity with cutting-edge AI solutions for visionary
            designers and developers
          </Desc>
          <Button>Get Started</Button>
        </Right>
      </Container>
    </Section>
  );
};

export default Hero;
