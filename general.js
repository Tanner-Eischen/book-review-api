const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username && password) {
   
    if (!isValid(username)) {
        
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
        return res.status(404).json({message: "User already exists!"});
    }
  return res.status(300).json({message: "Yet to be implemented"});
}});


public_users.get('/', (req, res) => {
  axios.get('http://localhost:5000/')
    .then(response => {
      res.status(200).json({
        message: "All books retreived",
        books: response.data
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving books",
        error: error.message
      });
    });
});


public_users.get('/isbn/:isbn', (req, res) => {
  axios.get(`http://localhost:5000/isbn/${req.params.isbn}`)
    .then(response => {
      res.status(200).json({
        message: "Book details retreived",
        book: response.data
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving book details",
        error: error.message
      });
    });
});
  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  axios.get(`http://localhost:5000/author/${req.params.author}`)
    .then(response => {
      res.status(200).json({
        message: "Books by author retreived",
        books: response.data
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving books by author",
        error: error.message
      });
    });
});

// Get all books based on title
public_users.get('/title/:title', (req, res) =>{
  axios.get(`http://localhost:5000/title/${req.params.title}`)
    .then(response => {
      res.status(200).json({
        message: "Books by title retreived",
        books: response.data
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving books by title",
        error: error.message
      });
    });  
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  const reviewbyisbn = books[isbn]
  if (reviewbyisbn) {
    return res.status(200).json(reviewbyisbn["reviews"]);
  } else {
    return res.status(404).json({message: "No reviews found with this isbn"})
  }
 
});

module.exports.general = public_users;
