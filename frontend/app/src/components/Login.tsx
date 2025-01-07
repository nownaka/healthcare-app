import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  // 状態管理: 型を明確にする
  const [email, setEmail] = useState<string>(''); // username を email に変更
  const [password, setPassword] = useState<string>('');

  // ログイン処理関数
  const handleLogin = async () => {
    try {
      // リクエストの型とレスポンスの型を定義
      const response = await axios.post<{ access: string; refresh: string }>('http://localhost:8000/api/token/', {
        email, // フィールド名を email に変更
        password,
      });

      // トークンをログに出力（実際には保存処理を追加する必要があります）
      console.log('Access Token:', response.data.access);
      console.log('Refresh Token:', response.data.refresh);
    } catch (error: any) {
      console.error('Login failed:', error.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>Email:</label> {/* UI を変更 */}
      <input
        type="email" // 入力タイプを email に変更
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} // setUsername を setEmail に変更
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
