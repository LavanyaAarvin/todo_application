const mongoose = require('mongoose');
const Constants = require('./utils/constants');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do',
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    id: false,
});

module.exports = mongoose.model(Constants.TODO, TodoSchema);
