import { Router } from "express";
import { createTask, getTask, updateTask, deleteTask, updateTaskStatus } from "../Controller/Task.mjs";     
import tokenVerification from '../Middleware/tokenVerification.mjs';

const router = Router();    

router.post('/', tokenVerification, createTask);
router.get('/:id', tokenVerification, getTask);
router.get('/', tokenVerification, async (req, res, next) => {
  // Assuming you want to get all tasks here
  try {
    const tasks = await import('../Controller/Task.mjs').then(mod => mod.getTasks(req, res, next));
  } catch (error) {
    next(error);
  }
});
router.put('/:id', tokenVerification, updateTask);
router.delete('/:id', tokenVerification, deleteTask);
router.put('/:id/status', tokenVerification, updateTaskStatus);

export default router
