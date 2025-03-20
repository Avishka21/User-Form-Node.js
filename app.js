const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./controller');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get all users
app.get('/users', (req, res) => {
    controller.getUsers((users, error) => {
        if (error) {
            return res.status(500).json({ message: 'Error fetching users', error });
        }
        res.json(users);
    });
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    controller.getUserById(id, (user, error) => {
        if (error) {
            return res.status(500).json({ message: 'Error fetching user by ID', error });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    });
});

// Create a new user
app.post('/users', (req, res) => {
    const userData = req.body;
    controller.addUser(userData, (result, error) => {
        if (error) {
            return res.status(500).json({ message: 'Error adding user', error });
        }
        res.json({ message: 'User added successfully', result });
    });
});

// Update a user
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    controller.updateUser(id, updatedData, (result, error) => {
        if (error) {
            return res.status(500).json({ message: 'Error updating user', error });
        }
        res.json({ message: 'User updated successfully', result });
    });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;  // Using params for consistency
    controller.deleteUser(id, (result, error) => {
        if (error) {
            return res.status(500).json({ message: 'Error deleting user', error });
        }
        res.json({ message: 'User deleted successfully', result });
    });
});

module.exports = app;
