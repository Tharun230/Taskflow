# TaskFlow — Real-Time Collaborative Kanban Board

TaskFlow is a full-stack MERN application for managing projects on Kanban-style boards. Users can register, create boards, add tasks to columns, and drag tasks between columns — with changes syncing **live** across every open tab/browser via Socket.IO.

**Live demo:** _add your deployed link here_
**Video walkthrough:** _add a 60–90s Loom/YouTube link here — recruiters love this_

## Why this project

This project was built to demonstrate core full-stack skills that employers screen for in junior developer roles:

- REST API design with proper auth (JWT), authorization checks, and error handling
- NoSQL schema design (MongoDB/Mongoose) with relationships between Users, Boards, and Tasks
- React state management, protected routes, and context-based auth
- Real-time features with WebSockets (Socket.IO) — a step beyond basic CRUD apps
- Drag-and-drop UX (`@hello-pangea/dnd`)
- Clean project structure or MVC-style separation on the backend

## Features

- 🔐 User registration & login with hashed passwords and JWT sessions
- 🗂️ Create, rename, and delete boards
- 🧩 Three default columns (To Do / In Progress / Done) per board
- ✅ Create, edit, and delete tasks with title, description, and priority
- 🖱️ Drag and drop tasks between columns, persisted to the database
- ⚡ Real-time sync — open the same board in two tabs and watch changes appear instantly
- 📱 Responsive UI built with Tailwind CSS

## Tech stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 18, Vite, React Router, Tailwind CSS, Socket.IO client, @hello-pangea/dnd |
| Backend   | Node.js, Express, Socket.IO |
| Database  | MongoDB with Mongoose |
| Auth      | JSON Web Tokens (JWT), bcrypt password hashing |

## Project structure

```
taskflow/
├── backend/
│   ├── config/db.js
│   ├── controllers/        # authController, boardController, taskController
│   ├── middleware/         # JWT auth guard, error handler
│   ├── models/             # User, Board, Task (Mongoose schemas)
│   ├── routes/             # authRoutes, boardRoutes, taskRoutes
│   └── server.js           # Express + Socket.IO entry point
└── frontend/
    └── src/
        ├── api/axios.js        # Axios instance with auth interceptor
        ├── context/AuthContext.jsx
        ├── components/         # Navbar, BoardCard, Column, TaskCard, PrivateRoute
        ├── pages/               # Login, Register, Dashboard, BoardPage
        └── App.jsx
```

## Running locally

### Prerequisites
- Node.js 18+
- A MongoDB connection string (free tier from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) works well)

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/taskflow.git
cd taskflow

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment variables

```bash
cd backend
cp .env.example .env
# then edit .env and fill in MONGO_URI and JWT_SECRET

cd ../frontend
cp .env.example .env
```

### 3. Run both apps (two terminals)

```bash
# Terminal 1
cd backend
npm run dev        # starts API on http://localhost:5000

# Terminal 2
cd frontend
npm run dev        # starts React app on http://localhost:5173
```

Open `http://localhost:5173`, register an account, and create your first board.

## API overview

| Method | Endpoint                          | Description                  |
|--------|------------------------------------|-------------------------------|
| POST   | `/api/auth/register`              | Create a new user             |
| POST   | `/api/auth/login`                 | Log in, receive a JWT         |
| GET    | `/api/auth/me`                    | Get current user (protected)  |
| GET    | `/api/boards`                     | List boards for the user      |
| POST   | `/api/boards`                     | Create a board                |
| GET    | `/api/boards/:id`                 | Get one board                 |
| PUT    | `/api/boards/:id`                 | Update board (owner only)     |
| DELETE | `/api/boards/:id`                 | Delete board (owner only)     |
| GET    | `/api/boards/:boardId/tasks`      | List tasks on a board         |
| POST   | `/api/boards/:boardId/tasks`      | Create a task                 |
| PUT    | `/api/tasks/:id`                  | Update a task                 |
| DELETE | `/api/tasks/:id`                  | Delete a task                 |

All board/task routes require an `Authorization: Bearer <token>` header.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions to deploy the backend to Render and the frontend to Vercel, plus how to set up MongoDB Atlas.

## Possible future improvements

- Invite teammates to boards by email
- Comments and file attachments on tasks
- Activity log / audit trail per board
- Unit and integration tests (Jest + Supertest, React Testing Library)

## License
This project is developed for educational and learning purposes.
