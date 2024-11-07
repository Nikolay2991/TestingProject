import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';  // Используем Routes и Navigate
import Register from './components/Register';
import Login from './components/Login';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Удаляем токен из localStorage
    localStorage.removeItem('token');

    // Перенаправляем на страницу входа
    navigate('/login');
  };

  return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Dashboard</h2>
          <button onClick={handleLogout} className="btn btn-danger w-100">
            Logout
          </button>
        </div>
      </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" />} />  {/* Используем Navigate для редиректа */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
