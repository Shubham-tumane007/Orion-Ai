import React from 'react'
import styled from 'styled-components';
import Navbar from './Navbar';


const Section = styled.div`
  height: 100vh;
   scroll-snap-align: center;

`;
const Works = () => {
  return (
    <Section>
     <Navbar/>
      <h1>Work</h1>
    </Section>
  )
}

export default Works
