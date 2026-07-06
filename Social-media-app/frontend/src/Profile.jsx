import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect (() =>{
    fetchUser();
  }, [] );

  const fetchUser = async () => {
    try{
      const response = await fetch(`https://minorproject7.onrender.com/api/auth/${storedUser._id}`);
      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
    }catch(error){
      console.log(error);
      alert("server error");
    }
  }

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://minorproject7.onrender.com/api/auth/update/${storedUser._id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email})
      });

      const data = await response.json();
      alert(data.message);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>My Profile</Card.Title>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">Update Profile</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;