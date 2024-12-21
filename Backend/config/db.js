const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: true,
            dbName: process.env.MONGO_DATABASE_NAME
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch(error) {
        console.log(`MongoDB Error: ${error.message}`);
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;