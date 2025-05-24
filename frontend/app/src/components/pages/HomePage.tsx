import React, {useEffect, useState} from "react";
// import HeaderContainer from "../organisms/HeaderContainer";
import Header from "../organisms/Header";
import CustomCalendar from "../organisms/CustomCalendar";
import styled from "styled-components";
import axios from "axios";
import Dashboard from "../organisms/Dashboard";

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
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data: basic } = await axios.get("http://localhost:8000/api/userinfo/", {
          withCredentials: true,
          headers: { Accept: "application/json" }
        });
        const userId = basic.user_id;
        localStorage.setItem("user_id", userId);
  
        // ユーザー詳細 API 呼び出し
        const { data: detail } = await axios.get(`http://localhost:8000/api/user-profiles/${userId}/`, {
          withCredentials: true,
          headers: { Accept: "application/json" }
        });
        setUserName(detail.name);
      } catch (err: any) {
        console.error(err.response?.data || err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
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
        <RightContainer></RightContainer>

        <Dashboard /> 
      </HomeContainer>
    </>
  );
};

export default HomePage;