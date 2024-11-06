import axios from 'axios';

const API_URL = 'http://localhost:4000/auth'; // Замените на URL вашего API

// Функция для регистрации пользователя
export const register = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Registration Error: ', error);
    throw error;
  }
};

// Функция для авторизации пользователя
export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Возвращаем данные, включая токен
  } catch (error) {
    console.error('Login Error: ', error);
    throw error;
  }
};
