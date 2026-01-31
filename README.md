# Personal Blog System — Endterm Project (Advanced Databases / NoSQL)

This repository contains the **full-stack implementation** of the Personal Blog system developed as an **endterm project** for the course *Advanced Databases (NoSQL)*.

The project consists of:
- **Backend** — RESTful API built with Node.js, Express, and MongoDB
- **Frontend** — React-based web application for user interaction

The system is an extension of the **midterm Personal Blog project**, which focused on database modeling and theoretical design.  
The endterm project emphasizes **practical implementation**, **advanced MongoDB operations**, and **full-stack integration**.


## Project Overview

The Personal Blog System allows users to:
- Register and authenticate using JWT
- Create, view, update, and delete blog posts
- Add and manage comments on posts
- Organize posts using tags
- View analytical data such as:
  - Top posts by number of comments
  - Most active users by comment count
- Manage their user profile

The system follows NoSQL best practices, including:
- Embedded and referenced data models
- Advanced update and delete operations
- Multi-stage aggregation pipelines
- Compound indexes for query optimization


## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (local or Atlas)
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- cors
- morgan

### Frontend
- React.js
- Vite
- React Router
- Axios
- JavaScript (ES6+)
- CSS


## Project Structure
personal-blog-endterm/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── package.json
│ └── README.md
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── assets/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── public/
│ ├── package.json
│ ├── vite.config.js
│ └── README.md
│
└── README.md



## Backend Setup

### 1. Install dependencies
cd backend
npm install
### 2. Environment variables
Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/personal_blog
JWT_SECRET=endterm123
JWT_EXPIRES=7d

### 3. Run backend server
npm run dev

If everything is correct, you will see:

MongoDB connected
Server running on http://localhost:5000

## Frontend Setup
### 1. Install dependencies
cd frontend
npm install

### 2. Run frontend application
npm run dev


The frontend will be available at:

http://localhost:5173


Make sure the backend server is running before using the frontend.

## Authentication (JWT)

Authentication is implemented using JSON Web Tokens.

### Endpoints:

- POST /auth/register — Register a new user
- POST /auth/login — Login and receive a JWT token
- GET /auth/me — Get authenticated user profile (protected)

Protected routes require the following header:

Authorization: Bearer <JWT_TOKEN>

## REST API Endpoints

### Posts

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /posts | Create a new post (auth required) |
| GET | /posts | Get all posts |
| GET | /posts/:id | Get post by ID |
| PUT | /posts/:id | Update post (author/admin only) |
| DELETE | /posts/:id | Delete post (author/admin only) |
| PUT | /posts/:id/tags | Add or remove tags (advanced update) |

Advanced update example:

{ "action": "add", "tag": "MongoDB" }

{ "action": "remove", "tag": "MongoDB" }


Uses MongoDB operators: $addToSet, $pull.

### Comments

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /comments | Add comment to post (auth required) |
| GET | /comments/post/:postId | Get comments for a post |
| DELETE | /comments/:id | Delete comment (owner/admin) |
| DELETE | /comments/post/:postId | Delete all comments for a post (advanced delete) |

Advanced delete uses MongoDB `deleteMany()`.


### Analytics (Aggregation Pipelines)

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /analytics/top-posts | Top posts by number of comments |
| GET | /analytics/top-users | Most active users by comments |


Analytics endpoints use MongoDB aggregation stages:

- $lookup
- $group
- $sort
- $project

## Database Design
### Collections
- users
- posts
- comments

### Data Modeling
- Embedded: tags inside posts  
- Referenced: posts and comments reference users

### Indexes
- Compound index on posts: { author_id: 1, createdAt: -1 }
- Compound index on comments: { post_id: 1, createdAt: -1 }

Indexes improve performance for frequently used queries.

## Frontend Pages

| Page | Description |
|------|------------|
| Home | View all posts |
| Register | User registration |
| Login | User authentication |
| Create Post | Create a new post (protected) |
| Post Details | View post and comments |
| Profile | User profile |
| Top | Analytics page |


## Testing
- The project was tested using:
- Thunder Client / Postman for backend API
- Browser-based frontend testing
- Authentication and protected routes
- CRUD operations
- Advanced MongoDB updates and deletes
- Aggregation endpoints

## Contribution

This project was developed as a team project with clearly divided responsibilities.

- **Backend Development** — Makhanbetiyar Begina  
  - REST API design and implementation  
  - MongoDB data modeling and integration  
  - Authentication and authorization using JWT  
  - Advanced update and delete operations  
  - Aggregation pipelines and analytics endpoints  
  - Database indexing and performance optimization  

- **Frontend Development** — Bagitzhan Perizat  
  - User interface development using React  
  - Integration with backend REST API  
  - Authentication flow and protected routes  
  - Pages for posts, comments, analytics, and user profile  
  - Frontend routing and navigation  
  - UI styling and usability  

## Status
- Backend fully implemented
- Frontend fully implemented
- All endterm project requirements satisfied
- Ready for defense and demonstration
