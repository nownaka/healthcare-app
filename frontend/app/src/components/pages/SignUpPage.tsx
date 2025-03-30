import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    height: "",
    weight: "",
    goal: "",
  });

  const navigate = useNavigate();

  // Sign Up 処理
  const handleSignUp = async (formEvent: React.FormEvent) => {
    // フォームのデフォルト送信を防止
    formEvent.preventDefault();

    try {
      // 情報登録
      const resisterResponse = await axios.post<{ message: string }>(
        "http://localhost:8000/api/register/",
        formData
      );
      console.log(resisterResponse.data.message);

      // トークン取得
      const token = await axios.post(
        "http://localhost:8000/api/token/",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // HttpOnly Cookieを利用するために必要
        }
      );

      // ホーム画面へ遷移する。
      navigate("/home");

      // HttpOnly Cookieにトークンがセットされるので、localStorageへの保存は不要
      console.log("Logged in successfully.");
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response?.data || "Unknown error"
      );
    }
  };

  const [errors, setErrors] = useState({
    height: "",
    weight: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 数値入力の検証
    if ((name === "height" || name === "weight") && value) {
      const numericValue = parseFloat(value);

      if (numericValue <= 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${
            name === "height" ? "身長" : "体重"
          }は1以上の値を入力してください。`,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const placeholders: { [key in keyof typeof formData]: string } = {
    nickname: "例: Taro123",
    email: "例: example@email.com",
    password: "パスワードを入力",
    height: "例: 170.5",
    weight: "例: 65.5",
    goal: "例: ダイエット",
  };

  const labels: { [key in keyof typeof formData]: string } = {
    nickname: "ニックネーム",
    email: "メールアドレス",
    password: "パスワード",
    height: "身長",
    weight: "体重",
    goal: "目標",
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>サインアップ</h2>
      <form style={styles.form} onSubmit={handleSignUp}>
        {(Object.keys(formData) as Array<keyof typeof formData>).map((key) => {
          // 身長と体重の場合
          if (key === "height" || key === "weight") {
            return (
              <div key={key} style={styles.inputContainer}>
                <label style={styles.label}>{labels[key]}</label>
                <div style={styles.inputWithUnitContainer}>
                  <input
                    type="number"
                    name={key}
                    placeholder={placeholders[key]}
                    value={formData[key]}
                    onChange={handleChange}
                    step="0.1"
                    min="0.1"
                    style={styles.input}
                  />
                  <span style={styles.unit}>
                    {key === "height" ? "cm" : "kg"}
                  </span>
                </div>
                {errors[key] && <span style={styles.error}>{errors[key]}</span>}
              </div>
            );
          }
          // それ以外
          return (
            <div key={key} style={styles.inputContainer}>
              <label style={styles.label}>{labels[key]}</label>
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                placeholder={placeholders[key]}
                value={formData[key]}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          );
        })}
        <button type="submit" style={styles.button}>
          登録
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
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
    flexDirection: "column" as const,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column" as const,
    marginBottom: "10px",
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  inputWithUnitContainer: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    flex: 1,
  },
  unit: {
    marginLeft: "5px",
    fontSize: "14px",
    color: "#555",
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
  },
};

export default SignupForm;
