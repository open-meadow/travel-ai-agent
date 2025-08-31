import { Container, Button, Card } from 'react-bootstrap'
import { useState } from 'react';

import TextSection from '../components/TextSection'
import ChatMessages from '../components/ChatMessages';

const Home = () => {
  // const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a friendly and helpful AI assistant. Keep all your answers short." },
    { role: "bot", content: "Hello! How can I help you?" }
  ]);

  const handleChat = async (input) => {
    console.log("handleChat got:", input);

    // Create local conversation with new user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages); // update UI immediately

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })  // use local copy, not stale state
      });

      const data = await res.json();
      console.log("server response:", data);

      const botReply = data.reply || "No response from server";

      // update state again with bot message
      setMessages(prev => [...prev, { role: "bot", content: botReply }]);
      setReply(botReply);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };



  return (
    <>
      <Container style={{ height: "90vh" }} className='border d-flex flex-column flex-wrap justify-content-between align-items-center'>
        <ChatMessages messages={messages}></ChatMessages>
        <TextSection handleChat={handleChat}></TextSection>
      </Container>
    </>
  )
}

export default Home