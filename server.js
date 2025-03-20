require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');  // Assuming router.js is in the same directory

const app = express();
const port = 3001;
const host = '127.0.0.1';

// Enable CORS
app.use(cors());
app.use(express.json());

// Get Mongo URI from environment variables

const uri = 'mongodb+srv://avishkavinodcgl:(pw)@cluster0.8vkfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connect = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to Mongo DB');
    } catch (error) {
        console.log('Mongo DB connection error', error);
    }
};

// Start the connection
connect();

// Start the server
const server = app.listen(port, host, () => {
    console.log(`Node server is listening on http://${host}:${port}`);
});

// Use router for API endpoints
app.use('/api', router);




