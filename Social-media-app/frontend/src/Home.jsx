import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect (() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try{
      const response = await fetch("https://minorproject7.onrender.com/api/posts/all");
      const data = await response.json();
      setPosts(data);
    }catch(error){
      console.log(error)
    }
  };

  const deletePost = async (id)=>{
    try{
      const user = JSON.parse(localStorage.getItem("user"));
      const response= await fetch(`https://minorproject7.onrender.com/api/posts/delete/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"},
          body:JSON.stringify({user:user._id})
      });
      const data = await response.json();
      alert(data.message);

      fetchPosts();
    }catch(error){
      console.log(error);
      alert('server error');
    }
  }

  const likePost = async (id) =>{
    try{
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`http://localhost:3000/api/posts/like/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({user:user._id})
      })
      const data = await response.json();
      alert(data.message);
      fetchPosts();
    }catch(error){
      console.log(error);
      alert("server error");
    }
  }
  return (
    <Container className="mt-4">
      <h2>All Posts</h2>
    {posts.map((post) =>(

    <Card key={post._id} className="mb-3">
      <Card.Body>
        <Card.Title>{post.user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{post.user?.email}</Card.Subtitle>
        <Card.Text>
          {post.description}
        </Card.Text>
        <p>Likes:{post.likes.length}</p>
        
        <Button variant="primary" onClick={() => likePost(post._id)}>Like({post.likes.length})</Button>

        <Button variant="danger" onClick={() => deletePost(post._id)}>Delete</Button>
      </Card.Body>
    </Card>
    ))}
    </Container>
  );
}

export default Home;