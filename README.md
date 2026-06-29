# IDFConnect

## 📌 Overview

**IDFConnect** is a full-stack web application developed as a final project for a Full Stack development course.

The platform was created to connect **citizens who want to help** with **IDF soldiers and reservists who need assistance**.

Users can either publish **offers** (such as equipment, clothing, food, transportation, medical supplies, and other resources) or create **requests** when they need help.

The platform enables users to easily find relevant offers and requests, communicate through a built-in private messaging system, save favorite items, and manage their personal profiles.

The goal of the project is to make the process of giving and receiving assistance simple, organized, and accessible through a modern web application.

The project was developed using:

- React + Vite
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

# Project Structure

The application is divided into two main parts:

```text
IDFConnect/
│
├── frontend/
│   ├── src/
│   │    ├── components/
│   │    ├── context/
│   │    ├── helpers/
│   │    ├── images/
│   │    ├── pages/
│   │    ├── routes/
│   │    └── services/
│   ├── public/
│   ├── config.json
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── lib/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── app.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# Main Features

## Authentication

- User registration
- User login
- JWT authentication
- Logout
- Profile editing
- Password update
- User deletion

---

## Offers

Users can:

- Create offers
- Edit offers
- Delete offers
- View offer details
- Browse all offers
- Search offers
- Filter offers
- Save offers to favorites

---

## Requests

Users can:

- Create requests
- Edit requests
- Delete requests
- View request details
- Browse all requests
- Search requests
- Filter requests
- Save requests to favorites

---

## Favorites

Users can:

- Save offers
- Save requests
- Remove favorites
- Search favorites
- Filter favorites
- View favorites as cards or table

---

## Messaging

Private chat system between users.

Features include:

- Create conversation automatically
- Continue existing conversation
- Send messages
- View conversation history

---

## User Profile

Each user has:

- Personal profile
- Published offers
- Published requests
- Favorite items
- Profile editing

---

## Administration

Administrators can:

- View user information
- Edit users
- Delete users

---

# Search & Filtering

Both offers and requests support:

- Text search
- Category filtering
- Region filtering
- Status filtering
- Quantity filtering
- Custom quantity range

---

# Technologies

## Frontend

- React
- React Router
- Axios
- Formik
- Joi Validation
- SweetAlert2
- Bootstrap Icons
- CSS

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Joi
- bcrypt

---

# Installation

## Clone the project

```bash
git clone <repository-url>
```

---

## Install Frontend

```bash
cd frontend
npm install
```

---

## Install Backend

```bash
cd backend
npm install
```

---

## Configuration

The project includes the following configuration files:

### Backend

`backend/.env.example`

Example:

```env
PORT=3000
MONGO_URL=<your_mongodb_connection_string>
```

Create a `.env` file based on this example before running the backend.

### Frontend

`frontend/config.json`

```json
{
  "apiUrl": "http://localhost:3000/api"
}
```

Update the API URL if the backend runs on a different server or port.

---

# Running the Project

## Backend

```bash
cd backend
npm start
```

or

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# API

The backend exposes RESTful APIs for:

- Authentication
- Users
- Offers
- Requests
- Favorites
- Messages

---

# Validation

The application validates:

- Registration
- Login
- User update
- Offer creation
- Request creation
- Contact information
- Required fields

Both client-side and server-side validation are implemented.

---

# Project Highlights

- Responsive design
- Context API state management
- Protected routes
- JWT authorization
- Form validation
- Dynamic filtering
- Private messaging system
- Modular component architecture
- Reusable components

---

# Notes

Sensitive configuration values should not be committed to GitHub.

The project includes a `.env.example` file that demonstrates the required environment variables.

Example:

```env
PORT=3000
MONGO_URL=<your_mongodb_connection_string>
```

---

# Author

Developed by Tehila Nagar.
