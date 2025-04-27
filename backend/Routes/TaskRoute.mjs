import { Router } from "express";
import { createTask, getTask, updateTask, deleteTask, updateTaskStatus } from "../Controller/Task.mjs";     

const router = Router();    

router.post('/', createTask);
router.get('/', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.put('/:id/status', updateTaskStatus);

export default router