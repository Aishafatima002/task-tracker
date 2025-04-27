import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);
