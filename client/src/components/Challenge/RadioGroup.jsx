import { useState } from 'react';
import styled from 'styled-components';
import RadioButton from './RadioButton';

function RadioGroup({ items }) {
  const [value, setValue] = useState(items?.[0].value);
  return (
    <Wrapper>
      {items.map(item => (
        <RadioButton checked={value === item.value} value={item.value} onClick={() => setValue(item.value)}>
          {item.label}
        </RadioButton>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 6px;
`;

export default RadioGroup;
