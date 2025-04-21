
📚 Book Review API
A full-stack RESTful API built with Node.js and Express that allows users to register, log in, and manage book reviews. Implements session-based authentication using JWT and follows modular route structuring with middleware for protected access.

🔧 Tech Stack
Backend: Node.js, Express.js

Authentication: JWT (JSON Web Tokens), express-session

Tools & Concepts: REST API, Middleware, Session Management, Modular Code, In-Memory Data Store

🛠 Features
📝 User Registration & Login – Secure login system using JWT-based sessions.

🔐 Protected Routes – Access control via middleware to safeguard user actions like posting or deleting reviews.

📚 Book Database – Preloaded with a set of literary classics for users to review.

🗣 Review Management – Authenticated users can add, update, and delete their own reviews for specific books.

📥 Public Endpoints – Retrieve book data by title, author, or ISBN without logging in.

📁 Project Structure
bash
Copy
Edit
├── booksdb.js           # Simulated book database
├── auth_users.js        # Authentication logic and protected routes
├── general.js           # Public-facing routes (no login required)
├── index.js             # App entry point, routing, session setup
🚀 Getting Started
bash
Copy
Edit
# Clone the repo
git clone https://github.com/yourusername/book-review-api.git

# Install dependencies
cd book-review-api
npm install

# Start the server
node index.js
Server runs at http://localhost:5000

🧪 Sample API Routes
POST /register – Register a new user

POST /customer/login – Login and receive session token

PUT /customer/review/:isbn?review=... – Add or update a review

DELETE /customer/review/:isbn – Delete a user’s review

GET /review/:isbn – Public access to book reviews by ISBN

