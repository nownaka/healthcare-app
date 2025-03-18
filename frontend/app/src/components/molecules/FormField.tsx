import React from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import Text from '../atoms/Text';

const FormFieldContainer = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

interface FormFieldProps {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  placeholder,
  onChange
}) => {
  return (
    <FormFieldContainer>
      <Label>
        <Text>{label}</Text>
      </Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </FormFieldContainer>
  );
};

export default FormField;
