const Task = require('../models/Task');
const { taskValidation } = require('../utils/validation');

const createTask = async (req, res) => {
    const {error} = taskValidation(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    try {
        const task = new Task({
            ...req.body,
            user: req.user._id
        });

        await task.save();

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

const updateTask = async (req, res) => {
    const { error } = taskValidation(req.body);
    if (error) return res.status(400).json({message: error.message});

    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true },
        );

        if (!task) {
            return res.status(404).json({
                message: 'Task not found.'
            });
        }

        res.json({
            task,
            message: 'Task updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({message: "Task not found"})
        }

        res.json({
            task,
            message: 'Task deleted',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};