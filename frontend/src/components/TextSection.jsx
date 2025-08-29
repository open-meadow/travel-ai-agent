import { InputGroup, Form } from "react-bootstrap"

const TextSection = () => {
    return(
    <>
        <InputGroup className="mb-3">
            <Form.Control
                placeholder="Write something here"
                aria-label="chat"
                aria-describedby="chat"
            />
        </InputGroup>
    </>)
}

export default TextSection