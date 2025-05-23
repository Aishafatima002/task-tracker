import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskForm = ({ onSubmit, onCancel, initialData = {}, loading, error }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [assignedTo, setAssignedTo] = useState(initialData.assignedTo?._id || '');
  const [status, setStatus] = useState(initialData.status || 'To Do');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, assignedTo, status });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{initialData._id ? 'Edit Task' : 'Create Task'}</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title*</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Description*</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Assigned To (User ID)</label>
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="User ID"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          disabled={loading}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Processing...' : initialData._id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default TaskForm;
