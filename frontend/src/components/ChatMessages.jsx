import ReactMarkdown from 'react-markdown';
import { Container, Button, Card } from 'react-bootstrap'

const ChatMessages = ({ messages }) => {
  console.log("messages: ", messages);
  // { maxHeight: "100vh", overflowY: "auto" }

  return (
    <Container>
      {messages
      .filter(msg => msg.role !== "system")
      .map((msg, idx) => (
        <Card
          key={idx}
          className={`my-2 p-2 ${msg.role === "user" ? "bg-secondary text-white ms-auto" : "bg-success text-white me-auto"}`}
          style={{ maxWidth: "60%" }}
        >
          <ReactMarkdown>
            {msg.content}
          </ReactMarkdown>
        </Card>
      ))}
    </Container>
  );
}

export default ChatMessages