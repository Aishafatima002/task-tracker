// controllers/tasks.mjs
import Task from '../models/Task.mjs';
import ErrorResponse from '../utils/errorRespons.mjs';
import asyncHandler from '../Middleware/aysnc.mjs';


export const getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find().populate('assignedTo', 'name').populate('createdBy', 'name');
  
  res.status(200).json({
    success: true,
    data: tasks
  });
});


export const getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id).populate('assignedTo', 'name').populate('createdBy', 'name');

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: task
  });
});


export const createTask = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.createdBy = req.user.id;

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task
  });
});


export const updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner
  if (task.createdBy.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this task`, 401)
    );
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: task
  });
});


export const deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  
  if (task.createdBy.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this task`, 401)
    );
  }

  await task.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});


export const updateTaskStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  

  if (task.createdBy.toString() !== req.user.id && task.assignedTo.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this task`, 401)
    );
  }

  task.status = status;
  await task.save();

  res.status(200).json({
    success: true,
    data: task
  });
});
export default { createTask, getTask, updateTask, deleteTask, updateTaskStatus  }