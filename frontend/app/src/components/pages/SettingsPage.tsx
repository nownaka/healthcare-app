import React from "react";
import Header from "../organisms/Header";
import ProfileEdit from "../organisms/ProfileEdit";
import styled from "styled-components";
import { useFetchUser } from "../organisms/useFetchUser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SettingsPage: React.FC = () => {
  const { user_id, email, name } = useFetchUser()
  return (
    <>
      <Header title="設定" userName={name} textColor="white" />
      <Container>
        <h2>プロフィール編集</h2>
        <ProfileEdit user_id={user_id} email={email} />
      </Container>
    </>
  );
};

export default SettingsPage;
