import React, { useState } from 'react';
import './ChatBot.scss';
import { FaComments, FaTimes } from 'react-icons/fa';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <>
          <div className="chatbot-header">
            <span>Chat with us</span>
            <button onClick={toggleChat} className="close-button">
              <FaTimes />
            </button>
          </div>
          <iframe
            src="https://app.thinkstack.ai/bot/index.html?chatbot_id=67fe12a27c7ebf21c5b0bd32&type=inline"
            frameBorder="0"
            width="100%"
            height="100%"
            style={{ minHeight: "500px" }}
          />
        </>
      ) : (
        <button onClick={toggleChat} className="chat-toggle-button">
          <FaComments />
          <span>Chat with us</span>
        </button>
      )}
    </div>
  );
};

export default ChatBot; 