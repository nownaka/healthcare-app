import React, {useEffect, useState} from "react";
// import HeaderContainer from "../organisms/HeaderContainer";
import Header from "../organisms/Header";
import CustomCalendar from "../organisms/CustomCalendar";
import styled from "styled-components";
import axios from "axios";
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
  const [userInfo, setUserInfo] = useState<{ user_id: number; message: string } | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/userinfo/", {
      withCredentials: true, // Cookie を送信するために必要
      headers: {
        Accept: "application/json" // JSON レスポンスを要求
      }
    })
      .then((response) => {
        setUserInfo(response.data);
        localStorage.setItem("user_id", response.data.user_id);
        setUserName(response.data.user_id)
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err.response?.data || err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  return (
    <>
      {/* ✅ ヘッダー管理は HeaderContainer に移行 */}
      <Header title="健康管理アプリ" userName={userName} textColor="white" />

      <HomeContainer>
        {/* カレンダー */}
        <LeftContainer>
          <h3>カレンダー</h3>
          <CustomCalendar />
        </LeftContainer>

        {/* 右側（コンテンツ追加予定） */}
        <RightContainer>

          <CalorieRecord />
          <SleepRecord />
        </RightContainer>
        {/* <Dashboard />  */}
      </HomeContainer>
    </>
  );
};

export default HomePage;
