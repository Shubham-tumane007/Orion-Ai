import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../config/supabaseClient'; // Import Supabase
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 for User ID
import './visionai.css';

// Assets
import addbtn from '../assets/add-30.png';
import msgIcon from '../assets/message.svg';
import home from '../assets/home.svg';
import saved from '../assets/bookmark.svg';
import rocket from '../assets/rocket.svg';
import sendBtn from '../assets/send.svg';
import userIcon from '../assets/user-icon.png';
import gptImgLogo from '../img/robot2.png';
import video from '../img/bgvideo.mp4';
import visionImage from '../img/1.png';

// API & Security
import { run } from '../config/geminiApi';
import DOMPurify from 'dompurify';

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

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

  // 1. DATABASE: Load chat history from Supabase on start
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
          setMessages([{ text: "Hi, I am Vision AI", isBot: true }]);
        }
      } else {
        // Fallback for non-authenticated users
        setMessages([{ text: "Hi, I am Orion AI. Please log in to save chats.", isBot: true }]);
      }
    };
    loadHistory();
  }, [isAuthenticated, user]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 2. DATABASE: Helper function to save message
  const saveMessageToDB = async (text, isBot) => {
    if (isAuthenticated && user) {
      const { error } = await supabase
        .from('chats')
        .insert([{ 
            text: text, 
            isBot: isBot, 
            user_id: user.sub 
        }]);
      if (error) console.error("Error saving message:", error);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    // Add User Message to UI and DB
    setMessages((prev) => [...prev, { text, isBot: false }]);
    saveMessageToDB(text, false);
    
    setInput("");
    setLoading(true);

    try {
      const response = await run(text);
      const formattedResponse = formatResponse(response);
      
      // Add Bot Message to UI and DB
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
    if (e.key === 'Enter' && !e.shiftKey) {
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

  // 3. DATABASE: Clear history for current user
  const handleNewChat = async () => {
    if (isAuthenticated && user) {
      const confirmDelete = window.confirm("This will clear your entire chat history. Continue?");
      if (confirmDelete) {
        const { error } = await supabase
          .from('chats')
          .delete()
          .eq('user_id', user.sub);

        if (!error) {
          setMessages([{ text: "Hi, I am Vision AI", isBot: true }]);
        }
      }
    } else {
        setMessages([{ text: "Hi, I am Vision AI", isBot: true }]);
    }
  };

  return (
    <div className="App">
      <BackgroundVideo autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </BackgroundVideo>

      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={visionImage} alt="Vision AI Logo" className="mainlogo" />
          </div>
          <button className="midBtn" onClick={handleNewChat}>
            <img src={addbtn} alt="Add Button" className="addBtn" />
            NEW CHAT
          </button>
          <div className="upperSideBottom">
            <button className="query" onClick={() => handleQuery("What is Programming?")}>
              <img src={msgIcon} alt="Query Icon" />
              What is Programming?
            </button>
            <button className="query" onClick={() => handleQuery("How to use an API?")}>
              <img src={msgIcon} alt="Query Icon" />
              How to use an API?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems" onClick={() => navigate('/')}>
            <img src={home} alt="Home" className="listItemImg" />
            Home
          </div>
          <div className="listItems" onClick={() => alert("History is now synced with Supabase Cloud!")}>
            <img src={saved} alt="Bookmark" className="listItemImg" />
            Saved
          </div>
          <div className="listItems" onClick={() => alert("Vision AI Pro: Coming Soon!")}>
            <img src={rocket} alt="Upgrade" className="listItemImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img className='chatImg' src={message.isBot ? gptImgLogo : userIcon} alt="" />
              <p className='txt' dangerouslySetInnerHTML={{ __html: message.text }} />
            </div>
          ))}
          {loading && (
            <div className='loader'>
              <hr /><hr /><hr />
            </div>
          )}
          <div ref={msgEnd} />
        </div>

        <div className="chatfooter">
          <div className="inp">
            <input
              type="text"
              placeholder='Ask me anything...'
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className='send' onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>Vision AI may produce incorrect results or inappropriate information</p>
        </div>
      </div>
    </div>
  );
};

export default VisionAI;