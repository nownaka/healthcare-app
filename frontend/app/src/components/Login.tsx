import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  // 状態管理: 型を明確にする
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // ログイン処理関数
  const handleLogin = async () => {
    try {
      // リクエストの型とレスポンスの型を定義
      const response = await axios.post<{ user: string }>('http://localhost:8000/api/login/', {
        username,
        password,
      });
      console.log(response.data.user);
    } catch (error: any) {
      console.error('Login failed:', error.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
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
    </div>
  );
};

export default Login;