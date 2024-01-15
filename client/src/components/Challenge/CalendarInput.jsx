import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';

function CalendarInput({ setData, data, isStart, propName, defaultValue }) {
  const [open, setOpen] = useState(false);

  const formatDate = date => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    const tempDate = `${year}-${month}-${d}`;
    return tempDate;
  };

  const handleChange = newValue => {
    const temp = { ...data, [propName]: formatDate(newValue) };
    setData(temp);
    setOpen(false);
  };

  return (
    <Wrapper>
      <Button onClick={() => setOpen(!open)}>
        {(isStart ? data.start_date : data.end_date) || (defaultValue ? defaultValue.slice(0, 10) : '기간 선택')}
      </Button>
      {open && (
        <CalendarWrapper>
          <Calendar
            onChange={handleChange}
            value={(isStart ? data.start_date : data.end_date) || defaultValue?.slice(0, 10)}
          />
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
