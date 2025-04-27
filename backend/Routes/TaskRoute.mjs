import express from 'express';
import { createTask, getAllTasks, updateTask, deleteTask, moveTask } from '../Controller/Task.mjs';

const router = express.Router();

// Create Task
router.post('/tasks', createTask);

// Get All Tasks
router.get('/tasks', getAllTasks);

// Update Task
router.put('/tasks/:id', updateTask);

// Delete Task
router.delete('/tasks/:id', deleteTask);

// Move Task (Update Status)
router.put('/tasks/move/:id', moveTask);

export default router;

