import Cookies from "js-cookie";

/**
 * ログアウト処理を実行する関数
 * 1. クッキーからトークンを削除
 */
export const logout = () => {
  try {

    // フロントエンドからアクセス可能なクッキーの場合は以下のコードで削除
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
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
