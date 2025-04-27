import React from 'react';
import { useSelector } from 'react-redux';
import { User } from 'lucide-react';

const Sidebar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <aside className="bg-gradient-to-b from-[#fdbba1] to-[#fb8c5d] text-[#4b5563] w-64 min-h-screen p-6 hidden md:flex flex-col">
      <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
        <User className="w-6 h-6" />
        <span>User Info</span>
      </h2>
      <div className="mb-4 flex items-center space-x-2">
        <User className="w-5 h-5" />
        <p className="text-xl">{user?.name || user?.username || 'User'}</p>
      </div>
      {/* Additional sidebar content can be added here */}
    </aside>
  );
};

export default Sidebar;
