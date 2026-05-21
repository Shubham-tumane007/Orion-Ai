import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import './Contactus.css';
import Navbar from './Navbar';

// --- VISUAL EFFECTS & ANIMATIONS ---

const gridMove = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(50px); }
`;

const rotateBorder = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const scan = keyframes`
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// --- STYLED COMPONENTS ---

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  
  /* Futuristic Dark Void Background */
  background-color: #02020a;
  perspective: 1000px;
  font-family: 'Segoe UI', sans-serif;

  /* Moving 3D Grid Floor */
  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background-image: 
      linear-gradient(rgba(0, 195, 255, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 195, 255, 0.15) 1px, transparent 1px);
    background-size: 50px 50px;
    transform: rotateX(45deg);
    animation: ${gridMove} 2s linear infinite;
    z-index: 0;
    pointer-events: none;
  }
  
  /* Vignette overlay for depth */
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle, transparent 20%, #02020a 90%);
    pointer-events: none;
    z-index: 1;
  }
`;

const Header = styled.h2`
  margin: 0 0 40px 0;
  color: #fff;
  font-size: 3.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 10px;
  z-index: 2;
  position: relative;
  text-align: center;
  
  /* Text Glow */
  text-shadow: 
    0 0 10px rgba(0, 195, 255, 0.8),
    0 0 20px rgba(0, 195, 255, 0.5);

  /* Subtitle line */
  &::after {
    content: 'SECURE CONNECTION';
    display: block;
    font-size: 0.8rem;
    letter-spacing: 5px;
    color: #00c3ff;
    margin-top: 10px;
    opacity: 0.7;
  }
`;

/* New Container for Map to handle the "Scanning" overlay */
const MapContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 35vh;
  position: relative;
  margin-bottom: 50px;
  z-index: 2;
  border: 2px solid #00c3ff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 195, 255, 0.2);
  background: #000;

  /* Scanning Laser Bar */
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 5px;
    background: #00c3ff;
    box-shadow: 0 0 15px #00c3ff;
    z-index: 3;
    animation: ${scan} 3s ease-in-out infinite;
    pointer-events: none;
  }

  /* Scanline Mesh Overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 195, 255, 0.1) 3px
    );
    pointer-events: none;
    z-index: 2;
  }
`;

const Map = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  filter: grayscale(100%) contrast(1.2) brightness(0.8);
  transition: filter 0.5s ease;

  ${MapContainer}:hover & {
    filter: grayscale(0%) contrast(1) brightness(1);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
  padding: 40px;
  position: relative;
  z-index: 2;
  background: rgba(10, 10, 10, 0.9);
  border-radius: 20px;
  overflow: hidden;
  animation: ${float} 6s ease-in-out infinite;

  /* ANIMATED GLOWING BORDER TRICK */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      transparent, 
      #00c3ff, 
      transparent 30%
    );
    animation: ${rotateBorder} 4s linear infinite;
    z-index: -2;
  }

  /* Inner Background to hide center of gradient */
  &::after {
    content: '';
    position: absolute;
    inset: 3px; /* Border width */
    background: #080810;
    border-radius: 18px;
    z-index: -1;
  }
`;

const Input = styled.input`
  position: relative;
  margin-bottom: 25px;
  padding: 15px 20px;
  font-size: 16px;
  color: #fff;
  background: rgba(255, 255, 255, 0.03);
  border: none;
  border-bottom: 2px solid #333;
  outline: none;
  transition: all 0.3s ease;
  z-index: 2;
  border-radius: 5px 5px 0 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 1px;
  }

  &:focus {
    background: rgba(0, 195, 255, 0.05);
    border-bottom: 2px solid #00c3ff;
    box-shadow: 0 10px 20px -10px rgba(0, 195, 255, 0.2);
    letter-spacing: 1px;
  }
`;

const Textarea = styled.textarea`
  position: relative;
  margin-bottom: 30px;
  padding: 15px 20px;
  font-size: 16px;
  height: 120px;
  color: #fff;
  background: rgba(255, 255, 255, 0.03);
  border: none;
  border-bottom: 2px solid #333;
  outline: none;
  resize: vertical;
  transition: all 0.3s ease;
  z-index: 2;
  border-radius: 5px 5px 0 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 1px;
  }

  &:focus {
    background: rgba(0, 195, 255, 0.05);
    border-bottom: 2px solid #00c3ff;
    box-shadow: 0 10px 20px -10px rgba(0, 195, 255, 0.2);
    letter-spacing: 1px;
  }
`;

const Button = styled.button`
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #000;
  background: #00c3ff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0, 195, 255, 0.5);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: #fff;
    box-shadow: 0 0 30px rgba(0, 195, 255, 0.8);
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StatusMessage = styled.p`
  margin-top: 20px;
  text-align: center;
  color: #00c3ff;
  font-size: 0.9rem;
  letter-spacing: 1px;
  animation: ${float} 2s ease-in-out infinite;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/xnnanpzv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('Message Transmitted Successfully.');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setFormStatus('Transmission Failed.');
      }
    } catch (error) {
      setFormStatus('Transmission Failed.');
    }
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <Header className="header">Contact Us</Header>
        
        {/* Wrapped Map in Container for Visual Effects */}
        <MapContainer>
          <Map
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118106.71772255845!2d73.0906842504818!3d22.322081830793408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1720791919660!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></Map>
        </MapContainer>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Enter Message Data..."
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit">Initialize Send</Button>
          {formStatus && <StatusMessage>{formStatus}</StatusMessage>}
        </Form>
      </Wrapper>
    </>
  );
};

export default Contact;