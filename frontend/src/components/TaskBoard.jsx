import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { fetchTasks, updateTaskStatus, createTask, updateTask } from '../store/taskSlice';

const TaskBoard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleMove = (taskId, newStatus) => {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  const handleCreateClick = () => {
    setEditTask(null);
    setShowForm(true);
  };

  const handleEditClick = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = (taskData) => {
    if (editTask) {
      dispatch(updateTask({ id: editTask._id, taskData }));
    } else {
      dispatch(createTask(taskData));
    }
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const groupedTasks = {
    'To Do': [],
    'In Progress': [],
    'Done': [],
  };

  tasks.forEach((task) => {
    if (groupedTasks[task.status]) {
      groupedTasks[task.status].push(task);
    }
  });

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Task Board</h1>
        <button
          onClick={handleCreateClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + New Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          initialData={editTask}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      <div className="flex space-x-4 mt-6">
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <div key={status} className="flex-1 bg-gray-100 p-4 rounded min-h-[400px]">
            <h2 className="text-xl font-bold mb-4">{status}</h2>
            {groupedTasks[status].map((task) => (
              <div key={task._id} onClick={() => handleEditClick(task)} className="cursor-pointer">
                <TaskCard task={task} onMove={handleMove} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;

