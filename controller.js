const mongoose = require('mongoose');
const User = require('./model');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Add a new user
const addUser = async (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ message: 'ID and Name are required' });
    }

    const newUser = new User({ id, name });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User added successfully', savedUser });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user', error });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const userId = req.params.id; // This is the "id" from the request params

    const { name } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({ id: userId }, { name }, { new: true }); // Query by "id" field, not "_id"
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findOneAndDelete({ id: userId });  // Use "id" field instead of "_id"
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

module.exports = { getUsers, getUserById, addUser, updateUser, deleteUser };
