# Full Stack Social Media App

## Project Overview

This is a full stack social media application built using React, Node.js, Express.js, and MongoDB. Users can register, login, create posts, like posts, delete their own posts, and manage their profile.

## Features

- User Registration
- User Login
- Protected Routes
- Create Posts
- View All Posts
- Like/Unlike Posts
- Delete Own Posts
- Update User Profile
- MongoDB Database Integration
- Responsive UI using Bootstrap

## Technologies Used

### Frontend
- React.js
- React Router DOM
- Bootstrap
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- dotenv
- cors

## Project Structure

```
Social-media-app/
│
├── frontend/
│
├── backend/
│
└── README.md
```

## Setup Instructions

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the backend folder.

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

## API Endpoints

### Authentication

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/:id
- PUT /api/auth/update/:id

### Posts

- POST /api/posts/create
- GET /api/posts/all
- GET /api/posts/:id
- PUT /api/posts/update/:id
- PUT /api/posts/like/:id
- DELETE /api/posts/delete/:id

## Author
Ayesha Khanum B.Sc. (PMCS)
