# 📚 Book Review API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing books and user-submitted reviews. It includes JWT-based authentication and provides full CRUD operations for books and reviews.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Other:** dotenv, bcrypt, validator

---

## 🚀 Features

- **User Authentication** (JWT-based)
  - `POST /signup` – Register a new user
  - `POST /login` – Authenticate and receive a JWT token
  - `POST /logout` – Logout a user

- **Book Management**
  - `POST /books` – Add a new book (Authenticated users only)
  - `GET /books` – Get all books (supports pagination and filtering by author or genre)
  - `GET /books/:id` – Get a book’s details, average rating, and reviews
  - `GET /search` – Search books by title or author

- **Review Management**
  - `POST /books/:id/reviews` – Add a review (one review per user per book)
  - `PUT /reviews/:id` – Update review
  - `DELETE /reviews/:id` – Delete review

---

## 🏗️ Project Setup Instructions

### 1. Clone the Repository
git clone https://github.com/Sakib4724/BookReviewAPI.git
cd BookReviewAPI

### 2. Install Dependencies
npm install

### 3. Environment Variables
Create a .env file in the root directory:

PORT=3000
MONGO_URI=mongodb://localhost:27017/bookReviewApiDb
JWT_SECRET=Your_jwt_secret_key

### 3. Run the App
npm run start

## 🔐 Authentication Endpoints

### POST /signup
json body:
{
    "firstName": "Sakib",
    "lastName": "Shaikh",
    "emailId": "sak24@gmail.com",
    "password": "DevMate@183"
}

### POST /login
json body:
{
    "emailId": "sak24@gmail.com",
    "password": "DevMate@183"
}

### POST /logout


## 📘 Book Endpoints

### Add Book: POST /books
json body:
{
    "title": "The Kite Runner",
    "author": "Khaled Hosseini",
    "genre": "Historical Fiction"
}

### Get All Books: GET /books

### Get Book by ID: GET /books/:id


## ✍️ Review Endpoints

### Add Review: POST /books/:id/reviews
(Auth Required)
json body:
{
  "rating": 4,
  "comment": "Very inspiring!"
}

### Update Review: PUT /reviews/:id
(Auth Required)
json body:
{
  "rating": 3,
  "comment": "Average Book!"
}

### Delete Review: DELETE /reviews/:id
(Auth Required)

## 🔍 Search Endpoint: GET search?q=Wings of Fire

---

## 🧠 Design Decisions & Assumptions
1. Only authenticated users can add books or reviews.
2. Middleware `userAuth` is implemented to **verify JWT token** and **check user authentication** before accessing protected routes.
3. One review per user per book.
4. Pagination is added to book listings and reviews.
5. Search is case-insensitive and uses partial match via regex.
6. Secure password storage using bcrypt.
7. JWT is used for stateless authentication.
8. All controller functions are wrapped in `try-catch` blocks to handle errors gracefully and avoid crashing the server.

---

## 🗂️ Database Schema Overview

### User Schema
{
  firstName: String,
  lastName: String,
  emailId: String,
  password: String
}

### Book Schema
{
  title: String,
  author: String,
  genre: String,
  addedBy: ObjectId (ref: User),
}

### Review Schema
{
  book: ObjectId (ref: Book),
  user: ObjectId (ref: User),
  rating: Number,
  comment: String
}

---

## 🚀 Example Tools to Test API
Postman
MongoDB Compass (for DB management)

### 👨‍💻 Author
Sakib Shaikh