const request = require('supertest');
const { app } = require('../server');
const TodoController = require('../controllers/todo');
const TodoService = require('../services/todo');

describe('TodoController', () => {
  let todoController;
  let todoService;

  beforeEach(() => {
    todoService = new TodoService();
    todoController = new TodoController(todoService);
  });

  describe('POST /api/v1/todo', () => {
    it('should create a new todo', async () => {
      // Mock the todoService.createTodo method
      const mockTodo = { title: 'Test Todo', createdBy: '12345' };
      todoService.createTodo = jest.fn().mockResolvedValue(mockTodo);

      const response = await request(app)
        .post('/api/v1/todo')
        .set('Authorization', 'Bearer token') 
        .send({
          title: 'Test Todo',
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockTodo);
    });

    it('should return an error if todo creation fails', async () => {
      todoService.createTodo = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .post('/api/v1/todo')
        .set('Authorization', 'Bearer token')
        .send({
          title: 'Test Todo',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Error creating todo');
    });
  });

  describe('GET /api/v1/todo', () => {
    it('should return all todos', async () => {
      const mockTodos = [{ title: 'Test Todo 1' }, { title: 'Test Todo 2' }];
      todoService.getAllTodos = jest.fn().mockResolvedValue(mockTodos);

      const response = await request(app)
        .get('/api/v1/todo')
        .set('Authorization', 'Bearer token');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockTodos);
    });
  });

  describe('GET /api/v1/todo/:id', () => {
    it('should return a todo by ID', async () => {
      const mockTodo = { title: 'Test Todo', _id: '1' };
      todoService.getTodoById = jest.fn().mockResolvedValue(mockTodo);

      const response = await request(app)
        .get('/api/v1/todo/1')
        .set('Authorization', 'Bearer token');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockTodo);
    });

    it('should return 404 if todo not found', async () => {
      todoService.getTodoById = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .get('/api/v1/todo/1')
        .set('Authorization', 'Bearer token');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Todo not found');
    });
  });

  describe('PUT /api/v1/todo/:id', () => {
    it('should update a todo by ID', async () => {
      const mockTodo = { title: 'Updated Todo', _id: '1' };
      todoService.updateTodoById = jest.fn().mockResolvedValue(mockTodo);

      const response = await request(app)
        .put('/api/v1/todo/1')
        .set('Authorization', 'Bearer token')
        .send({
          title: 'Updated Todo',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockTodo);
    });
  });

  describe('DELETE /api/v1/todo/:id', () => {
    it('should delete a todo by ID', async () => {
      const mockTodo = { title: 'Test Todo', _id: '1' };
      todoService.deleteTodoById = jest.fn().mockResolvedValue(mockTodo);

      const response = await request(app)
        .delete('/api/v1/todo/1')
        .set('Authorization', 'Bearer token');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockTodo);
    });

    it('should return an error if todo deletion fails', async () => {
      todoService.deleteTodoById = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/v1/todo/1')
        .set('Authorization', 'Bearer token');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Todo not found');
    });
  });
});
