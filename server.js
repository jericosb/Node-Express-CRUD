// server.js
// A small Book API to demonstrate Express, routing, and REST.
// Setup once:  npm init -y   then   npm install express
// Run:         node server.js
// Open:        http://localhost:3000

const express = require("express")
const app = express()

// Middleware that reads JSON from the request body (needed for POST and PUT)
app.use(express.json())

// Our data, kept in memory for the demo
let books = [
  { id: 1, title: "Node Basics" },
  { id: 2, title: "Express Guide" }
]

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Book API")
})

// GET all books
app.get("/books", (req, res) => {
  res.json(books)
})

// GET one book by id (route parameter)
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id)
  if (!book) {
    return res.status(404).json({ message: "Book not found" })
  }
  res.json(book)
})

// POST a new book
app.post("/books", (req, res) => {
  const newBook = { id: books.length + 1, title: req.body.title }
  books.push(newBook)
  res.status(201).json(newBook)
})

// PUT, update a book by id
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id)
  if (!book) {
    return res.status(404).json({ message: "Book not found" })
  }
  book.title = req.body.title
  res.json(book)
})

// DELETE a book by id
app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id != req.params.id)
  res.json({ message: "Book deleted" })
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})
