import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Используем Routes и Navigate
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const Dashboard: React.FC = () => {
  return <h2>Welcome to the Dashboard</h2>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/*<Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />*/}
          <Route path="/" element={<Navigate to="/login" />} />  {/* Используем Navigate для редиректа */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
