import Task from '../models/Task.mjs';

// Create Task
export const createTask = async (req, res) => {
  const { title, description, assignedTo, status, createdBy } = req.body;
  
  try {
    const newTask = new Task({ title, description, assignedTo, status, createdBy });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('createdBy', 'name'); // Populate createdBy to get user name
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, assignedTo, status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Move Task (Update Status)
export const moveTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // New status (To Do, In Progress, Done)

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default { createTask, getAllTasks, updateTask, deleteTask, moveTask };