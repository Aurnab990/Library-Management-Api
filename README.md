# 📚 Library Management API

A RESTful API built with **TypeScript**, **Express.js**, and **MongoDB** **Mongoose** to manage a digital library system — including book creation, borrowing, availability tracking, and book summary reports using aggregation.

---

## 🌐 Live API

You can access the live API here:

👉 [https://library-management-api-peach-zeta.vercel.app/api/books](https://library-management-api-peach-zeta.vercel.app/api/books)

---

## 🎥 Video Demo

Check out the walkthrough video:

▶️ [https://youtu.be/PymSwJA6mXY](https://youtu.be/PymSwJA6mXY)

---

## ⚙️ Features

- ✅ Add, update, delete, and list books
- 📖 Borrow books with availability check
- 📊 Aggregate borrowed book summary with total quantities
- 🔍 Filter, sort, and limit books by genre and creation date

---

## 🚀 API Endpoints

### 📚 Books

- `GET /api/books` — Get all books with optional filters  
  - Query params: `genre`, `sortBy`, `sort`, `limit`
- `POST /api/books` — Add a new book
- `GET /api/books/:bookId` — Get a specific book
- `PATCH /api/books/:bookId` — Update a book
- `DELETE /api/books/:bookId` — Delete a book

### 🔄 Borrow

- `POST /api/borrow` — Borrow a book
  - Validates available copies, updates stock, and saves borrow record
- `GET /api/borrow` — Get a summary of all borrowed books
  - Returns book title, ISBN, and total quantity borrowed

---

## 🧪 Sample Request to Book


```http
"success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "685c49c9fe552c93992d7f4f",
      "title": "Write Your Own New",
      "author": "Lithium Dairy",
      "genre": "SCIENCE",
      "isbn": "978-2-52321-058-2",
      "description": "A motivational guide to finding your voice and telling your story authentically.",
      "copies": 20,
      "available": true,
      "createdAt": "2025-06-25T19:11:05.724Z",
      "updatedAt": "2025-06-25T19:11:05.724Z",
      "__v": 0
    },
]
```

## 🧪 Sample Request to Borrow a Book

```http
POST /api/borrow
Content-Type: application/json

{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
