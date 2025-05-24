import React from "react";
import styled from "styled-components";
import { useGraphData } from "../../hooks/useGraphData";
import StatisticCard from "../molecules/StatisticCard";
import HealthDataDisplay from "../../logic/HealthDataDisplay";

const DashboardContainer = styled.div`
  background-color: white;
  padding: 20px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Dashboard: React.FC = () => {
  const { calorieGraphData, sleepGraphData, loading, error } = useGraphData();

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <DashboardContainer>
      <h3>ダッシュボード</h3>
      <GridContainer>
        <StatisticCard
          title="今日のカロリー"
          value={calorieGraphData?.values[calorieGraphData.values.length - 1] || 0}

        />
        <StatisticCard
          title="昨日の睡眠時間"
          value={`${sleepGraphData?.values[sleepGraphData.values.length - 2] || 0}時間`}

        />
      </GridContainer>
      <HealthDataDisplay />
    </DashboardContainer>
  );
};

export default Dashboard;
