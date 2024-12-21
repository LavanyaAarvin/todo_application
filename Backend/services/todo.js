const BaseService = require('./baseService');
const ErrorResponse = require('../utils/errorResponse');

class TodoService extends BaseService {

    constructor(repository, activityLogsService) {
        super(repository);
        this.activityLogsService = activityLogsService;
    }


    // Create a new todo
    async createTodo(todoData) {
        const result = await this.repository.create(todoData);
        const userId = todoData.createdBy
        await this.activityLogsService.createActivityLog({
            userId,
            action: 'CREATE',
            todoId: result._id,
        });
        return result
    }

    async getTodoById(id) {
        const todo = await this.repository.findById(id);
        if (!todo) {
            throw new ErrorResponse(`No todo found with id of ${id}`, 404);
        }  
        return todo
    }

    async updateTodoById(id, data) {
        const existingTodo = await this.repository.findById(id);
        if (!existingTodo) {
            throw new ErrorResponse(`No todo found with id of ${id}`, 404);
        }
        const updatedTodo = await this.repository.updateById(id, data);
        const userId = existingTodo.createdBy;
        await this.activityLogsService.createActivityLog({
            userId,
            action: 'UPDATE',
            todoId: id,
        });
        return updatedTodo
    }

    async deleteTodoById(id) {
        const existingTodo = await this.repository.findById(id);
        if (!existingTodo) {
            throw new ErrorResponse(`No todo found with id of ${id}`, 404);
        }
        const updatedTodo = await this.repository.deleteById(id);
        const userId = existingTodo.createdBy;
        await this.activityLogsService.createActivityLog({
            userId,
            action: 'DELETE',
            todoId: id,
        });
        return updatedTodo
    }

}

module.exports = TodoService;
