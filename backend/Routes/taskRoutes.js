const express = require('express');
const router = express.Router();
const taskController = require('../Controller/taskController');
const auth = require("../Middleware/auth");
const Task = require('../Models/task');
const User = require('../Models/user');


   
// get task by id
router.get('/single/:id', taskController.getTaskById)

// Create a new task 
router.post('/create', auth, taskController.createTask)

// Get task by User Id
router.get('/dashboard',auth ,taskController.getUserTask)

// Update a task entry
router.put('/edit/:id', auth, taskController.editTask);

// Delete a task entry
router.delete('/delete/:id', auth, taskController.deleteTask);

module.exports = router;  