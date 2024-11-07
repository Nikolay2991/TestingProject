import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Импортируем Link
import { login } from '../api/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.access_token);
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}

          {/* Добавляем ссылку на регистрацию */}
          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <Link to="/register">Registeration</Link>
          </div>
        </div>
      </div>
  );
};

export default Login;
