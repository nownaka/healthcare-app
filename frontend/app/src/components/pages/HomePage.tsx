import React, { useEffect, useState } from "react";
// import HeaderContainer from "../organisms/HeaderContainer";
import Header from "../organisms/Header";
import CustomCalendar from "../organisms/CustomCalendar";
import styled from "styled-components";
import axios from "axios";
import Dashboard from "../organisms/Dashboard";
import Modal from "../organisms/Modal";

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftContainer = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center; /* カレンダーを中央寄せする場合 */
`;

const RightContainer = styled.div`
  flex: 2; /* 残りのスペースを多めに使う */
  padding: 20px;
`;

const HomePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{
    user_id: number;
    message: string;
  } | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // モーダル関連のステート
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [sleep, setSleep] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [exercise, setExercise] = useState<string>("");

  const openModal = (date: Date) => {
    setSelectedDate(date.toLocaleDateString());
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // 保存処理を書く（必要であれば）
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data: basic } = await axios.get(
          "http://localhost:8000/api/userinfo/",
          {
            withCredentials: true,
            headers: { Accept: "application/json" },
          }
        );
        const userId = basic.user_id;
        localStorage.setItem("user_id", userId);

        // ユーザー詳細 API 呼び出し
        const { data: detail } = await axios.get(
          `http://localhost:8000/api/user-profiles/${userId}/`,
          {
            withCredentials: true,
            headers: { Accept: "application/json" },
          }
        );
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
        <LeftContainer>
          <h3>カレンダー</h3>
          <CustomCalendar onDateClick={openModal} />
        </LeftContainer>

        <RightContainer>
          <Dashboard />
        </RightContainer>
      </HomeContainer>

      {isModalOpen && (
        <Modal
          dateLabel={selectedDate}
          weight={weight}
          sleep={sleep}
          calories={calories}
          exercise={exercise}
          setWeight={setWeight}
          setSleep={setSleep}
          setCalories={setCalories}
          setExercise={setExercise}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default HomePage;
