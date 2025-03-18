import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UseAuthReturn {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export const useAuth = (): UseAuthReturn => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/token/',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log('Logged in successfully.');
      navigate('/home');
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      setError('ログインに失敗しました。認証情報を確認してください。');
      navigate('/failure');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ message: string }>(
        'http://localhost:8000/api/register/',
        { email, password }
      );
      console.log(response.data.message);
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      setError('登録に失敗しました。入力内容を確認してください。');
    }
  };

  const logout = () => {
    try {
      // HttpOnly Cookieの削除はバックエンドで行う
      axios.post('http://localhost:8000/api/logout/', {}, { withCredentials: true });
      navigate('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      setError('ログアウトに失敗しました。');
    }
  };

  return {
    login,
    register,
    logout,
    error,
  };
};
