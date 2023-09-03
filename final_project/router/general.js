const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username)  return res.json({message: "Username is not defined"})
  if (!req.body.password) return res.json({message: "Password is not defined"})
  users.forEach(function(user) {
      if (user.username === username) {
            return res.json({message: "User is already exists"})
      }
  })
  users.push({username, password})
  res.json({message: "User is created!"})
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  res.json(books)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.json(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  Object.keys(books).forEach(function(bookIndex) {
      if (books[bookIndex].author === req.params.author) {
          return res.json(books[bookIndex])
      }
  })

});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  Object.keys(books).forEach(function(bookIndex) {
    if (books[bookIndex].title === req.params.title) {
        return res.json(books[bookIndex])
    }
})
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  res.json(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
