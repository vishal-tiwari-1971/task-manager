const Task = require('../Models/task');
// const User = require('../model/user')
const mongoose = require('mongoose');
const path = require('path');
const auth = require('../Middleware/auth');

// Get all task entries
// exports.getAllEntries = async (req, res) => {
//     try {
//         const journals = await Journal.find({ complition: "public" });
//         return res.status(200).json(journals);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send("Error retrieving journal entries.");
//     }
// };

// Get journal entries by id
// exports.getEntryById = async (req, res) => {
//     try {
//         const journals = await Journal.findById(req.params.id);

//         return res.status(200).json(journals);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send("Error retrieving journal entries.");
//     }
// };

// Get journal by User Id
exports.getUserTask = [auth, async (req, res) => {
    try {
        const userId = req.user.id
        console.log("Received userId:", userId);

        if (!(mongoose.Types.ObjectId.isValid(userId))) {
            return res.status(400).json({ error: 'Invalid userId format' });
        }

        // Query the database for journals
        const tasks = await Task.find({ userId });
        return res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error retrieving tasks");
    }
}];

// Create a new task
exports.createTask = async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const { title, description, complition } = req.body;

        if (!(title && description)) {
            return res.status(400).send("title and description are required.");
        }

      const task = await Task.create({
            title,
            description,
            complition, 
            userId: req.user.id
        });

        return res.status(201).json(task);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error creating task");
    }
};

// Update a task
exports.editTask = async (req, res) => {
    try {
        console.log('Received data:', req.body);
        
        const { title, description, complition } = req.body;
        const { id } = req.params;
        console.log("id:",id);
        

        // Validate task ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid task ID format.' });
        }

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        // Authorization check
        // if (journal.userId.toString() !== req.user.id) {
        //     return res.status(403).json({ message: 'You are not authorized to update this entry.' });
        // }

        // Update fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.complition = complition || task.complition;

        await task.save();
        return res.status(200).json(task);
    } catch (error) {
        console.error('Error updating task', error);
        return res.status(500).json({ message: 'Error updating task entry.' });
    }
};

// Delete a task 
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Id:",id);
        

        // Validate task ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid task ID format.' });
        }

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'task not found.' });
        }

        // Delete task entry
        await Task.findByIdAndDelete(id);
        return res.status(200).json({ message: 'task entry deleted successfully.' });
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ message: 'Error deleting the task' });
    }
};