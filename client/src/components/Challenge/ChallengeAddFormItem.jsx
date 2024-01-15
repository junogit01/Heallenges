import React from 'react';
import styled from 'styled-components';

function FormItem({ label, children }) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const Label = styled.label`
  color: #333;
`;
export default FormItem;
