import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components'; 
import './visionai.css'; 
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
import { run } from '../config/geminiApi';
import DOMPurify from 'dompurify';

// Styled component for the background video
const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

// Function to format the response text
const formatResponse = (response) => {
  let formattedResponse = response
    .replace(/##\s*(.*)/g, "<h2>$1</h2>")            // Convert `## Heading` to `<h2>Heading</h2>`
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")          // Convert `**text**` to `<b>text</b>`
    .replace(/\*(.*?)\*/g, "<i>$1</i>")              // Convert `*text*` to `<i>text</i>`
    .replace(/^(\d+)\.\s(.*?)(\n|$)/gm, "<ol><li>$2</li></ol>") // Convert numbered lists
    .replace(/^- (.*?)(\n|$)/gm, "<ul><li>$1</li></ul>") // Convert unordered lists with dashes
    .replace(/\n/g, "<br>");                         // Convert newlines to `<br>`

  return DOMPurify.sanitize(formattedResponse);      // Sanitize the HTML output using dompurify
};

const VisionAI = () => {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ text: "Hi, I am Vision AI", isBot: true }]);
  const [loading, setLoading] = useState(false);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages([...messages, { text, isBot: false }]);
    setInput("");
    setLoading(true);

    try {
      const response = await run(text);
      const formattedResponse = formatResponse(response);
      setMessages((prevMessages) => [...prevMessages, { text: formattedResponse, isBot: true }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Sorry, something went wrong.", isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  // Handle pressing 'Enter' to send the message
  const handleEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle sending predefined queries
  const handleQuery = async (query) => {
    setMessages([...messages, { text: query, isBot: false }]);
    setLoading(true);

    try {
      const response = await run(query);
      const formattedResponse = formatResponse(response);
      setMessages((prevMessages) => [...prevMessages, { text: formattedResponse, isBot: true }]);
    } catch (error) {
      console.error("Error sending query:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Sorry, something went wrong.", isBot: true }]);
    } finally {
      setLoading(false);
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
          <button className="midBtn" onClick={() => setMessages([{ text: "Hi, I am Vision AI", isBot: true }])}>
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
          <div className="listItems">
            <img src={home} alt="Home" className="listItemImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="Bookmark" className="listItemImg" />
            Saved
          </div>
          <div className="listItems">
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
