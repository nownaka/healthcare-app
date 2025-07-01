import React, { useState, useEffect, FormEvent } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";
import axios from "axios";
import { config } from "../../config";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* 20px 相当 */
  padding: 2rem; /* 内側余白 32px */
  background: #fff; /* カード風 */
  border-radius: 0.75rem; /* 12px */
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);

  /* 幅は可変。モバイルで 100%, 以降中央寄せ */
  width: min(420px, 100%);
  margin-inline: auto; /* 中央寄せ */

  /* 余白感を保ちつつスマホで詰まり過ぎないように */
  @media (max-width: 480px) {
    padding: 1.5rem;
    gap: 1rem;
  }
`;
interface ProfileEditProps {
  user_id: number;
  email: string;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({
  user_id,
  email: initialEmail,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [nickname, setNickname] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [password, setPassword] = useState("");
  // 補助
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${config.backendAPIBaseUrl}/api/user-profiles/${user_id}/`,
          { withCredentials: true }
        );
        setNickname(data.nickname ?? "");
        setHeight(String(data.height ?? ""));
        setGoal(data.goal ?? "");
      } catch (err) {
        console.error("初期データ取得失敗:", err);
        setError("データ取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user_id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // フォーム再読み込み防止
    setError(null);
    setSuccess(null);

    try {
      const userprofile = { nickname, height, goal };
      await axios.patch(
        `${config.backendAPIBaseUrl}/api/user-profiles/${user_id}/`,
        userprofile,
        { withCredentials: true }
      );

      const customUser = { email, ...(password && { password }) };
      await axios.patch(
        `${config.backendAPIBaseUrl}/api/users/${user_id}/`,
        customUser,
        { withCredentials: true }
      );
      setSuccess("プロフィールを更新しました 🎉");
    } catch (err) {
      console.error("プロフィール更新失敗:", err);
      setError("更新に失敗しました");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <FormContainer onSubmit={handleSubmit}>
      <label>メールアドレス</label>
      <Input
        type="email"
        value={email}
        placeholder="メールアドレスを入力"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>ニックネーム</label>
      <Input
        type="text"
        value={nickname}
        placeholder="ニックネームを入力"
        onChange={(e) => setNickname(e.target.value)}
      />
      <label>身長</label>
      <Input
        type="number"
        value={height}
        placeholder="身長を入力"
        onChange={(e) => setHeight(e.target.value)}
      />
      <label>目標</label>
      <Input
        type="text"
        value={goal}
        placeholder="体脂肪率6%になりたい！"
        onChange={(e) => setGoal(e.target.value)}
      />
      <label>パスワード</label>
      <Input
        type="password"
        value={password}
        placeholder="新しいパスワードを入力"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        label="更新する"
        type="submit"
        className=""
        onClick={handleSubmit}
      />
    </FormContainer>
  );
};

export default ProfileEdit;
