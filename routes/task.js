const express = require('express');
const router = express.Router();
const Task = require('../models/task.model');
const User = require('../models/auth.model');
const {authenticate}=require("../middleware/authenticate")
const validateTaskData=require("../middleware/validation")



// Create a new task
router.post('/', authenticate,validateTaskData, async (req, res) => {
    try {
        req.body.createdBy = req.userId; // Add the userId to the createdBy field inside req.body

        const task = new Task(req.body);
        await task.save();

        // Add the ID of the newly created task to the user's tasks array
        await User.findByIdAndUpdate(req.userId, { $push: { tasks: task._id } });

        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Retrieve a list of all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id',authenticate, async (req, res) => {

    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


})

router.patch('/:id',authenticate, async (req, res) => {
    const taskId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId }, // Filter criteria
            updateFields, // Update fields
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/:id',authenticate, async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await Task.findOneAndDelete({ _id: taskId });

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted', deletedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
