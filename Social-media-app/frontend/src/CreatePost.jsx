import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreatePost() {
    const [description, setDescription] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(!description.trim()){
            alert("Please enter a post");
            return;
        }

        try{
            const response = await fetch("http://localhost:3000/api/posts/create",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({user:user._id, description})
            })

            const data = await response.json();
            alert(data.message);
            if(response.ok){
                setDescription("");
                navigate("/");
            }
        }catch(error){
            console.log(error);
            alert("server error");
        }
    }
  return (
    <Container className="mt-5">
        <h2>Create Post</h2>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={4} placeholder="Create a post" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </Form.Group>

      <Button type="submit" variant="primary">Create Post</Button>
    </Form>
    </Container>
  );
}

export default CreatePost;