import axios from 'axios';

const API_URL = 'http://localhost:4000/auth'; // URL вашего API

// Утилита для обработки ошибок
const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || 'An error occurred';
    throw new Error(message);
  }
  throw error;
};

// Функция для регистрации пользователя
export const register = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Функция для авторизации пользователя
export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Функция для выхода пользователя
export const logout = async (): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true }); // Указываем withCredentials для cookie
    if (response.status === 200) {
      localStorage.removeItem('token'); // Удаляем токен из локального хранилища
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    handleApiError(error);
  }
};
