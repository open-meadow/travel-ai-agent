import { Container, Button, Card } from 'react-bootstrap'
import { useState } from 'react';

import TextSection from '../components/TextSection'

function ChatMessages({ messages }) {
  return (
    <Container style={{ maxHeight: "400px", overflowY: "auto" }}>
      {messages.map((msg, idx) => (
        <Card
          key={idx}
          className={`my-2 p-2 ${msg.sender === "user" ? "bg-primary text-white ms-auto" : "bg-light text-dark me-auto"}`}
          style={{ maxWidth: "60%" }}
        >
          {msg.text}
        </Card>
      ))}
    </Container>
  );
}


const Home = () => {
    const [reply, setReply] = useState("")
    const [loading, setLoading] = useState(false)

    const messages = [
        {sender: "user", text: "Hello!"},
        {sender: "bot", text: "Hi, how can I help?"}
    ]

    const handleChat = async () => {
      fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Why is the sky blue? Keep your answer short" })
        })
        .then(res => res.json())
        .then(data => {
            setReply(data.reply || "No response from server");   // <-- now it's safe
        })
        .catch(err => console.error("Fetch error:", err));

    };


    return(
        <>
            <Container style={{height: "90vh"}} className='border border-danger d-flex flex-column flex-wrap justify-content-between align-items-center'>
                <Container className='border border-danger d-flex flex-column flex-wrap justify-content-between align-items-center'>
                    <Container>Hello World</Container>
                </Container>
                <ChatMessages messages={messages}></ChatMessages>
                {/* <Container>{reply}</Container> */}
                <TextSection handleChat={handleChat}></TextSection>
            </Container>
        </>
    )
}

export default Home