import React, { useState } from "react";
import Header from "../organisms/Header";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";
import Square from "../atoms/Square";

const StyledBody = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

type SignUpPage = {};

const SignUpPage = (signUpPage: SignUpPage) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <>
      {/* ヘッダー */}
      <Header title='健康管理アプリ' userName='健康 太郎' textColor='white' />

      <div style={{ position: "relative" }}>
        {/* Square コンポーネント */}
        <div style={{ position: "absolute", zIndex: 0 }}>
          <Square width={500} height={200} color='#316745' borderRadius={20} />
        </div>

        {/* オーバーレイ部分 */}
        <div
          style={{
            position: "absolute",
            zIndex: 1, // Square の上に表示
          }}
        >
          <h2>アカウント作成</h2>
          ニックネームを入力してください
          <input
            type='text'
            value={password}
            placeholder='ニックネーム'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <StyledBody>
        <div>
          <label>Email</label>
        </div>

        <Input
          type='email'
          value={email}
          placeholder='Emailを入力してください'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <Input
          type='password'
          value={password}
          placeholder='パスワードを入力してください'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>身長</label>
        <Input
          type='number'
          value={height}
          placeholder='身長を入力してください'
          onChange={(e) => setHeight(e.target.value)}
        />
        <label>体重</label>
        <Input
          type='number'
          value={weight}
          placeholder='体重を入力してください'
          onChange={(e) => setWeight(e.target.value)}
        />
        <label>目標</label>
        <Input
          type='text'
          value={password}
          placeholder='目標を入力してください'
          onChange={undefined}
        />
        <Button
          label='登録'
          type='submit'
          className={undefined}
          onClick={undefined}
        />
      </StyledBody>
    </>
  );
};

export default SignUpPage;
