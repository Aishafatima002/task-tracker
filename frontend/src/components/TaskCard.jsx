import React from 'react';

const TaskCard = ({ task, onMove }) => {
  const { title, description, assignedTo, status } = task;

  const handleMove = (newStatus) => {
    onMove(task._id, newStatus);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-xs text-gray-500 mt-2">Assigned: {assignedTo?.name || 'Unassigned'}</p>
      <div className="mt-3 flex space-x-2">
        {status !== 'To Do' && (
          <button
            onClick={() => handleMove('To Do')}
            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-xs"
          >
            Move to To Do
          </button>
        )}
        {status !== 'In Progress' && (
          <button
            onClick={() => handleMove('In Progress')}
            className="px-2 py-1 bg-blue-300 rounded hover:bg-blue-400 text-xs"
          >
            Move to In Progress
          </button>
        )}
        {status !== 'Done' && (
          <button
            onClick={() => handleMove('Done')}
            className="px-2 py-1 bg-green-300 rounded hover:bg-green-400 text-xs"
          >
            Move to Done
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
