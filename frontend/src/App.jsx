import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import LoginForm from './components/componnets/Login';
import RegisterForm from './components/componnets/signup';
import TaskBoard from './components/TaskBoard';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const user = useSelector((state) => state.user.user);
  const [showTaskForm, setShowTaskForm] = React.useState(false);

  const handleCreateClick = () => {
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
  };

  return (
    <BrowserRouter>
      {user && <Navbar onCreateClick={handleCreateClick} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route
          path="/tasks"
          element={
            user ? (
              <TaskBoard showTaskForm={showTaskForm} onCloseForm={handleCloseForm} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {user && <Footer />}
    </BrowserRouter>
  );
}

export default App;




