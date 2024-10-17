// frontend/src/components/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Send the message to the backend and get the response
  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);

      try {
        const response = await axios.post('http://localhost:4000/api/chatbot', { message: input });
        const botMessage = { sender: 'bot', text: response.data.response };

        setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
      } catch (error) {
        console.error("Error communicating with backend API:", error);
      }

      setInput('');
    }
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={message.sender}>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
