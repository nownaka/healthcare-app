import React from "react";
import styled from "styled-components";

const BasicInfoContainer = styled.div`
  background-color: white;
  padding: 20px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const BasicInfo: React.FC = () => {
  return (
    <BasicInfoContainer>
      <h3>基本情報</h3>
      <p>体重: 70kg</p>
      <p>身長: 175cm</p>
    </BasicInfoContainer>
  );
};

export default BasicInfo;
