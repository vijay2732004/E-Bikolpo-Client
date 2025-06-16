# E-Bikolpo - Product Recommendation Platform

**E-Bikolpo** is a user-driven product recommendation platform where users can submit boycott queries, add relevant product recommendations, and interact with others' submissions. The app ensures authenticated access to certain features using private routes.

## 🔗 Live Demo

[Visit E-Bikolpo](https://e-bikolpo.web.app/) <!-- Replace with your actual deployment link -->

---

## 🚀 Features

- 🔐 Firebase Authentication (Email/Password & Google Login)
- 📝 Add, update, and delete product boycott queries
- 💬 Add, delete, and manage recommendations per query
- 🧑‍💻 Private dashboard for:
  - My Queries
  - My Recommendations
  - Recommendations For Me
- 🗂 View all users’ public queries
- 🎨 Clean UI with Tailwind CSS and DaisyUI
- 🧠 Typewriter effect & tooltips for user enhancement
- ✅ JWT-based protected routes
- 📱 Responsive Design

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router DOM, Tailwind CSS, DaisyUI
- **Auth**: Firebase Authentication
- **State**: React Context API
- **Notifications**: SweetAlert2
- **Protected Routes**: Custom Private Route + Firebase Auth State
- **Token Management**: Cookie-based JWT (with `js-cookie`)

---


