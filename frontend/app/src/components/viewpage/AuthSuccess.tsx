import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();

  // ここでは、認証成功後の任意の処理や表示を実装できます
  return (
    <div>
      <h2>認証成功</h2>
      <p>ログインに成功しました。おめでとうございます！</p>
      <button onClick={() => navigate('/')}>ログアウト</button>
    </div>
  );
};

export default AuthSuccess;