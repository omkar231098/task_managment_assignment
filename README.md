# Task Manager API

This API provides endpoints to manage tasks for registered users. It includes authentication routes for user registration and login, as well as task-related routes for creating, retrieving, updating, and deleting tasks.

## Authentication Routes

### Register User
- **URL:** `/auth/register`
- **Method:** `POST`
- **Request Body:** JSON
  - `email` (string, required): User's email address
  - `password` (string, required): User's password
- **Response:**
  - `message`: Success or failure message
  - `user`: Registered user object (excluding password)
- **Status Codes:**
  - `200`: Successful registration
  - `409`: User already exists
  - `500`: Registration failed

### Login User
- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body:** JSON
  - `email` (string, required): User's email address
  - `password` (string, required): User's password
- **Response:**
  - `token`: JSON Web Token for authentication
  - `user`: Logged-in user object (excluding password)
  - `message`: Success or failure message
- **Status Codes:**
  - `200`: Successful login
  - `400`: Incorrect password or email not found
  - `500`: Login failed

## Task Routes

### Create Task
- **URL:** `/tasks`
- **Method:** `POST`
- **Authorization Header:** Bearer token (JWT)
- **Request Body:** JSON
  - `title` (string, required): Task title
  - `description` (string, required): Task description
  - `dueDate` (string, required): Due date of the task
  - `priority` (string, optional): Priority of the task (default: 'Medium')
  - `status` (string, optional): Status of the task (default: 'Incomplete')
- **Response:**
  - Created task object
- **Status Codes:**
  - `201`: Task created successfully
  - `400`: Invalid request body
  - `500`: Task creation failed

### Get All Tasks
- **URL:** `/tasks`
- **Method:** `GET`
- **Response:**
  - Array of task objects
- **Status Codes:**
  - `200`: Successful retrieval
  - `500`: Retrieval failed

### Get Task by ID
- **URL:** `/tasks/:id`
- **Method:** `GET`
- **Authorization Header:** Bearer token (JWT)
- **URL Parameters:** `id` (string, required): Task ID
- **Response:**
  - Task object
- **Status Codes:**
  - `200`: Successful retrieval
  - `404`: Task not found
  - `500`: Retrieval failed

### Update Task
- **URL:** `/tasks/:id`
- **Method:** `PATCH`
- **Authorization Header:** Bearer token (JWT)
- **URL Parameters:** `id` (string, required): Task ID
- **Request Body:** JSON (fields to update)
- **Response:**
  - Updated task object
- **Status Codes:**
  - `200`: Task updated successfully
  - `404`: Task not found
  - `500`: Update failed

### Delete Task
- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **Authorization Header:** Bearer token (JWT)
- **URL Parameters:** `id` (string, required): Task ID
- **Response:**
  - Success message with deleted task details
- **Status Codes:**
  - `200`: Task deleted successfully
  - `404`: Task not found
  - `500`: Deletion failed
