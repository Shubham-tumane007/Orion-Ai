import React, { useState } from 'react';
import styled from 'styled-components';
import './Contactus.css';
import Navbar from './Navbar';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  
`;

const Header = styled.h2`
  margin: 20px 0;
`;

const Map = styled.iframe`
  width: 100%;
  height: 40vh;
  border-radius: 0.9rem;
  border: 1px solid rgba(98, 98, 98, 0.1);
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 600px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  height: 100px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
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
        setFormStatus('Form submitted successfully!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setFormStatus('Form submission failed.');
      }
    } catch (error) {
      setFormStatus('Form submission failed.');
    }
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <Header className="header">Contact Us</Header>
        <Map
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118106.71772255845!2d73.0906842504818!3d22.322081830793408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1720791919660!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></Map>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit">Submit</Button>
        </Form>
        {formStatus && <p>{formStatus}</p>}
      </Wrapper>
    </>
  );
};

export default Contact;
