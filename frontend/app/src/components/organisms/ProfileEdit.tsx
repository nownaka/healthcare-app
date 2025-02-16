import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const ProfileEdit: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = () => {
    console.log("プロフィール更新:", { email, password, nickname });
  };

  return (
    <FormContainer>
      <label>メールアドレス</label>
      <Input
        type="email"
        value={email}
        placeholder="メールアドレスを入力"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>パスワード</label>
      <Input
        type="password"
        value={password}
        placeholder="新しいパスワードを入力"
        onChange={(e) => setPassword(e.target.value)}
      />

      <label>ニックネーム</label>
      <Input
        type="text"
        value={nickname}
        placeholder="ニックネームを入力"
        onChange={(e) => setNickname(e.target.value)}
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
