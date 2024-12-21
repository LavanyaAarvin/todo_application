const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const successResponse = require("../utils/successResponse");

class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }

    /**
     * @desc    Create a new todo
     * @route   POST /api/v1/todo
     * @access  Private
     */
    createTodo = asyncHandler(async (req, res, next) => {
        console.log("Create a new todo");
        const todoData = { ...req.body, createdBy: req.userId };
        const todo = await this.todoService.createTodo(todoData);
        if (!todo) {
            return next(new ErrorResponse('Error creating todo', 400));
        }
        res.status(201).json(successResponse(todo));
    });

    /**
     * @desc    Get all todos
     * @route   GET /api/v1/todo
     * @access  Private
     */
    getAllTodos = asyncHandler(async (req, res, next) => {
        console.log("Get all todos");
        res.status(200).json(res.advancedResults);
    });

    /**
     * @desc    Get a todo by ID
     * @route   GET /api/v1/todo/:id
     * @param   {string} req.params.id - The ID of the todo
     * @access  Private
     */
    getTodoById = asyncHandler(async (req, res, next) => {
        console.log("Get Todo By ID");
        const todo = await this.todoService.getTodoById(req.params.id);
        res.status(200).json(successResponse(todo));
    });

    /**
     * @desc    Update a todo by ID
     * @route   PUT /api/v1/todo/:id
     * @param   {string} req.params.id - The ID of the todo
     * @access  Private
     */
    updateTodoById = asyncHandler(async (req, res, next) => {
        console.log("Update Todo By ID");
        const todoData = { ...req.body, createdBy : req.userId};
        const todo = await this.todoService.updateTodoById(req.params.id, todoData);
        res.status(200).json(successResponse(todo));
    });

    /**
     * @desc    Delete a todo by ID
     * @route   DELETE /api/v1/todo/:id
     * @param   {string} req.params.id - The ID of the todo
     * @access  Private
     */
    deleteTodoById = asyncHandler(async (req, res, next) => {
        console.log("Delete Todo By ID");
        const todo = await this.todoService.deleteTodoById(req.params.id);
        res.status(200).json(successResponse(todo));
    });
}

module.exports = TodoController;
