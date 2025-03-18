import React from 'react';
import styled from 'styled-components';
import Text from '../atoms/Text';

const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const Title = styled(Text)`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const Value = styled(Text)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

interface DataCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  icon,
  className
}) => {
  return (
    <CardContainer className={className}>
      {icon && <IconContainer>{icon}</IconContainer>}
      <ContentContainer>
        <Title>{title}</Title>
        <Value>{value}</Value>
      </ContentContainer>
    </CardContainer>
  );
};

export default DataCard;
