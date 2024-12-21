const express = require('express');
const router = express.Router();
const { todoController } = require('../bootstrap');
const {protectRoutes, authorizeRoles} = require('../middleware/auth');
const validateDocument = require('../middleware/validateDocument');
const advancedResults = require('../middleware/advancedResults');
const Todo = require('../models/Todo')

router.post('/', protectRoutes, todoController.createTodo);

router.get('/', protectRoutes, advancedResults(Todo), todoController.getAllTodos);

router.get('/:id', protectRoutes, validateDocument(Todo, (req) => ({
    _id: req.params.id
})), todoController.getTodoById);

router.put('/:id', protectRoutes, validateDocument(Todo, (req) => ({
    _id: req.params.id
})), todoController.updateTodoById);

router.delete('/:id', protectRoutes, validateDocument(Todo, (req) => ({
    _id: req.params.id
})), todoController.deleteTodoById);

module.exports = router;
