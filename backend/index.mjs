import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from './db/index.mjs';
import authRoutes from './Routes/userRoute.mjs';
import taskRoutes from './Routes/TaskRoute.mjs';

const app = express();

dotenv.config();

(async () => {
  try {
    await connectToDB();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }

  app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173', 'https://task-tracker-one-tau.vercel.app'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));
  app.use(express.json());

  app.use('/', (req, res, next) => {
    console.log('Request URL:', req.url, 'method: ', req.method);
    next();
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
  });

  app.use("/api/auth", authRoutes);
  app.use('/api', taskRoutes);

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception thrown:', error);
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})();



