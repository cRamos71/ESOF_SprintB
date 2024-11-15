const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/user/:userId', userController.getUser);

module.exports = router;
