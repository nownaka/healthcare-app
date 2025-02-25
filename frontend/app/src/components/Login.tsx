import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';

const Login: React.FC = () => {
  // 状態管理: 型を明確にする
  const [email, setEmail] = useState<string>(''); // username を email に変更
  const [password, setPassword] = useState<string>('');
  const [protectedData, setProtectedData] = useState<string | null>(null);
  const navigate = useNavigate();

  // ログイン処理関数
  const handleLogin = async () => {
    try {
      const response = await axios.post<{ access: string; refresh: string }>(
        'http://localhost:8000/api/token/',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } } // ヘッダーを明示的に指定
      );

      const { access, refresh } = response.data;
      // トークンを localStorage に保存
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // トークンをログに出力（後で保存処理を追加する）
      console.log('Access Token:', response.data.access);
      console.log('Refresh Token:', response.data.refresh);
      navigate('/success');
    } catch (error: any) {
      if (error.response) {
        navigate('/failure');
        console.error('Status Code:', error.response.status);
        console.error('Error Data:', error.response.data);
      } else {
        navigate('/failure');
        console.error('Unknown Error:', error);
      }
    }
  };

  const handleProtectedRequest = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Access token not found. Please login first.');
      return;
    }
    
    try {
      const response = await axios.get('http://localhost:8000/api/protected/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Protected Data:', response.data);
      setProtectedData(JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      if (error.response) {
        console.error('Status Code:', error.response.status);
        console.error('Error Data:', error.response.data);
      } else {
        console.error('Unknown Error:', error);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <br />
      {/* 登録ページへのリンクを追加 */}
      <p>
        アカウントをお持ちでないですか？{' '}
        <Link to="/register">登録はこちら</Link>
      </p>
    </div>
  );
};

export default Login;
