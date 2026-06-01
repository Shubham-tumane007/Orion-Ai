import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Icosahedron, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Send, Home, Bookmark, Rocket, MessageSquare } from "lucide-react";
import { supabase } from '../config/supabaseClient';
import { useAuth0 } from "@auth0/auth0-react";
import './visionai.css';

import gptImgLogo from '../img/robot2.png';
import userIcon from '../assets/user-icon.png';
import video from '../img/bgvideo.mp4';
import visionImage from '../img/1.png';

import { run } from '../config/geminiApi';
import DOMPurify from 'dompurify';

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
  opacity: 0.3;
`;

const CanvasBackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
`;

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={2.5} />
      <pointLight position={[-10, -10, -10]} color="#ec4899" intensity={2} />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Icosahedron args={[1.2, 3]} position={[4, 2, -3]}>
          <meshStandardMaterial color="#230a30" emissive="#8b5cf6" emissiveIntensity={0.4} wireframe />
        </Icosahedron>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[0.9, 64, 64]} position={[-3.5, -1.5, -4]}>
          <MeshDistortMaterial color="#1e1b4b" distort={0.5} speed={2} roughness={0.1} metalness={0.9} />
        </Sphere>
      </Float>

      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </>
  );
};

const formatResponse = (response) => {
  let formattedResponse = response
   .replace(/##\s*(.*)/g, "<h2>$1</h2>")
   .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
   .replace(/\*(.*?)\*/g, "<i>$1</i>")
   .replace(/^(\d+)\.\s(.*?)(\n|$)/gm, "<ol><li>$2</li></ol>")
   .replace(/^- (.*?)(\n|$)/gm, "<ul><li>$1</li></ul>")
   .replace(/\n/g, "<br>");

  return DOMPurify.sanitize(formattedResponse);
};

const VisionAI = () => {
  const { user, isAuthenticated } = useAuth0();
  const msgEnd = useRef(null);
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      if (isAuthenticated && user) {
        const { data, error } = await supabase
         .from('chats')
         .select('*')
         .eq('user_id', user.sub)
         .order('created_at', { ascending: true });

        if (error) {
          console.error("Error loading history:", error);
        } else if (data && data.length > 0) {
          setMessages(data);
        } else {
          setMessages([{ text: "Hi, I am <span class='gradient-text'>Orion AI</span>", isBot: true }]);
        }
      } else {
        setMessages([{ text: "Hi, I am <span class='gradient-text'>Orion AI</span>. Please log in to save chats.", isBot: true }]);
      }
    };
    loadHistory();
  }, [isAuthenticated, user]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveMessageToDB = async (text, isBot) => {
    if (isAuthenticated && user) {
      const { error } = await supabase
       .from('chats')
       .insert([{ text: text, isBot: isBot, user_id: user.sub }]);
      if (error) console.error("Error saving message:", error);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { text, isBot: false }]);
    saveMessageToDB(text, false);

    setInput("");
    setLoading(true);

    try {
      const response = await run(text);
      const formattedResponse = formatResponse(response);

      setMessages((prev) => [...prev, { text: formattedResponse, isBot: true }]);
      saveMessageToDB(formattedResponse, true);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "Sorry, I encountered an error.", isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter' &&!e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuery = async (query) => {
    setMessages((prev) => [...prev, { text: query, isBot: false }]);
    saveMessageToDB(query, false);
    setLoading(true);

    try {
      const response = await run(query);
      const formattedResponse = formatResponse(response);
      setMessages((prev) => [...prev, { text: formattedResponse, isBot: true }]);
      saveMessageToDB(formattedResponse, true);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error loading query.", isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async () => {
    if (isAuthenticated && user) {
      const confirmDelete = window.confirm("This will clear your entire chat history. Continue?");
      if (confirmDelete) {
        const { error } = await supabase.from('chats').delete().eq('user_id', user.sub);
        if (!error) setMessages([{ text: "Hi, I am <span class='gradient-text'>Orion AI</span>", isBot: true }]);
      }
    } else {
      setMessages([{ text: "Hi, I am <span class='gradient-text'>Orion AI</span>", isBot: true }]);
    }
  };

  return (
    <div className="App">
      <BackgroundVideo autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
      </BackgroundVideo>

      <CanvasBackgroundWrapper>
        <Canvas camera={{ position: [0, 0, 6] }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </CanvasBackgroundWrapper>

      <motion.div
        className="sideBar"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={visionImage} alt="Orion AI Logo" className="mainlogo" />
            <h1 className="brandName">Orion <span>AI</span></h1>
          </div>

          <motion.button
            className="midBtn"
            onClick={handleNewChat}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={20} />
            NEW CHAT
          </motion.button>

          <div className="upperSideBottom">
            <motion.button className="query" onClick={() => handleQuery("What is Programming?")} whileHover={{ x: 5 }}>
              <MessageSquare size={18} />
              What is Programming?
            </motion.button>
            <motion.button className="query" onClick={() => handleQuery("How to use an API?")} whileHover={{ x: 5 }}>
              <MessageSquare size={18} />
              How to use an API?
            </motion.button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems" onClick={() => navigate('/')}>
            <Home size={20} />
            Home
          </div>
          <div className="listItems" onClick={() => alert("History is now synced with Supabase Cloud!")}>
            <Bookmark size={20} />
            Saved
          </div>
          <div className="listItems" onClick={() => alert("Orion AI Pro: Coming Soon!")}>
            <Rocket size={20} />
            Upgrade to Pro
          </div>
        </div>
      </motion.div>

      <div className="main">
        <div className="chats">
          <AnimatePresence>
            {messages.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={message.isBot? "chat bot" : "chat"}
              >
                <img className='chatImg' src={message.isBot? gptImgLogo : userIcon} alt="" />
                <p className='txt' dangerouslySetInnerHTML={{ __html: message.text }} />
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div className='loader' initial={{opacity:0}} animate={{opacity:1}}>
              {[0,1,2].map(i => (
                <motion.div key={i} className="dot"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i*0.2 }}
                />
              ))}
            </motion.div>
          )}
          <div ref={msgEnd} />
        </div>

        <motion.div
          className="chatfooter"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="inp">
            <input
              type="text"
              placeholder='Ask Orion AI anything...'
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <motion.button className='send' onClick={handleSend} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Send size={22} />
            </motion.button>
          </div>
          <p>Orion AI may produce incorrect results. Verify important information.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default VisionAI;