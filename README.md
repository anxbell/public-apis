# 📡 Public APIs Directory

A collaborative Node.js REST API for discovering and sharing useful **free public APIs**. Built with **MongoDB**, **Express**, **Node.js**, and documented using **Swagger**. Users can browse APIs, add new entries, leave comments, and authenticate with Google using OAuth 2.0.

## 🌐 Live Demo

Access the live API: [https://publicapis.onrender.com](https://publicapis.onrender.com)  
View Swagger documentation: [https://publicapis.onrender.com/api-docs](https://publicapis.onrender.com/api-docs)

---

## 🛠️ Features

- 🔍 Search for free and categorized public APIs
- ➕ Add new API entries (with validation)
- 💬 Leave comments or reviews on APIs
- 🔐 Secure authentication with Google OAuth
- 🗃️ MongoDB for flexible data storage
- 📄 Swagger auto-generated documentation
- 🚀 Deployed with Render

---

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: OAuth 2.0 with Passport.js (Google strategy)
- **Documentation**: Swagger (via swagger-autogen)
- **Deployment**: Render

---

## 📁 Project Structure
```
public-apis/
├── src/
│   ├── config/         # DB and auth config
│   ├── controllers/    # Business logic
│   ├── middleware/     # Custom middlewares
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routers
│   └── utils/          # Helper functions
├── swagger/            # Swagger config and output     
├── package.json
└── README.md
```
---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB URI
- Google OAuth credentials

### Installation

```bash
git clone https://github.com/anxbell/public-apis.git
cd public-apis
npm install
```
### Running the App
```bash
Copy code
npm run dev
Visit: http://localhost:3000
```
### 🔐 Authentication
OAuth via Google

Session-based login

Only authenticated users can add or comment on APIs

### 📑 API Documentation
Visit http://localhost:3000/api-docs after running the project to explore available routes and try them out using Swagger UI.

