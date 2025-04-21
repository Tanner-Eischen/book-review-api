const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username": "username", "password": "password"}];

const isValid = (username) => {
  let userswithsamename = users.filter((user) => {
      return user.username === username;
  });
 if (userswithsamename.length > 0) {
      return true;
  } else {
      return false;
  }
}

const authenticatedUser = (username, password) => {
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Check if username or password is missing
  if (!username || !password) {
      return res.status(404).json({ message: "Error logging in" });
  }
  // Authenticate user
  if (authenticatedUser(username, password)) {
      // Generate JWT access token
      let accessToken = jwt.sign({
          data: password
      }, 'access', { expiresIn: 60 * 60 });
      // Store access token and username in session
      req.session.authorization = {
          accessToken, username
      }
      return res.status(200).send("User successfully logged in");
  } else {
      return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});
// Add a book review
regd_users.put("/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const reviewText = req.query.review;
    
    // Ensure review text is provided.
    if (!reviewText) {
      return res.status(400).json({ message: "Review text is required" });
    }
    
    // Ensure the user is logged in by retrieving the username from session.
    if (!req.session.authorization || !req.session.authorization.username) {
      return res.status(403).json({ message: "User not logged in" });
    }
    
    const username = req.session.authorization.username;
    
    // Check if book exists in booksdb.
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    // Add or update the review.
    // Each book in booksdb has a "reviews" object.
    // We use the username as the key; if a review already exists under that username, it is updated.
    books[isbn].reviews[username] = reviewText;
    
    return res.status(200).json({
      message: "Review successfully added/modified",
      reviews: books[isbn].reviews[username]
    });
  });
  regd_users.delete("/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
  
    // Check if the user is logged in and retrieve the username.
    if (!req.session.authorization || !req.session.authorization.username) {
      return res.status(403).json({ message: "User not logged in" });
    }
    const username = req.session.authorization.username;
  
    // Check if the book exists.
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    // Check if the review for the current user exists for that book.
    if (books[isbn].reviews && books[isbn].reviews.hasOwnProperty(username)) {
      // Delete the user's review.
      delete books[isbn].reviews[username];
      return res.status(200).json({
        message: "Review deleted successfully",
        reviews: books[isbn].reviews
      });
    } else {
      return res.status(404).json({ message: "Review not found for this user" });
    }
  });
  
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
