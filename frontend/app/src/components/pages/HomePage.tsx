import React, { useEffect, useState } from "react";
import Header from "../organisms/Header";
import CustomCalendar from "../organisms/CustomCalendar";
import styled from "styled-components";
import Dashboard from "../organisms/Dashboard";
import { usePollingCurrentUser } from "../organisms/useFetchUser";
import CharacterDisplay from "../molecules/CharacterDisplay";
import {
  HealthEvaluation,
} from "../../logic/HealthDataEvaluator";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

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
  const { user, isLoaded, isLoggedIn } = usePollingCurrentUser();
  const queryClient = useQueryClient();
  const [characterData, setCharacterData] = useState<HealthEvaluation | null>(null);
  const [showCharacter, setShowCharacter] = useState(false);
  const [playKey, setPlayKey] = useState(0); // audioPathが同じでも強制再再生

  useEffect(() => {
    // ログイン済みが確定したタイミングで currentUser を再フェッチ
    queryClient.refetchQueries({
      queryKey: ["currentUser"],
      exact: true,
    });
  }, [isLoggedIn, queryClient]);

  if (!isLoaded) {
    return <div>Loading user info…</div>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header title="健康管理アプリ" userName={user!.name} textColor="white" />

  <HomeContainer>
    <LeftContainer>
      <h3>カレンダー</h3>
      <CustomCalendar
        onCharacterTrigger={(data: HealthEvaluation) => {
          setCharacterData(data);
          setPlayKey((prev) => prev + 1);
          setShowCharacter(true);
        }}
      />
    </LeftContainer>
        <RightContainer>
          <Dashboard />
        </RightContainer>
      </HomeContainer>

  {/* キャラ表示：モーダルとは独立 */}
  {showCharacter && characterData && (
    <CharacterDisplay
      key={playKey}
      message={characterData.message}
      imagePath={characterData.imagePath}
      audioPath={characterData.audioPath}
      onClose={() => setShowCharacter(false)}
    />
  )}
</>
  );
};

export default HomePage;
