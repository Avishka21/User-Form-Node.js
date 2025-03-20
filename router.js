const express = require('express');
const router = express.Router();
const controller = require('./controller');  

// Define routes for user CRUD operations
router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getUserById);
router.post('/users', controller.addUser);
router.put('/users/:id', controller.updateUser);  // Ensure this route is set up for updating
router.delete('/users/:id', controller.deleteUser);

module.exports = router;
