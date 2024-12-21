const express = require('express');
const router = express.Router();
const {userController} = require('../bootstrap');
const {protectRoutes} = require('../middleware/auth');
const validateDocument = require('../middleware/validateDocument');
const User = require('../models/User');

router.get('/', protectRoutes, userController.getAllUsers);
router.get('/:id', protectRoutes, validateDocument(User, (req) => ({
    _id: req.params.id
})), userController.getUserById);
router.put('/:id', protectRoutes, validateDocument(User, (req) => ({
    _id: req.params.id
})), userController.updateUserById);
router.delete('/:id', protectRoutes, validateDocument(User, (req) => ({
    _id: req.params.id
})), userController.deleteUserById);

module.exports = router;
