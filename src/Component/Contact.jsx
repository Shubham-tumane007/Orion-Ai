import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const gridMove = `
0% { transform: translateY(0); }
100% { transform: translateY(50px); }
`;

const rotateBorder = `
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`;

const Wrapper = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 100vh;
padding: 60px 20px;
position: relative;
overflow: hidden;
background: #0a0a1a;
perspective: 1200px;
font-family: 'Inter', sans-serif;

&::before {
content: '';
position: absolute;
width: 200%;
height: 200%;
top: -50%;
left: -50%;
background-image:
linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
background-size: 50px 50px;
transform: rotateX(50deg);
animation: ${gridMove} 3s linear infinite;
z-index: 0;
}

&::after {
content: '';
position: absolute;
top: 0; left: 0; right: 0; bottom: 0;
background: radial-gradient(circle at center, transparent 20%, #0a0a1a 90%);
pointer-events: none;
z-index: 1;
}
`;

const Header = styled(motion.h2)`
margin: 0 0 10px 0;
color: #fff;
font-size: 3.5rem;
font-weight: 800;
text-transform: uppercase;
letter-spacing: 8px;
z-index: 2;
position: relative;
text-align: center;
background: linear-gradient(90deg, #8b5cf6, #a78bfa, #c084fc);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
`;

const Subtitle = styled(motion.p)`
font-size: 0.8rem;
letter-spacing: 4px;
color: #a78bfa;
margin-bottom: 40px;
opacity: 0.8;
z-index: 2;
text-transform: uppercase;
font-weight: 600;
text-align: center;
`;

const Form = styled(motion.form)`
display: flex;
flex-direction: column;
width: 95%;
max-width: 500px;
padding: 45px 40px;
position: relative;
z-index: 2;
border-radius: 24px;
overflow: hidden;
background: rgba(15, 10, 40, 0.6);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(139, 92, 246, 0.2);
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

&::before {
content: '';
position: absolute;
top: -50%;
left: -50%;
width: 200%;
height: 200%;
background: conic-gradient(transparent, #8b5cf6, transparent 40%);
animation: ${rotateBorder} 8s linear infinite;
z-index: -2;
}

&::after {
content: '';
position: absolute;
inset: 1px;
background: rgba(10, 10, 26, 0.85);
border-radius: 23px;
z-index: -1;
}
`;

const Input = styled.input`
width: 100%;
padding: 16px 20px;
font-size: 15px;
color: #fff;
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(139, 92, 246, 0.2);
border-radius: 12px;
outline: none;
margin-bottom: 20px;
transition: all 0.3s ease;

&::placeholder {
color: rgba(255, 255, 255, 0.3);
}

&:focus {
background: rgba(139, 92, 246, 0.08);
border-color: rgba(139, 92, 246, 0.6);
box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
}
`;

const Textarea = styled.textarea`
width: 100%;
padding: 16px 20px;
font-size: 15px;
height: 130px;
color: #fff;
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(139, 92, 246, 0.2);
border-radius: 12px;
outline: none;
resize: none;
margin-bottom: 20px;
transition: all 0.3s ease;

&::placeholder {
color: rgba(255, 255, 255, 0.3);
}

&:focus {
background: rgba(139, 92, 246, 0.08);
border-color: rgba(139, 92, 246, 0.6);
box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
}
`;

const Button = styled(motion.button)`
padding: 16px;
font-size: 15px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 2px;
color: #fff;
background: linear-gradient(90deg, #8b5cf6, #a855f7);
border: none;
border-radius: 12px;
cursor: pointer;
box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
`;

const StatusMessage = styled.p`
margin-top: 20px;
text-align: center;
color: #a78bfa;
font-size: 0.9rem;
letter-spacing: 1px;
`;

const Contact = () => {
const [formData, setFormData] = useState({ name: '', email: '', message: '' });
const [formStatus, setFormStatus] = useState('');

const handleChange = (e) => {
const { name, value } = e.target;
setFormData({...formData, [name]: value });
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await fetch('https://formspree.io/f/xnnanpzv', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(formData)
});

if (response.ok) {
setFormStatus('Message Sent Successfully');
setFormData({ name: '', email: '', message: '' });
} else {
setFormStatus('Failed to Send');
}
} catch (error) {
setFormStatus('Failed to Send');
}
};

return (
<>
<Navbar />
<Wrapper>
<Header
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
>
Contact Us
</Header>
<Subtitle
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.2, duration: 0.6 }}
>
Let's Build Something Amazing
</Subtitle>

<Form
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ delay: 0.4, duration: 0.6 }}
onSubmit={handleSubmit}
>
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
placeholder="Your Message..."
value={formData.message}
onChange={handleChange}
required
/>
<Button
whileHover={{ scale: 1.02, boxShadow: '0 10px 35px rgba(139, 92, 246, 0.6)' }}
whileTap={{ scale: 0.98 }}
type="submit"
>
Send Message
</Button>
{formStatus && <StatusMessage>{formStatus}</StatusMessage>}
</Form>
</Wrapper>
</>
);
};

export default Contact;