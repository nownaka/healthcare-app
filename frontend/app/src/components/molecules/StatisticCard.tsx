import React from 'react';
import styled from 'styled-components';
import Text from '../atoms/Text';
import Graph from './Graph';

const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled(Text)`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
`;

const Value = styled(Text)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #316745;
`;

const GraphContainer = styled.div`
  height: 100px;
  margin-top: 1rem;
`;

interface StatisticCardProps {
  title: string;
  value: string | number;
  graphData?: {
    title: string;
    data?: any; // グラフデータの型は実装に応じて定義
  };
  className?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  graphData,
  className
}) => {
  return (
    <CardContainer className={className}>
      <Header>
        <Title>{title}</Title>
        <Value>{value}</Value>
      </Header>
      {graphData && (
        <GraphContainer>
          <Graph title={graphData.title} />
        </GraphContainer>
      )}
    </CardContainer>
  );
};

export default StatisticCard;
