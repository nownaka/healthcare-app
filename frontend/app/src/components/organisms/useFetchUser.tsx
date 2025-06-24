import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/* ---------- 型 ---------- */
export type UserInfo = { user_id: number; email: string; name: string };

/* ---------- Context ---------- */
const UserContext = createContext<UserInfo | null | undefined>(undefined);

/* ---------- 現在ログイン中のユーザーを取得 ---------- */
const fetchCurrentUser = async (): Promise<UserInfo | null> => {
  try {
    const { data: basic } = await axios.get("http://localhost:8000/api/userinfo/", {
      withCredentials: true,
      headers: { Accept: "application/json" },
    });

    const { data: detail } = await axios.get(
      `http://localhost:8000/api/user-profiles/${basic.user_id}/`,
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
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data } = useQuery<UserInfo | null>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 分
  });

  // data = undefined (未フェッチ) | null (未ログイン) | UserInfo
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

/* ---------- フック ---------- */
const DEFAULT_USER: UserInfo = { user_id: 0, email: "", name: "" };

export const useFetchUser = () => {
  const ctx = useContext(UserContext); // undefined | null | UserInfo

  const isLoaded = ctx !== undefined;                       // フェッチ完了?
  const isLoggedIn = ctx !== null && ctx !== undefined;     // 認証済み?

  const user = ctx ?? DEFAULT_USER;                         // ダミーユーザー

  return { ...user, isLoaded, isLoggedIn };
};