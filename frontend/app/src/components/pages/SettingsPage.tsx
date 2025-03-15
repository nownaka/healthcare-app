import React from "react";
import Header from "../organisms/Header";
import ProfileEdit from "../organisms/ProfileEdit";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SettingsPage: React.FC = () => {
  return (
    <>
      <Header title="設定" userName="健康 太郎" textColor="white" />
      <Container>
        <h2>プロフィール編集</h2>
        <ProfileEdit />
      </Container>
    </>
  );
};

export default SettingsPage;
