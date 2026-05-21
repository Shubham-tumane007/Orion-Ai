import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Hero from './Component/Hero';
import Who from './Component/Who';
import Works from './Component/Works';
import Contact from './Component/Contact';
import Visionai from './Component/Visionai';
import { Auth0Provider } from '@auth0/auth0-react';
import video from './img/bgvideo.mp4';

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  color: white;
  position: relative;
  z-index: 1;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

function App() {
  return (
    <Auth0Provider
      domain="dev-4k41s6rlzf126ekk.us.auth0.com"
      clientId="suHjOiXR6AttXVk2RduXeGYhe1MdCAmE"
      authorizationParams={{
        redirect_uri: window.location.origin + '/visionai'
      }}
    >
      <Router>
        <Routes>
          {/* Main App Route */}
          <Route path="/visionai" element={<Visionai />} />
          
          {/* Landing Page Routes with Background Video */}
          <Route
            path="/*"
            element={
              <Container>
                <BackgroundVideo autoPlay loop muted>
                  <source src={video} type="video/mp4" />
                </BackgroundVideo>
                <Routes>
                  <Route path="/" element={<Hero />} />
                  <Route path="/who" element={<Who />} />
                  <Route path="/works" element={<Works />} />
                  <Route path="/contact" element={<Contact/>} />
                </Routes>
              </Container>
            }
          />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;