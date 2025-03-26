# Task Manager

Task Manager is a web application to create personalised tasks , delete and mark as complete them.

## Table of Contents
- [Task Manager](#task-manager)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Configuration](#configuration)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Usage](#usage)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [API Endpoints](#api-endpoints)
    - [User Routes](#user-routes)
    - [Journal Routes](#journal-routes)
    - [Payment Routes](#payment-routes)
  - [Deployment](#deployment)
    - [Backend Deployment](#backend-deployment)
    - [Frontend Deployment](#frontend-deployment)
  - [UI](#ui)

## Features
- User authentication (JWT-based login/register)
- Create, update, delete tasks 
- Secure user data storage with MongoDB

## Tech Stack
- **Frontend:** React.js, Tailwind CSS , JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Vercel (Frontend), Render (Backend)

## Installation
### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/vishal-tiwari-1971/task-manager
   cd task-manager
   ```
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Configuration
### Backend
1. Create a `.env` file in the `backend` directory and add the following:
   ```properties
   PORT=5000
   MONGO_URL=mongodb_connection_string
   SECRET=jwt_secret
   FRONTEND_URL=http://localhost:3000
   ```

### Frontend
1. Create a `.env` file in the `frontend` directory and add the following:
   ```properties
   REACT_APP_API_URL=http://localhost:5000
   ```

## Usage
### Backend
1. Start the server:
   ```sh
   npm start
   ```
2. For development mode:
   ```sh
   npm run dev
   ```
3. The backend server will run at `http://localhost:5000`

### Frontend
1. Start the React app:
   ```sh
   npm start
   ```
2. The frontend will be available at `http://localhost:3000`

## API Endpoints
### User Routes
- `POST /user/signup` - Register a new user
- `POST /user/login` - Login a user


### Task Routes
- `GET /task/getUserTask` - Get all task of a user (requires authentication)
- `POST /task/create` - Create a new task (requires authentication)
- `PUT  /task/edit/:id` - Edit a existing task (requires authentication)
- `DELETE /task/:id` - Delete a task (requires authentication)


## Deployment
### Backend Deployment
1. Deploy on [Render](https://render.com/):
   - Create a new web service on Render and link your repository.
   - Set environment variables in Render.

### Frontend Deployment
1. Deploy on [Vercel](https://vercel.com/):
   - Push your frontend code to GitHub.
   - Import the repository into Vercel.
   - Set the `REACT_APP_API_URL` environment variable in Vercel settings.

## UI
![Home Page](./frontend/src/assets/Screenshot%202025-03-26%20222943.png)

![Signup Page](./frontend/src/assets/Screenshot%202025-03-26%20222855.png)

![Login Page](./frontend/src/assets/Screenshot%202025-03-26%20222848.png)

![Task Page](./frontend/src/assets/Screenshot%202025-03-26%20222744.png)

![Edit Task](./frontend/src/assets/Screenshot%202025-03-26%20222803.png)

![Task](./frontend/src/assets/Screenshot%202025-03-26%20230400.png)
