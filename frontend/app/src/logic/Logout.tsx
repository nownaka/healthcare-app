import Cookies from "js-cookie";

/**
 * ログアウト処理を実行する関数
 * 1. クッキーからトークンを削除
 * 2. ローカルストレージからトークンを削除
 * 3. セッションストレージからトークンを削除
 */
export const logout = async () => {
  try {
    // クッキー削除（パス指定）
    Cookies.remove("access_token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });

    // サーバーへログアウトリクエスト送信
    await fetch("/logout", { method: "POST", credentials: "include" });

    // ローカルストレージとセッションストレージを削除
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    alert("ログアウトしました。");
    console.log("Logged out successfully.");
    
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};


export const useLogout = () => {
  return {
    logout
  };
};

export default useLogout;
