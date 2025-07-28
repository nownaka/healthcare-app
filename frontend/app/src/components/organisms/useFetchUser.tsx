import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../../config"

/* ---------- 型 ---------- */
export type UserInfo = { user_id: number; email: string; name: string };

const POLL_INTERVAL = 5_000; // 5秒ごとに再取得

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

export function usePollingCurrentUser() {
  const queryClient = useQueryClient();

  // キャッシュにあれば初期値としてセット
  const [user, setUser] = useState<UserInfo | null | undefined>(
    () => queryClient.getQueryData<UserInfo | null>(["currentUser"])
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isLoggedIn = user !== null && user !== undefined;

  useEffect(() => {
    let mounted = true;

    const tick = async () => {
      try {
        // fetchQuery はキャッシュが古い場合のみ、あるいは常に → 新しい fetch を実行し、
        // キャッシュにも結果を入れてくれる
        await queryClient.fetchQuery<UserInfo | null>({
          queryKey: ["currentUser"],
          queryFn: fetchCurrentUser,
          retry: false,
        });
        if (!mounted) return;

        // キャッシュから最新データを読み出し
        const latest = queryClient.getQueryData<UserInfo | null>(["currentUser"]);
        setUser(latest);
        setIsLoaded(true);
      } catch {
        // 必要ならエラー処理
      }
    };

    // 最初の取得
    tick();
    // インターバルで定期実行
    const id = setInterval(tick, POLL_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [queryClient]);

  return { user, isLoaded, isLoggedIn };
}
