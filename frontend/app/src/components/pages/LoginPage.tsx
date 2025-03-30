import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  // ログイン処理
  const handleLogin = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:8000/api/token/", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // HttpOnly Cookieを利用するために必要
      });

      // ホーム画面へ遷移する
      navigate("/home");
      console.log("Logged in successfully.");
    } catch (error) {
      setError(
        "ログインに失敗しました。メールアドレスまたはパスワードを確認してください。"
      );
    }
  };

  // 入力情報更新
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ログイン</h2>
      <form style={styles.form} onSubmit={handleLogin}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>メールアドレス</label>
          <input
            type="email"
            name="email"
            placeholder="例: example@email.com"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>パスワード</label>
          <input
            type="password"
            name="password"
            placeholder="パスワードを入力"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        {error && <span style={styles.error}>{error}</span>}
        <button type="submit" style={styles.button}>
          ログイン
        </button>
        <button
          type="button"
          style={styles.signupButton}
          onClick={() => navigate("/signup")}
        >
          サインアップ
        </button>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
  },
  signupButton: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#6c757d",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default LoginForm;
