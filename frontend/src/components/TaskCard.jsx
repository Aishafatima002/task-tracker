import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask, moveTask, resetOperationStatus } from '../store/taskSlice';

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const { operationStatus } = useSelector((state) => state.tasks);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(task.description);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdateStatus = async (status) => {
    await dispatch(moveTask({ id: task._id, status }));
    dispatch(resetOperationStatus());
  };

  const handleDelete = async () => {
    await dispatch(deleteTask(task._id));
    dispatch(resetOperationStatus());
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      const updatedTask = {
        id: task._id,
        title: updatedTitle,
        description: updatedDescription,
      };
      await dispatch(updateTask(updatedTask));
      dispatch(resetOperationStatus());
    }
    setIsEditing(!isEditing);
  };

  const getStatusButton = (targetStatus, label, colorClass) => {
    if (task.status === targetStatus) return null;

    return (
      <button
        onClick={() => handleUpdateStatus(targetStatus)}
        className={`px-3 py-1 rounded mr-2 ${colorClass} text-white disabled:opacity-50`}
        disabled={operationStatus === 'loading'}
      >
        {operationStatus === 'loading' ? '...' : label}
      </button>
    );
  };

  const handleStatusChange = async (taskId, status) => {
    await handleUpdateStatus(status);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="border p-2 w-full mb-2"
            disabled={operationStatus === 'loading'}
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="border p-2 w-full mb-2"
            disabled={operationStatus === 'loading'}
          />
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
        </>
      )}

      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            task.status === 'To Do'
              ? 'bg-blue-100 text-blue-800'
              : task.status === 'In Progress'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {task.status}
        </span>

        <div className="flex items-center space-x-2">
          {!isEditing && (
            <>
              {getStatusButton('In Progress', 'Start', 'bg-yellow-500')}
              {getStatusButton('Done', 'Complete', 'bg-green-500')}
            </>
          )}

          <button
            onClick={handleEditToggle}
            className={`px-3 py-1 rounded mr-2 ${
              isEditing ? 'bg-blue-500' : 'bg-yellow-500'
            } text-white disabled:opacity-50`}
            disabled={operationStatus === 'loading'}
          >
            {operationStatus === 'loading' && isEditing
              ? 'Saving...'
              : isEditing
              ? 'Save'
              : 'Edit'}
          </button>

          {showDeleteConfirm ? (
            <div className="flex">
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-500 text-white rounded mr-2"
                disabled={operationStatus === 'loading'}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-3 py-1 bg-red-500 text-white rounded"
              disabled={operationStatus === 'loading'}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Status Change Buttons */}
      <div className="flex space-x-2 mt-2">
        {task.status !== 'In Progress' && (
          <button
            onClick={() => handleStatusChange(task._id, 'In Progress')}
            className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
            disabled={operationStatus === 'loading'}
          >
            {operationStatus === 'loading' ? 'Starting...' : 'Start Progress'}
          </button>
        )}
        {task.status !== 'Done' && (
          <button
            onClick={() => handleStatusChange(task._id, 'Done')}
            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
            disabled={operationStatus === 'loading'}
          >
            {operationStatus === 'loading' ? 'Marking as Done...' : 'Mark Done'}
          </button>
        )}
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired,
    assignedTo: PropTypes.object,
  }).isRequired,
};

export default TaskCard;



