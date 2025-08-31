import { Container, Button, Card } from 'react-bootstrap'

const ChatMessages = ({ messages }) => {
  console.log("messages: ", messages);
  // { maxHeight: "100vh", overflowY: "auto" }

  return (
    <Container className='border'>
      {messages
      .filter(msg => msg.role !== "system")
      .map((msg, idx) => (
        <Card
          key={idx}
          className={`my-2 p-2 ${msg.role === "user" ? "bg-primary text-white ms-auto" : "bg-light text-dark me-auto"}`}
          style={{ maxWidth: "60%" }}
        >
          {msg.content}
        </Card>
      ))}
    </Container>
  );
}

export default ChatMessages