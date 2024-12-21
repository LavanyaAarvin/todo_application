const mongoose = require('mongoose');
const Constants = require('./utils/constants');


const ActivityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: ['CREATE', 'UPDATE', 'DELETE', 'MARK_COMPLETED'],
  },
  todoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo',
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    id: false,
});

ActivityLogSchema.virtual('userDetails', {
  ref: 'User', 
  localField: 'userId', 
  foreignField: '_id', 
  justOne: false, 
});

ActivityLogSchema.virtual('todoDetails', {
  ref: 'Todo', 
  localField: 'todoId', 
  foreignField: '_id', 
  justOne: false,
});


module.exports = mongoose.model(Constants.ACTIVITYLOGS, ActivityLogSchema);
