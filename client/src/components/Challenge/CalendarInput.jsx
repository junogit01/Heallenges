import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';

function CalendarInput() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(new Date());

  const handleChange = newValue => {
    setValue(newValue);
    setOpen(false);
  };

  const formatDate = date => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${d}`;
  };

  return (
    <Wrapper>
      <Button onClick={() => setOpen(!open)}>{formatDate(value)}</Button>
      {open && (
        <CalendarWrapper>
          <Calendar onChange={handleChange} />
        </CalendarWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: 50px;
`;

const Button = styled.span`
  display: inline-flex;
  cursor: pointer;
  height: 35px;
  padding: 0 10px;
  align-items: center;
  border: 1px solid black;
  border-radius: 4px;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  z-index: 1;
`;

export default CalendarInput;
