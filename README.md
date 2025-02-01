# User CRUD Application (MERN Stack)

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that allows users to perform CRUD (Create, Read, Update, Delete) operations. The application is containerized using Docker and deployed using Kubernetes.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Prerequisites](#prerequisites)
4. [Setup and Installation](#setup-and-installation)
   - [Frontend](#frontend)
   - [Backend](#backend)
   - [Docker and Kubernetes](#docker-and-kubernetes)
5. [Running the Application](#running-the-application)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features
- **User Management**: Perform CRUD operations on user data.
- **Frontend**: Built with Next.js, React, and TailwindCSS for a responsive and modern UI.
- **Backend**: RESTful API built with Express.js and MongoDB for data storage.
- **Validation**: Input validation using Zod (frontend) and Joi (backend).
- **State Management**: React Query for efficient data fetching and caching.
- **Containerization**: Dockerized for easy deployment.
- **Orchestration**: Managed using Kubernetes for scalability and reliability.

---

## Technologies Used

### Frontend
- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for making API requests.
- **React Hook Form**: Library for form management and validation.
- **Zod**: Schema validation for form inputs.
- **React Query**: Data fetching and state management.
- **React Select**: Dropdown component for user input.

### Backend
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Joi**: Schema validation for API requests.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **TypeScript**: Adds static typing to JavaScript for better development experience.

### DevOps
- **Docker**: Containerization for consistent deployment.
- **Kubernetes**: Orchestration for managing containers.
- **Nodemon**: Automatically restarts the server during development.
- **Concurrently**: Runs multiple commands concurrently.

---

## Prerequisites
Before running the application, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (or MongoDB Atlas for cloud-based database)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/) (optional, for deployment)
- [Git](https://git-scm.com/)

---

## Setup and Installation

### Frontend
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/homosapian1999/UserCrud-Frontend.git
   cd UserCrud-Frontend

2. Install dependencies:
   ```bash
   npm install
3. Create a .env.local file in the root directory and add the following environment variables:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
4. Start the development server:
   ```bash
   npm run dev
The frontend will be available at http://localhost:3000.

### Backend

1. Clone the backend repository:
   ```bash
   git clone https://github.com/homosapian1999/UserCRUD-backend.git
   cd UserCRUD-backend

2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the root directory and add the following environment variables:
    ```bash
    PORT=8080
    MONGO_URI=mongodb://localhost:27017/usercrud
4. Start the development server:
   ```bash
   npm run dev
The backend will be available at http://localhost:8080.

### Docker and Kubernetes

1. Build Docker Images:
   Frontend
   ```bash
   docker build -t homosapian1999/frontend:latest .

  Backend
  ```bash
  docker build -t homosapian1999/backend:latest .
  ```
2. Push Docker Images
   Frontend
   ```
   docker push homosapian1999/frontend:latest
   ```
   Backend
   ```
   docker push homosapian1999/backend:latest
   ```
3. Deploy to Kubernetes
   ```
   kubectl apply -f frontend-deployment.yaml
   kubectl apply -f backend-deployment.yaml
   ```

### Running the Application

1. Run the backend server:
   ```
   cd UserCRUD-backend
   npm run dev
   ```
2. Run the frontend server:
   ```
   cd UserCrud-Frontend
   npm run dev
   ```

### Deployment

The application is containerized using Docker and can be deployed to any Kubernetes cluster. Follow the steps in the Docker and Kubernetes section for deployment.

 
