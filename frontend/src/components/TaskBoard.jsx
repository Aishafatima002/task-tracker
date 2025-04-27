import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask } from '../store/taskSlice';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import Sidebar from './Sidebar';

const TaskBoard = ({ showTaskForm, onCloseForm }) => {
  const dispatch = useDispatch();
  const { tasks, status, error, operationStatus } = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === 'To Do');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const doneTasks = tasks.filter(task => task.status === 'Done');

  const handleSubmit = async (taskData) => {
    if (!user || !user._id) {
      console.error('User not authenticated');
      return;
    }
    const taskDataWithUser = { ...taskData, createdBy: user._id };
    await dispatch(createTask(taskDataWithUser));
    onCloseForm();
  };

  if (status === 'loading') {
    return <div className="p-4 text-center">Loading tasks...</div>;
  }

  if (status === 'failed') {
    return <div className="p-4 bg-red-100 text-red-700">Error loading tasks: {error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#ffe5d4] via-[#fdbba1] to-[#fb8c5d]">
      <aside className="hidden md:flex">
        <Sidebar />
      </aside>
      <main className="flex-1 p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-[#4b5563] mb-4 md:mb-0">Task Board</h2>
        </div>

        {showTaskForm && (
          <TaskForm
            onSubmit={handleSubmit}
            onCancel={onCloseForm}
            loading={operationStatus === 'loading'}
            error={error}
          />
        )}

        {/* Three-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md border border-[#e5e7eb]">
            <h3 className="font-semibold text-xl mb-5 text-[#9ca3af]">To Do ({todoTasks.length})</h3>
            {todoTasks.length > 0 ? (
              todoTasks.map(task => <TaskCard key={task._id} task={task} />)
            ) : (
              <p className="text-[#6b7280]">No tasks</p>
            )}
          </div>

          {/* In Progress Column */}
          <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md border border-[#e5e7eb]">
            <h3 className="font-semibold text-xl mb-5 text-[#9ca3af]">In Progress ({inProgressTasks.length})</h3>
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map(task => <TaskCard key={task._id} task={task} />)
            ) : (
              <p className="text-[#6b7280]">No tasks</p>
            )}
          </div>

          {/* Done Column */}
          <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md border border-[#e5e7eb]">
            <h3 className="font-semibold text-xl mb-5 text-[#9ca3af]">Done ({doneTasks.length})</h3>
            {doneTasks.length > 0 ? (
              doneTasks.map(task => <TaskCard key={task._id} task={task} />)
            ) : (
              <p className="text-[#6b7280]">No tasks</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskBoard;
