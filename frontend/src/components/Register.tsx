import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';  // Используем useNavigate вместо useHistory
import { register } from '../api/auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Создаём навигатор

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(email, password);
      console.log('Registered successfully:', response);
      navigate('/login'); // Перенаправление на страницу логина с помощью navigate
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
          <div className="text-center mt-3">
            <span>Do you have account? </span>
            <Link to="/login">Login</Link>
          </div>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default Register;
