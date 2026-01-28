# Personal Blog — Backend API (Endterm Project)

This repository contains the **backend implementation** of the Personal Blog system developed as an **extension of the midterm project**.  
The backend provides a RESTful API for user authentication, blog posts, comments, and analytics using **Node.js, Express, and MongoDB**.


## Project Overview

The Personal Blog system allows users to:
- Register and authenticate using JWT
- Create, read, update, and delete blog posts
- Add and manage comments on posts
- Organize posts using tags
- View analytical data such as:
  - Top posts by number of comments
  - Most active users by comments count

The backend is designed following MongoDB best practices, using **embedded and referenced documents**, **advanced update/delete operations**, **aggregation pipelines**, and **compound indexes**.


## Technologies Used

- Node.js
- Express.js
- MongoDB (local or Atlas)
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- cors
- morgan


## Project Setup

### 1. Install dependencies
npm install

### 2. Environment variables

Create a .env file inside the backend folder with the following content:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/personal_blog
JWT_SECRET=endterm123
JWT_EXPIRES=7d


### 3. Run the server
npm run dev


If everything is correct, you will see:

MongoDB connected
Server running on http://localhost:5000

## Authentication (JWT)

Authentication is implemented using JSON Web Tokens.

### Endpoints:

- POST /auth/register — Register a new user

- POST /auth/login — Login and receive a JWT token

Protected routes require the following header:

- Authorization: Bearer <JWT_TOKEN>

### API Endpoints
- Posts
Method	Endpoint	Description
POST	/posts	Create a new post (auth required)
GET	/posts	Get all posts
GET	/posts/:id	Get post by ID
PUT	/posts/:id	Update post (author/admin only)
DELETE	/posts/:id	Delete post (author/admin only)
PUT	/posts/:id/tags	Add or remove tags (advanced update)

Advanced Update Example:

{ "action": "add", "tag": "MongoDB" }

{ "action": "remove", "tag": "MongoDB" }


Uses MongoDB operators: $addToSet, $pull.

- Comments
Method	Endpoint	Description
POST	/comments	Add comment to post (auth required)
GET	/comments/post/:postId	Get comments for a post
DELETE	/comments/:id	Delete comment (owner/admin)
DELETE	/comments/post/:postId	Delete all comments of a post (advanced delete)

Advanced Delete:
Uses MongoDB deleteMany().

- Analytics (Aggregation Pipelines)
Method	Endpoint	Description
GET	/analytics/top-posts	Top posts by number of comments
GET	/analytics/top-users	Most active users by comments

Analytics endpoints are read-only and use MongoDB aggregation:

- $lookup
- $group
- $sort
- $project

No request body is required for analytics endpoints.

## Database Design

### Collections:

- users
- posts
- comments

### Data Modeling:

- Embedded: tags inside posts
- Referenced: users and comments reference posts and users

### Indexes:

- Compound index on posts:

{ author_id: 1, createdAt: -1 }


- Compound index on comments:

{ post_id: 1, createdAt: -1 }


Indexes improve performance for frequently used queries.

### Testing

All endpoints were tested using Thunder Client / Postman:

- Authentication flow
- CRUD operations
- Protected routes
- Advanced MongoDB operations
- Aggregation endpoints

### Contribution

Student : Makhanbetiyar Begina

- Backend development
- REST API design
- MongoDB data modeling
- Authentication & authorization (JWT)
- Advanced update and delete operations
- Aggregation pipelines (analytics)
- Database indexing and optimization

## Status

-  Backend fully implemented
- All endterm backend requirements satisfied
- Ready for frontend integration