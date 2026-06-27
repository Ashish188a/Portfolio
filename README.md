# MERN Stack Developer Portfolio

This is a dynamic, fully functional **MERN Stack** (MongoDB, Express, React, Node.js) implementation of the portfolio originally designed in `portfolio.html` for **Ashish Kumar Xess**.

It features a high-performance React frontend created via Vite, a robust Node/Express REST API backend, MongoDB schema modeling via Mongoose, and a secure JWT-authenticated **Admin Dashboard** allowing full CRUD management of the portfolio contents and visitor inquiries.

---

## 📂 Project Structure

```text
portfolio-mern/
├── backend/                  # Node.js + Express + Mongoose Backend
│   ├── config/               # Database connection configurations
│   ├── middleware/           # Protected routes authentication middleware
│   ├── models/               # MongoDB Database schemas (Skill, Project, Experience, Message, Admin)
│   ├── routes/               # Express routing endpoints (api, auth)
│   ├── scripts/              # DB seeder helper scripts
│   ├── server.js             # Main server entrypoint
│   └── .env                  # Port, DB connection, and JWT key configs
│
├── frontend/                 # React.js + Vite Frontend
│   ├── src/
│   │   ├── assets/           # Frontend styling media
│   │   ├── components/       # Reusable layout sections (Hero, About, Skills, Projects, etc.)
│   │   ├── pages/            # Page aggregations (Portfolio, AdminLogin, AdminDashboard)
│   │   ├── App.jsx           # Routing declarations
│   │   ├── index.css         # Custom portfolio styling + Admin UI styling
│   │   └── main.jsx          # Vite render entrypoint
│   ├── index.html            # Core document headers, SEO tags, and library imports
│   └── vite.config.js        # React server configs + local API proxy setup
│
├── package.json              # Root-level scripts to orchestrate the MERN application
└── README.md                 # Setup and usage guide
```

---

## 🛠️ Prerequisites

To run this project locally, ensure you have:
1. **Node.js** (v18+ recommended)
2. **npm** (v9+ recommended)
3. **MongoDB** installed and running on your local machine (default port: `27017`) or a MongoDB Atlas URI string.

---

## 🚀 Getting Started

Follow these steps to launch the MERN portfolio on your system:

### 1. Database Seeding (Populate Initial Portfolio Content)
Before launching the server, seed your MongoDB database with Ashish's skills, projects, and experiences:
```bash
# In the portfolio-mern/ directory:
npm run seed
```
*This connects to MongoDB and initializes the schemas, creating the default admin user account as well.*

### 2. Run the Development Servers
Launch both the Express backend and Vite React frontend concurrently with a single command:
```bash
# In the portfolio-mern/ directory:
npm run dev
```
- **React Frontend:** Running on [http://localhost:5173](http://localhost:5173)
- **Express Backend:** Running on [http://localhost:5000](http://localhost:5000)

---

## 🔑 Admin Dashboard Details

To manage your portfolio data, navigate to:
👉 **[http://localhost:5173/admin](http://localhost:5173/admin)**



> [!NOTE]
> You can change the port, MongoDB URI, and admin login credentials at any time by editing the environmental variables in the `backend/.env` file.

---

## ✨ Features & Enhancements

1. **Fully Dynamic Content:** All skills, projects, and experiences are retrieved from the MongoDB database rather than hardcoded.
2. **Interactive Contact Form:** Messages sent via the contact form are stored in the database and visible in your Admin Inbox.
3. **Full Admin Control Panel:**
   - **Messages:** View, read, and delete contact inquiries.
   - **Skills:** Add and delete skills dynamically.
   - **Projects:** Add and delete projects (with feature lists and technology badges).
   - **Experience:** Add and delete items on your journey timeline.
4. **Local Storage Theme Sync:** The dark/light mode toggle retains state across browser reloads.
5. **Proxy Configuration:** Vite is configured to route `/api` backend requests to Express automatically during development.
