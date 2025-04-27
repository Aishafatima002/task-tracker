import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for your backend API
const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/tasks`;

// Helper function for handling errors
const handleAsyncError = (error) => {
  console.error('API Error:', error);
  throw error.response?.data?.message || error.message || 'Something went wrong';
};

// Helper to get auth token from localStorage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token || null;
};

// Async Thunks for interacting with the backend API
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
    const response = await axios.get(apiUrl, config);
    return response.data;
  } catch (error) {
    return handleAsyncError(error);
  }
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
    const response = await axios.post(apiUrl, taskData, config);
    return response.data;
  } catch (error) {
    return handleAsyncError(error);
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData) => {
  try {
    const { id, ...updatedData } = taskData;
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
    const response = await axios.put(`${apiUrl}/${id}`, updatedData, config);
    return response.data;
  } catch (error) {
    return handleAsyncError(error);
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
    await axios.delete(`${apiUrl}/${id}`, config);
    return id;
  } catch (error) {
    return handleAsyncError(error);
  }
});

export const moveTask = createAsyncThunk('tasks/moveTask', async ({ id, status }) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
    const response = await axios.put(`${apiUrl}/move/${id}`, { status }, config);
    return response.data;
  } catch (error) {
    return handleAsyncError(error);
  }
});

const initialState = {
  tasks: [],
  status: 'idle', // loading, succeeded, failed
  error: null,
  operationStatus: 'idle', // for tracking create/update/delete/move operations
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetOperationStatus: (state) => {
      state.operationStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.operationStatus = 'loading';
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.operationStatus = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.operationStatus = 'failed';
        state.error = action.error.message;
      })
      
      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.operationStatus = 'loading';
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.operationStatus = 'succeeded';
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.operationStatus = 'failed';
        state.error = action.error.message;
      })
      
      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.operationStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.operationStatus = 'succeeded';
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.operationStatus = 'failed';
        state.error = action.error.message;
      })
      
      // Move Task
      .addCase(moveTask.pending, (state) => {
        state.operationStatus = 'loading';
        state.error = null;
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        state.operationStatus = 'succeeded';
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(moveTask.rejected, (state, action) => {
        state.operationStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetOperationStatus } = taskSlice.actions;

export default taskSlice.reducer;

