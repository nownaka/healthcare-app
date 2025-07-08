import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../../config"

/* ---------- 型 ---------- */
export type UserInfo = { user_id: number; email: string; name: string };

/* ---------- Context ---------- */
type UserContextType = {
  user: UserInfo | null | undefined;
  refetchUser: () => void;
  clearUserCache: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

/* ---------- 現在ログイン中のユーザーを取得 ---------- */
const fetchCurrentUser = async (): Promise<UserInfo | null> => {
  try {
    const { data: basic } = await axios.get(
      `${config.backendAPIBaseUrl}/api/userinfo/`,
      {
        withCredentials: true,
        headers: { Accept: "application/json" },
      }
    );

    const { data: detail } = await axios.get(
      `${config.backendAPIBaseUrl}/api/user-profiles/${basic.user_id}/`,
      { withCredentials: true, headers: { Accept: "application/json" } }
    );

    return { user_id: basic.user_id, email: basic.email, name: detail.name };
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      // 未ログイン
      return null;
    }
    throw err; // それ以外は例外として上層へ
  }
};

/* ---------- Provider ---------- */
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  
  const { data, refetch } = useQuery<UserInfo | null>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 0,
    gcTime: 0,                  // キャッシュを即座に削除（新しいReact Queryでは gcTime）
    refetchOnMount: "always",    // マウントごとに必ず再フェッチ
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,    // 再接続時にリフェッチ

  });

  const refetchUser = async () => {
    // より確実にリフェッチを実行
    await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    await refetch();
  };

  const clearUserCache = async () => {
    // より確実にキャッシュをクリア
    queryClient.removeQueries({ queryKey: ["currentUser"] });
    queryClient.setQueryData(["currentUser"], null);
    await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  };

  const contextValue: UserContextType = {
    user: data,
    refetchUser,
    clearUserCache,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

/* ---------- フック ---------- */
const DEFAULT_USER: UserInfo = { user_id: 0, email: "", name: "" };

export const useFetchUser = () => {
  const ctx = useContext(UserContext);
  
  if (!ctx) {
    throw new Error("useFetchUser must be used within UserProvider");
  }

  const { user, refetchUser, clearUserCache } = ctx;

  const isLoaded = user !== undefined; // フェッチ完了?
  const isLoggedIn = user !== null && user !== undefined; // 認証済み?

  const userData = user ?? DEFAULT_USER; // ダミーユーザー

  return { 
    ...userData, 
    isLoaded, 
    isLoggedIn, 
    refetchUser, 
    clearUserCache 
  };
};
