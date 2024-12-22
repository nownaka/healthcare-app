import React, { useState } from "react";
import "./LoginPage.css";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("すべてのフィールドを入力してください");
      return;
    }

    if (email === "test@example.com" && password === "password123")     {
      alert("ログイン成功！");
    } else {
      setError("メールアドレスまたはパスワードが間違っています");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1>ログイン</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <Input type="email" value={email} placeholder="Emailを入力してください" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <Input type="password" value={password} placeholder="パスワードを入力してください" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button label="ログイン" type="submit" className="login-button" onClick={undefined} />
      </form>
    </div>
  );
};

export default LoginPage;
