import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onCreateClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-[#ffe5d4] via-[#fdbba1] to-[#fb8c5d] p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold text-[#4b5563]">Task Management</div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onCreateClick}
          className="bg-[#f45a2b] hover:bg-[#d94a24] text-white font-semibold px-4 py-2 rounded transition duration-300"
        >
          Create Task
        </button>
        <button
          onClick={handleLogout}
          className="bg-[#4b5563] hover:bg-[#374151] text-white font-semibold px-4 py-2 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
