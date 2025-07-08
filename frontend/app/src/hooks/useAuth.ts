import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchUser } from "../components/organisms/useFetchUser";
import { config } from "../../src/config";

interface UseAuthReturn {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export const useAuth = (): UseAuthReturn => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearUserCache, refetchUser } = useFetchUser();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${config.backendAPIBaseUrl}/api/token/`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // ログイン成功後、古いユーザー情報をクリアして新しい情報を取得
      await clearUserCache();
      await refetchUser();

      console.log("Logged in successfully.");
      navigate("/home");
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      setError("ログインに失敗しました。認証情報を確認してください。");
      navigate("/failure");
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ message: string }>(
        `${config.backendAPIBaseUrl}/api/register/`,
        { email, password }
      );
      console.log(response.data.message);
    } catch (error: any) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      setError("登録に失敗しました。入力内容を確認してください。");
    }
  };

  const logout = async () => {
    try {
      // HttpOnly Cookieの削除はバックエンドで行う
      await axios.post(
        `${config.backendAPIBaseUrl}/api/logout/`,
        {},
        { withCredentials: true }
      );
      
      // ログアウト後、ユーザー情報をクリア
      await clearUserCache();
      
      navigate("/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      setError("ログアウトに失敗しました。");
    }
  };

  return {
    login,
    register,
    logout,
    error,
  };
};
