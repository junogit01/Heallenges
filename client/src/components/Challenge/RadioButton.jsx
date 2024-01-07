import React from 'react';
import styled from 'styled-components';

function RadioButton({ children, value, checked, onClick }) {
  return (
    <Label>
      <Button checked={checked} onClick={onClick}>
        {children}
      </Button>
      <input type="radio" value={value} hidden />
    </Label>
  );
}

const Button = styled.span`
  display: inline-flex;
  height: 100%;
  align-items: center;
  padding: 0 10px;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
  ${({ checked }) =>
    checked &&
    `
      background: #1677ff;
      color: #f1f1f1;
      border: 1px solid #1677ff;
    `}
`;

const Label = styled.label`
  height: 30px;
`;

export default RadioButton;
