const mongoose = require('mongoose');

// Define schema for tasks
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Incomplete', 'Completed', 'In Progress'],
        default: 'Incomplete'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
   
    
  
    
});

// Create Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
