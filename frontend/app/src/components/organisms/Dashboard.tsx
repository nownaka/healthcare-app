import React from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
  background-color: white;
  padding: 20px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <h3>ダッシュボード</h3>
      <p>ここにグラフを表示</p>
    </DashboardContainer>
  );
};

export default Dashboard;
