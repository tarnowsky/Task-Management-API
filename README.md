# Task Management API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-00A4CC?style=for-the-badge&logo=security&logoColor=white)
![Joi](https://img.shields.io/badge/Joi-FF9900?style=for-the-badge&logo=javascript&logoColor=white)

RESTful API for task management built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- User registration and login (username or email)
- Task management (CRUD operations)
- Task filtering by status and priority
- Secure password storage with bcrypt
- Input validation with Joi

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication method
- **bcrypt**: Password hashing
- **Joi**: Input validation

## Project Structure

```
task-management-api/
│
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── app.js           # Application entry point
│ 
├── .env                 # Environment variables
├── LICENSE              # The license file
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/task-management-api.git
  cd task-management-api
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Create a `.env` file in the root directory:
  ```
  MONGODB_URI=mongodb://localhost:27017/task_management_db
  JWT_SECRET=your_very_long_and_complex_secret_key_here
  JWT_EXPIRES_IN=1h
  PORT=3000
  ```

4. Start the development server:
  ```bash
  npm run dev
  ```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | Login a user |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/tasks` | Get all tasks for authenticated user |
| POST   | `/api/tasks` | Create a new task |
| PUT    | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Request & Response Examples

### Register a New User

**Request:**
```json
POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
   "id": "60f1a5c5c5b5e91234a56789",
   "username": "johndoe",
   "email": "john@example.com"
  }
}
```

### Create a New Task

**Request:**
```json
POST /api/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
{
  "title": "Complete project documentation",
  "description": "Write detailed README for the task management API",
  "priority": "high",
  "status": "in-progress"
}
```

**Response:**
```json
{
  "_id": "60f1b6d7e8f9a01234567890",
  "title": "Complete project documentation",
  "description": "Write detailed README for the task management API",
  "priority": "high",
  "status": "in-progress",
  "user": "60f1a5c5c5b5e91234a56789",
  "createdAt": "2023-07-16T12:30:15.123Z",
  "updatedAt": "2023-07-16T12:30:15.123Z"
}
```

## Security

- Passwords are hashed using bcrypt
- Authentication is handled via JWT
- Sensitive data is stored in environment variables
- Input validation prevents malicious data

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Resource created
- `400` - Bad request (validation error)
- `401` - Unauthorized (authentication error)
- `404` - Resource not found
- `500` - Server error

## License

MIT

## Author

Michal Tarnowski
