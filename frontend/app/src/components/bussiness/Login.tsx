import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../viewpage/LoginForm"; // ファイルパスは実際の構成に合わせて調整

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // 入力値管理
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      navigate("/success"); // ログイン成功時の画面推移
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
    <div>
      <LoginForm
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
        errorMessage={error || ""}
      />
      <p>
        アカウントをお持ちでないですか？{" "}
        <Link to="/register">登録はこちら</Link>
      </p>
    </div>
  );
};

export default Login;
