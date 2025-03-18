import React from "react";
import HeaderContainer from "../organisms/HeaderContainer";
import CustomCalendar from "../organisms/CustomCalendar";
import styled from "styled-components";
import CalorieRecord from "../../logic/CalorieRecord";
import SleepRecord from "../../logic/SleepRecord";
import Dashboard from "../../logic/Dashboard";

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftContainer = styled.div`
  width: 25%;
  background-color: #f4f4f4;
  padding: 20px;
`;

const RightContainer = styled.div`
  width: 75%;
  padding: 20px;
`;

const HomePage: React.FC = () => {
  return (
    <>
      {/* ✅ ヘッダー管理は HeaderContainer に移行 */}
      <HeaderContainer />

      <HomeContainer>
        {/* カレンダー */}
        <LeftContainer>
          <h3>カレンダー</h3>
          <CustomCalendar />
        </LeftContainer>

        {/* 右側（コンテンツ追加予定） */}
        <RightContainer></RightContainer>

        {/* ------------バックエンドからのコンポーネント
        <CalorieRecord />
        <SleepRecord />
        <Dashboard /> */}
        {/* ------------バックエンドからのコンポーネント */}
      </HomeContainer>
    </>
  );
};

export default HomePage;
