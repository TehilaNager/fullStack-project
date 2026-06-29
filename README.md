# IDFConnect

## 📌 Overview

IDFConnect is a full-stack web application developed as a final Full Stack project.

The system connects people who want to donate equipment, food, transportation, clothing, and other resources with people who need assistance.

Users can publish donations and requests, communicate through a built-in messaging system, save favorites, manage their personal profile, and more.

The project was developed using:

- React + Vite
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

# Project Structure

```
IDFConnect/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── config.json
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
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

## Donations

Users can:

- Create donation offers
- Edit offers
- Delete offers
- View offer details
- Browse all offers
- Search donations
- Filter donations
- Save offers to favorites

---

## Requests

Users can:

- Create support requests
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

- Save donations
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
- Published donations
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

Both donations and requests support:

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
- JWT
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

The backend exposes REST APIs for:

- Authentication
- Users
- Donation Offers
- Support Requests
- Favorites
- Messages

---

# Validation

The application validates:

- Registration
- Login
- User update
- Donation creation
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
- Real-time style messaging workflow
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

Developed as a Full Stack final project.
