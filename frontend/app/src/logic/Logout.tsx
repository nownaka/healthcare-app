// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

/**
 * ログアウト処理を実行する関数
 * 1. クッキーからトークンを削除
 * 2. ローカルストレージからトークンを削除
 * 3. セッションストレージからトークンを削除
 */
export const logout = async () => {
  
  try {
    // クッキー削除（パス指定）
    // Cookies.remove("access_token", { path: "/" });
    // Cookies.remove("refresh_token", { path: "/" });

    // サーバーへログアウトリクエスト送信
    await fetch("http://localhost:8000/api/logout/", { method: "POST", credentials: "include" });

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
  return {
    logout
  };
};

export default useLogout;
