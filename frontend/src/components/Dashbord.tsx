import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			// Отправляем запрос на сервер
			const response = await fetch('http://localhost:4000/auth/logout', {
				method: 'POST',
				credentials: 'include', // Отправляем cookie, если они используются
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				// Удаляем токен из localStorage (если он там есть)
				localStorage.removeItem('token');

				// Перенаправляем на страницу входа
				navigate('/login');
			} else {
				const errorData = await response.json();
				console.error('Logout failed:', errorData.message || 'Unknown error');
				alert('Failed to log out. Please try again.');
			}
		} catch (error) {
			console.error('Error during logout:', error);
			alert('An error occurred during logout. Please try again later.');
		}
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

export default Dashboard;
