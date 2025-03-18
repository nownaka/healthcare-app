import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

const IconButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

interface IconButtonProps {
  label: string;
  iconSrc: string;
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  iconSrc,
  type = "button",
  className,
  onClick
}) => {
  return (
    <IconButtonContainer>
      <Icon src={iconSrc} alt={`${label} icon`} />
      <Button
        label={label}
        type={type}
        className={className}
        onClick={onClick}
      />
    </IconButtonContainer>
  );
};

export default IconButton;
