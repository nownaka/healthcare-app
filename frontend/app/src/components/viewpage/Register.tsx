import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  // 状態管理: 型を明確にする
  const [email, setEmail] = useState<string>(''); // username を email に変更
  const [password, setPassword] = useState<string>('');

  // 登録処理関数
  const handleRegister = async () => {
    try {
      // リクエストの型とレスポンスの型を定義
      const response = await axios.post<{ message: string }>('http://localhost:8000/api/register/', {
        email, // フィールド名を email に変更
        password,
      });
      console.log(response.data.message);
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data || 'Unknown error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <label>Email:</label> {/* UI も変更 */}
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
