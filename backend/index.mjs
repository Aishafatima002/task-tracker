import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from './db/index.mjs';
import authRoutes from './Routes/userRoute.mjs';
import taskRoutes from './Routes/TaskRoute.mjs';



// Initialize the app
const app = express();

// Load environment variables
dotenv.config();

// Connect to the database
connectToDB();

// Middleware setup
; // Secure HTTP headers
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173', 'https://task-tracker-one-tau.vercel.app'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(express.json()); // Parse JSON bodies

// Rate limiting for login and signup


// // Use the user routes
// app.use('/api/salaries', salaryRoutes);
// app.use('/api/auth', userRoutes);

// Default route for logging
app.use('/', (req, res, next) => {
  console.log('Request URL:', req.url, 'method: ', req.method);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Routes
app.use("/api/auth", authRoutes);
app.use('/api', taskRoutes);

// Global error handlers for better diagnostics
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception thrown:', error);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

