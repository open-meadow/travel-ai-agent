import { Container, Spinner } from 'react-bootstrap'
import { useState } from 'react';

import TextSection from '../components/TextSection'
import ChatMessages from '../components/ChatMessages';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a friendly and helpful AI assistant. Keep all your answers short." },
    { role: "bot", content: "Hello! How can I help you?" }
  ]);

  const handleChat = async (input) => {
    const newMessages = [...messages, { role: "user", content: input }];
    setLoading(true)
    setMessages(newMessages);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await res.json();
      const botReply = data.reply || "No response from server";

      setMessages(prev => [...prev, { role: "bot", content: botReply }]);
      setLoading(false)

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <>
      <Container style={{ height: "90vh" }} className='border d-flex flex-column justify-content-between align-items-center'>
        <ChatMessages messages={messages}></ChatMessages>
        {loading && 
          <Container className='my-2'>
            <Spinner animation='border' role='status' size='sm' />
            <span className='ms-2'>Thinking...</span>
          </Container>
        }
        <TextSection className="mb-5" handleChat={handleChat}></TextSection>
      </Container>
    </>
  )
}

export default Home