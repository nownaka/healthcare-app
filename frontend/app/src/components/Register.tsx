// register.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  // 状態管理: 型を明確にする
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // 登録処理関数
  const handleRegister = async () => {
    try {
      // リクエストの型とレスポンスの型を定義
      const response = await axios.post<{ user: string }>('http://localhost:8000/api/register/', {
        username,
        password,
      });
      console.log(response.data.user);
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;