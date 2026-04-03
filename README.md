# MERN Auth Boilerplate

A full-stack MERN authentication starter that keeps a **JWT in an HTTP-only cookie**, pairs an Express/Mongo backend with a React/Redux Toolkit frontend, and ships with sign in, sign up, logout, and profile management flows.

## Overview

- Register and log in users using hashed passwords plus JWTs delivered via cookies for automatic authentication checks.
- Redux Toolkit + RTK Query power API calls, caching, and `localStorage` persistence of the signed-in user state.
- React Router v7 routes include protected profile access and client-side redirects for signed-in users.
- React Bootstrap, icons, and Toastify provide the UI scaffolding and feedback components used across the hero, forms, and header.

## Architecture

### Server (Express + MongoDB)

- **Entry point:** `server/server.js` wires Express middleware, database connection, routes, and error handlers.
- **Routes:** `server/routes/userRoutes.js` declares the public `POST /api/users`, `POST /api/users/auth`, and `POST /api/users/logout` endpoints plus `GET/PUT /api/users/profile` guarded by `protect` middleware.
- **Authentication:** `server/controller/userController.js` handles registration, login, logout, and profile updates while `generateToken()` writes a 30-day JWT cookie (`httpOnly`, `secure` in prod, `sameSite: strict`).
- **Security:** Passwords are hashed with `bcryptjs` (`userModel` pre-save hook) and `authMiddleware` decodes cookies via `jsonwebtoken` to populate `req.user`.
- **Error handling:** `errorMiddleware` sends JSON errors and converts Mongoose `CastError`s into 404s.

### Client (Vite + React)

- **Entry point:** `client/src/main.jsx` bootstraps React, Redux store, and defines routes with `createBrowserRouter`.
- **Layout:** `App.jsx` renders the `Header`, `ToastContainer`, and router `Outlet` wrapped in a Bootstrap container.
- **Pages:** `/` shows the `Hero` card, `/login` and `/register` show Bootstrap forms, and `/profile` allows authenticated users to update their info.
- **State:** `client/src/slices/authSlice.js` holds the persisted `userInfo` object; `usersApiSlice` enhances the base `apiSlice` with mutations for login/register/logout/update.
- **Protected routes:** `PrivateRoute` renders children only when `userInfo` exists, otherwise it redirects to `/login`.

## Getting Started

### Prerequisites

- Node.js (v18+) and npm
- A MongoDB instance (local or hosted)

### Installation

1. **Server**
   ```bash
   cd server
   npm install
   ```
2. **Client**
   ```bash
   cd ../client
   npm install
   ```

### Environment

Copy `server/.env` (shown below) to configure your secrets.

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/MERNAuth
JWT_SECRET=<replace-with-a-long-random-string>
```

- `MONGO_URI` can point to a remote cluster; `mongoose.connect` logs the host on success.
- `JWT_SECRET` secures the JWT cookies; rotate it before deploying.
- The client relies on Vite proxying `/api` to `http://localhost:5000` (see `client/vite.config.js`).

## Running the App

### Development

Open two shells:

1. ```bash
   cd server
   npm run dev
   ```
   Starts Express with `nodemon` on port 5000 and loads `.env`.
2. ```bash
   cd client
   npm run dev
   ```
   Runs Vite on port 3000 and proxies `/api` to the backend, so the frontend can call `/api/users` without CORS setup.

## API Reference

| Endpoint             | Method | Auth      | Description                                                                                            |
| -------------------- | ------ | --------- | ------------------------------------------------------------------------------------------------------ |
| `/api/users`         | POST   | Public    | Register a new user (`name`, `email`, `password`). Returns user data and sets the JWT cookie.          |
| `/api/users/auth`    | POST   | Public    | Login (`email`, `password`). Validates credentials and sets the JWT cookie.                            |
| `/api/users/logout`  | POST   | Public    | Clears the `jwt` cookie so the browser forgets the session.                                            |
| `/api/users/profile` | GET    | Protected | Returns the authenticated user (uses cookie). Requires `protect` middleware.                           |
| `/api/users/profile` | PUT    | Protected | Updates `name`, `email`, and optionally `password`. Returns the updated user and refreshes the cookie. |

Errors are thrown with `express-async-handler`; `errorMiddleware` formats the message and includes the stack trace unless `NODE_ENV=production`.

## Credits

- Brad Traversy — inspiration from Traversy Media's MERN authentication tutorials and community resources.
