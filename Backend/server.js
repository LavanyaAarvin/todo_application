const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const errorHandler = require('./middleware/errorHandler');
const { Server } = require('socket.io');

//Load env
dotenv.config({path: './config/.env'});

const connectDB = require('./config/db');
require('./bootstrap');  // Initialize and wire up dependencies
connectDB();

const app = express();

// Create an HTTP server for Express
const http = require('http');
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(cors());

// Routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const activityLogsRoutes = require('./routes/activityLogs');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/todo', todoRoutes);
app.use('/api/v1/activity-logs', activityLogsRoutes);

// Error Handler (use before routes)
app.use(errorHandler);

// Handle Socket.IO events
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle custom events
  socket.on('message', (data) => {
    console.log(`Message received: ${data}`);
    io.emit('message', `Server: Received "${data}"`);
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
