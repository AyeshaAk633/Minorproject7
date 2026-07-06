import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import React from "react";
import Home from "./Home";
import Login from "./login";
import Register from "./Register";
import Navigation from "./Navbar";
import CreatePost from "./CreatePost";
import ProtectedRoute from "./protectRoute";
import Profile from "./Profile";

function App(){
    return(
        <BrowserRouter>
        <Navigation />
        <Routes>
            <Route path="/" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            }
            />
            <Route path="/create" element={
                <ProtectedRoute>
                    <CreatePost />
                </ProtectedRoute>
            }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            }
            />
        </Routes>
        </BrowserRouter>
    )
}
export default App;