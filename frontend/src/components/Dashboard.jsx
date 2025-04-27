import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#ffe5d4] via-[#fdbba1] to-[#fb8c5d] p-6 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md border border-[#e5e7eb]">
        <h1 className="text-3xl font-bold mb-6 text-[#4b5563]">Dashboard</h1>
        <p className="text-xl mb-4 text-[#9ca3af]">Welcome, <span className="font-semibold">{user?.name || 'User'}</span>!</p>
        <button
          onClick={handleLogout}
          className="w-full bg-[#f45a2b] hover:bg-[#d94a24] text-white font-semibold py-2 px-4 rounded transition duration-300 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
