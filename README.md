# CodeMorph AI — Full-stack AI Code Converter

A responsive MERN application for converting code between programming languages using Google's Gemini API. Includes account registration/login, protected workspace, Monaco editor, saved conversion history, and profile settings.

## Stack
- React + Vite + Tailwind CSS v4
- React Router, Axios, Lucide, Monaco Editor
- Node.js + Express + MongoDB/Mongoose
- JWT in an HttpOnly cookie and bcrypt password hashing
- Google Gen AI JavaScript SDK
- Express rate limiting

## Requirements
- Node.js 20.19+ (Node 22+ recommended for newer tooling)
- MongoDB local instance or MongoDB Atlas URI
- Gemini API key

## 1. Configure environment

Create `server/.env` by copying `server/.env.example`, then set `MONGODB_URI`, a long random `JWT_SECRET` (at least 32 characters), and `GEMINI_API_KEY`.

Create `client/.env` by copying `client/.env.example` if you need a different API URL.

Never commit `.env` files or expose your Gemini API key in the frontend.

## 2. Install and run

Terminal 1:
```bash
cd server
npm install
npm run dev
```

Terminal 2:
```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173. API health check: http://localhost:5000/api/health.

## API routes
- `POST /api/auth/signup` — create account
- `POST /api/auth/login` — sign in
- `POST /api/auth/logout` — clear session cookie
- `GET /api/auth/me` — current user (protected)
- `PATCH /api/auth/profile` — update name (protected)
- `POST /api/conversions` — convert and save code (protected)
- `GET /api/conversions` — list current user's latest 100 conversions (protected)
- `DELETE /api/conversions/:id` — delete an owned conversion (protected)

## Notes
- Authentication cookie is HttpOnly. Local development uses `SameSite=Lax`; production cross-site deployment requires HTTPS, `SameSite=None`, correct CORS origin, and secure cookie settings.
- Code conversion output is AI-generated. Review and test it before production use.
- For production, configure HTTPS, strict CORS, secret rotation, request logging, monitoring, and a suitable per-user quota.
