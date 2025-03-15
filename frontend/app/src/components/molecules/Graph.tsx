import React from "react";
import styled from "styled-components";

const GraphContainer = styled.div`
  width: 45%;
  height: 150px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

type GraphProps = {
  title: string;
};

const Graph: React.FC<GraphProps> = ({ title }) => {
  return <GraphContainer>{title} グラフ</GraphContainer>;
};

export default Graph;
