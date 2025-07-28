import React from "react";
import Header from "../organisms/Header";
import ProfileEdit from "../organisms/ProfileEdit";
import styled from "styled-components";
import { usePollingCurrentUser } from "../organisms/useFetchUser";
import { Navigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SettingsPage: React.FC = () => {
  const { user, isLoaded, isLoggedIn } = usePollingCurrentUser()

  if (!isLoaded) {
    return <div>読み込み中…</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header title="設定" userName={user!.name} textColor="white" />
      <Container>
        <h2>プロフィール編集</h2>
        <ProfileEdit user_id={user!.user_id} email={user!.email} />
      </Container>
    </>
  );
};

export default SettingsPage;
