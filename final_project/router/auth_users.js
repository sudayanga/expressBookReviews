const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username)  return res.json({message: "Username is not defined"})
  if (!req.body.password) return res.json({message: "Password is not defined"})
  users.forEach(function(user) {
      if (user.username === username && user.password === password) {
            req.session.accessToken = jwt.sign({data: user}, "test_test")
            return res.json({message: "You are sign into the account!"})
      }
  })
 
  res.json({message: "You'r useranme and password combination is invalid."})

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const  review = req.query.review;
  books[req.params.isbn][req.user.username] = review;
  res.json({message: "Review was added!"})

});


regd_users.delete("/auth/review/:isbn", (req, res) => {
    books[req.params.isbn][req.user.username]
    res.json({message: "Review was deleted!"})
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
