import React from 'react';
import styled from 'styled-components';
import FormItem from './FormItem';
import RadioGroup from './RadioGroup';
import CalenderInput from './CalendarInput';
import ImageInput from './ImageInput';

function ChallengeForm() {
  return (
    <Form>
      <Column>
        <FormItem label="도전 제목">
          <input />
        </FormItem>
        <FormItem label="도전 설명">
          <Textarea />
        </FormItem>
        <FormItem label="도전 유형">
          <select name="type">
            <option value="Healthcare">운동</option>
            <option value="Nutrition">영양</option>
            <option value="Hobby">취미</option>
          </select>
        </FormItem>
        <FormItem label="참여자 총 수">
          <input type="text" />
        </FormItem>
        <FormItem label="도전 규칙">
          <input type="text" />
        </FormItem>
        <FormItem label="도전 기간">
          <CalendarGroup>
            <CalenderInput />
            <CalenderInput />
          </CalendarGroup>
        </FormItem>
      </Column>
      <Column>
        <FormItem label="보상 내용">
          <input type="text" />
        </FormItem>
        <FormItem label="도전 소개">
          <ImageInput />
        </FormItem>
      </Column>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 1000px;
  gap: 50px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
`;

const RadioButtonGroup = styled.div`
  display: flex;
  gap: 6px;
`;

const CalendarGroup = styled.div`
  display: flex;
  gap: 6px;
`;

const Textarea = styled.textarea`
  resize: none;
`;

export default ChallengeForm;
