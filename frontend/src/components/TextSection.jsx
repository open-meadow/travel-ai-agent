import { InputGroup, Form, Button } from "react-bootstrap";
import { useState } from 'react';

const TextSection = ({ handleChat }) => {
    const [input, setInput] = useState("");

    const sendMessage = () => {
        console.log("i'm here - textSection: ", input)
        if(input.trim() == "") return;
        handleChat(input)
        setInput("")
    }

    return(
    <>
        <InputGroup className="mb-3">
            <Form.Control
                placeholder="Write something here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === "Enter") sendMessage();
                }}
            />
            <Button onClick={sendMessage}>Send</Button>
            
        </InputGroup>
    </>)
}

export default TextSection