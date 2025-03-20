const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
