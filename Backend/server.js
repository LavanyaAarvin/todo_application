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

//Load env
dotenv.config({path: './config/.env'});

const connectDB = require('./config/db');
require('./bootstrap');  // Initialize and wire up dependencies
connectDB();

const app = express();


app.use(express.json());
app.use(cookieParser());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());


const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const activityLogsRoutes = require('./routes/activityLogs');


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/todo', todoRoutes);
app.use('/api/v1/activity-logs', activityLogsRoutes);


//Error Handler ( use before routes )
app.use(errorHandler);

const PORT = process.env.PORT || 3001


const server = app.listen(PORT, () => {
    console.log(`Server is running in ${ process.env.NODE_ENV} mode on port ${PORT}`)
})

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
//    Close server $ exit process
    console.close(() => process.exit(1));
});

//Prevent XSS(Cross Site Scripting)
app.use(xss());