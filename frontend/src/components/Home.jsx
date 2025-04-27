import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Task Tracker</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
