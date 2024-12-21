// Instantiate Repositories
const AuthRepository = require('./repositories/auth');
const UserRepository = require('./repositories/auth');
const TodoRepository = require('./repositories/todo');
const ActivityLogsRepository = require('./repositories/activityLogs');

// Instantiate Services
const AuthService = require('./services/auth');
const UserService = require('./services/user');
const ActivityLogsService = require('./services/activityLogs');
const TodoService = require('./services/todo');

// Instantiate Controllers
const AuthController = require('./controllers/auth');
const UserController = require('./controllers/user');
const TodoController = require('./controllers/todo');
const ActivityLogsController = require('./controllers/activityLogs');

// Create instances of repositories
const authRepository = new AuthRepository();
const userRepository = new UserRepository();
const todoRepository = new TodoRepository();
const activityLogsRepository = new ActivityLogsRepository();

// Create instances of services
const authService = new AuthService(authRepository);
const userService = new UserService(userRepository);
const activityLogsService = new ActivityLogsService(activityLogsRepository);
const todoService = new TodoService(todoRepository, activityLogsService); // Pass the dependency

// Create instances of controllers
const authController = new AuthController(authService);
const userController = new UserController(userService);
const todoController = new TodoController(todoService);
const activityLogsController = new ActivityLogsController(activityLogsService);

module.exports = {
    authController,
    userController,
    todoController,
    activityLogsController,
};
