const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
// const auth = require('../Middleware/auth');

// Route for signup
router.post('/signup', userController.signup);

// Route for login
router.post('/login', userController.login);

module.exports = router;