// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { config } from "../../src/config";
import { useQueryClient } from "@tanstack/react-query";

/**
 * ログアウト処理を実行する関数
 * 1. クッキーからトークンを削除
 * 2. ローカルストレージからトークンを削除
 * 3. セッションストレージからトークンを削除
 */
const Logout = async (): Promise<boolean> =>{
  try {
    // クッキー削除（パス指定）
    // Cookies.remove("access_token", { path: "/" });
    // Cookies.remove("refresh_token", { path: "/" });

    // サーバーへログアウトリクエスト送信
    await fetch(`${config.backendAPIBaseUrl}/api/logout/`, {
      method: "POST",
      credentials: "include",
    });

    // ローカルストレージとセッションストレージを削除
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user_id");
    // sessionStorage.removeItem("refresh_token");

    // クッキーの削除はクッキーの登録と同じようにバックエンドからやらないといけない。

    alert("ログアウトしました。aaaaaaaaaaaaaaaaaa");
    console.log("Logged out successfully.");

    return true;
  } catch (error) {
    console.error("ログアウトに失敗しました:", error);
    return false;
  }
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logout = async (): Promise<boolean> => {
    const success = await Logout();
    if (success) {
      // React Query のキャッシュをクリア
      queryClient.clear();
      // ログイン画面へリダイレクト
      navigate("/");
      alert("ログアウトしました。");
    } else {
      alert("ログアウトに失敗しました。再度お試しください。");
    }
    return success;
  };

  return { logout };
};

export default useLogout;
