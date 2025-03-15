import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const RecordButton: React.FC = () => {
  return <Button>記録する</Button>;
};

export default RecordButton;
