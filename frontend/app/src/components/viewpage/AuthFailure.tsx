// src/components/AuthFailure.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthFailure: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>認証失敗</h2>
      <p>ログインに失敗しました。入力内容を確認して再度お試しください。</p>
      <button onClick={() => navigate('/')}>戻る</button>
    </div>
  );
};

export default AuthFailure;