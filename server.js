const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Allow only your frontend app origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these HTTP methods
    credentials: true  // Allow cookies and credentials
  }));

// Load routes dynamically for other routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Import auth routes
const userauth = require('./routes/authRoutes');  // Correctly define userauth by requiring authRoutes

// Add user authentication routes
app.use('/api/v1/auth', userauth);  // The auth routes are now accessible under '/api/v1/auth'

// Start the server
const server = () => {
    db();  // Connect to the database
    app.listen(PORT, () => {
        console.log('listening to port:', PORT);
    });
};

server();
