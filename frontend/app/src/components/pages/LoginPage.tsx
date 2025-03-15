import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const LoginPage = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const navigate = useNavigate();

  const [email, setEmail] = useState<string>(""); // 入力値管理
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 登録処理関数
  const handleRegister = async () => {
    try {
      // リクエストの型とレスポンスの型を定義
      const response = await axios.post<{ message: string }>(
        "http://localhost:8000/api/register/",
        {
          email, // フィールド名を email に変更
          password,
        }
      );
      console.log(response.data.message);
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response?.data || "Unknown error"
      );
    }
  };

  // ログイン処理
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // HttpOnly Cookieを利用するために必要
        }
      );

      // HttpOnly Cookieにトークンがセットされるので、localStorageへの保存は不要
      console.log("Logged in successfully.");
      navigate("/home"); // ログイン成功時の画面推移
    } catch (error: any) {
      if (error.response) {
        console.error("Status Code:", error.response.status);
        console.error("Error Data:", error.response.data);
      } else {
        console.error("Unknown Error:", error);
      }
      setError("Login failed. Please check your credentials.");
      navigate("/failure"); // ログイン失敗時の画面推移
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1>ログイン</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <Input
            type="email"
            value={email}
            placeholder="Emailを入力してください"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <Input
            type="password"
            value={password}
            placeholder="パスワードを入力してください"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          label="ログイン"
          type="submit"
          className="login-button"
          onClick={handleLogin}
        />
        <Button
          label="サインアップ"
          type="submit"
          className="login-button"
          onClick={handleRegister}
        />
      </form>
    </div>
  );
};

export default LoginPage;
