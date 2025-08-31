import { InputGroup, Form, Button } from "react-bootstrap"

const TextSection = ({ handleChat }) => {
    return(
    <>
        <InputGroup className="mb-3">
            <Form.Control
                placeholder="Write something here"
                aria-label="chat"
                aria-describedby="chat"
            />
            <Button onClick={handleChat}>Click me</Button>
            
        </InputGroup>
    </>)
}

export default TextSection