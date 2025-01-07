import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  // 状態管理: 型を明確にする
  const [email, setEmail] = useState<string>(''); // username を email に変更
  const [password, setPassword] = useState<string>('');

  // ログイン処理関数
  const handleLogin = async () => {
    try {
      const response = await axios.post<{ access: string; refresh: string }>(
        'http://localhost:8000/api/token/',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } } // ヘッダーを明示的に指定
      );
  
      // トークンをログに出力（後で保存処理を追加する）
      console.log('Access Token:', response.data.access);
      console.log('Refresh Token:', response.data.refresh);
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
