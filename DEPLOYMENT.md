# Deployment Guide

This guide deploys TaskFlow for free using:
- **MongoDB Atlas** — hosted database
- **Render** — backend (Node/Express + Socket.IO)
- **Vercel** — frontend (React/Vite)

## 1. Push your code to GitHub

```bash
cd taskflow
git init
git add .
git commit -m "Initial commit: TaskFlow full-stack Kanban app"
git branch -M main
git remote add origin https://github.com/<your-username>/taskflow.git
git push -u origin main
```

If you don't have a repo yet, create one first at https://github.com/new (don't initialize it with a README, so the push above doesn't conflict).

## 2. Set up MongoDB Atlas (free tier)

1. Go to https://www.mongodb.com/cloud/atlas and create a free account.
2. Create a new **free M0 cluster**.
3. Under **Database Access**, create a database user with a username and password.
4. Under **Network Access**, add IP address `0.0.0.0/0` (allow access from anywhere) so Render can connect.
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Add `/taskflow` before the `?` so it targets a database named `taskflow`:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
   ```
   Save this — you'll paste it into Render as `MONGO_URI`.

## 3. Deploy the backend to Render

1. Go to https://render.com and sign in with GitHub.
2. Click **New → Web Service**, and select your `taskflow` repo.
3. Configure the service:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
4. Add environment variables (under **Environment**):
   - `MONGO_URI` — the connection string from step 2
   - `JWT_SECRET` — any long random string (e.g. generate one with `openssl rand -base64 32`)
   - `CLIENT_URL` — you'll fill this in after deploying the frontend in step 4 (use `*` for now to unblock the first deploy)
   - `PORT` — `5000` (Render sets its own `PORT` automatically, but Express reads `process.env.PORT` so this is a safe default)
5. Click **Create Web Service**. Render will build and deploy. Once live, note the URL, e.g. `https://taskflow-api.onrender.com`.
6. Test it by visiting `https://taskflow-api.onrender.com/` — you should see `{"status":"TaskFlow API is running"}`.

> Free Render services spin down after inactivity and take ~30–60 seconds to wake up on the next request. This is normal and worth mentioning to anyone testing your demo link.

## 4. Deploy the frontend to Vercel

1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New → Project**, and select your `taskflow` repo.
3. Configure the project:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables:
   - `VITE_API_URL` — `https://taskflow-api.onrender.com/api` (your Render URL + `/api`)
   - `VITE_SOCKET_URL` — `https://taskflow-api.onrender.com`
5. Click **Deploy**. Once live, note the URL, e.g. `https://taskflow.vercel.app`.

## 5. Connect the two: update CORS

1. Go back to your Render service → **Environment**.
2. Update `CLIENT_URL` to your Vercel URL, e.g. `https://taskflow.vercel.app`.
3. Save — Render will redeploy automatically with the correct CORS setting.

## 6. Verify end-to-end

1. Open your Vercel URL, register a new account, create a board, add a task.
2. Open the same board URL in a second browser tab (or incognito) logged in as the same user, and confirm dragging a task in one tab updates the other in real time.

## Adding the live link to your resume/GitHub

Once deployed, update the top of `README.md` with:
```markdown
**Live demo:** https://taskflow.vercel.app
```
Recruiters and hiring managers click live demo links far more often than they clone repos — this is one of the highest-leverage additions you can make.
