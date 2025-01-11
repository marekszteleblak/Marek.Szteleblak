const Task = require('../models/task');

// Create a new task
const createTask = async (req, res) => {
    const { title, description, date, category, completed } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const task = new Task({ title, description, date, category, completed });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, completed, category } = req.body;

        const task = await Task.findByIdAndUpdate(id, { title, description, date, completed, category }, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully', task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get task by id
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTask, getAllTasks, updateTask, deleteTask, getTaskById };
