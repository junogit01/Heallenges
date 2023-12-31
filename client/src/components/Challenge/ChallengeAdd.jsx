import { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import FormItem from '@components/Challenge/FormItem';
// import RadioGroup from '@components/Challenge/RadioGroup';
import CalendarInput from '@components/Challenge/CalendarInput';
import ImageInput from '@components/Challenge/ImageInput';
import { challengesListSelector } from '@recoils/challenge';
import { useRecoilState } from 'recoil';
import { loginState } from '@recoils/login';

const ChallengeAdd = () => {
  const [user, setUser] = useRecoilState(loginState);
  const { insertChallenge } = useRecoilValue(challengesListSelector);
  const current = useLocation();
  const dataType = {
    id: current,
    title: '',
    description: '',
    type: '',
    total_participants: '',
    rules: '',
    start_date: '',
    end_date: '',
    created_at: new Date(),
    status: '',
    host_id: user?.name,
    main_image: '',
    reward: '',
  };
  const [data, setData] = useState(dataType);
  const handleClick = () => {
    console.log('data')
    console.log(data)
    insertChallenge(data);
  };
  const updateValue = ({oldData, propName, propValue}) => {
    const temp = { ...oldData, [propName]: propValue };
    setData(temp);
  };
  return (
    <Wrapper>
      <Form>
        <Column>
          <FormItem label="도전 제목">
            <input onChange={e => updateValue({ oldData: data, propName: 'title', propValue: e.target.value })} />
          </FormItem>
          <FormItem label="도전 설명">
            <Textarea
              onChange={e => updateValue({ oldData: data, propName: 'description', propValue: e.target.value })}
            />
          </FormItem>
          <FormItem label="도전 유형">
            <select
              name="type"
              onChange={e => updateValue({ oldData: data, propName: 'type', propValue: e.target.value })}>
              <option value="a">운동</option>
              <option value="b">영양</option>
              <option value="c">취미</option>
            </select>
          </FormItem>
          <FormItem label="참여자 총 수">
            <input
              type="text"
              onChange={e => updateValue({ oldData: data, propName: 'total_participants', propValue: e.target.value })}
            />
          </FormItem>
          <FormItem label="도전 규칙">
            <input
              type="text"
              onChange={e => updateValue({ oldData: data, propName: 'rules', propValue: e.target.value })}
            />
          </FormItem>
          <FormItem label="도전 기간">
            <CalendarGroup>
              <CalendarInput setData={setData} data={data} propName="start_date" />
              <CalendarInput setData={setData} data={data} propName="end_date" />
            </CalendarGroup>
          </FormItem>
        </Column>
        <Column>
          <FormItem label="보상 내용">
            <input
              type="text"
              onChange={e => updateValue({ oldData: data, propName: 'reward', propValue: e.target.value })}
            />
          </FormItem>
          <FormItem label="도전 소개">
            <ImageInput setData={setData} data={data} propName="main_image" />
          </FormItem>
        </Column>
      </Form>
      <AddButton className="btn btn-primary card-body" onClick={() => handleClick()}>
        도전 생성
      </AddButton>
    </Wrapper>
  );
};

export default ChallengeAdd;

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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const AddButton = styled.div`
  border-radius: 6px;
  width: 10rem;
  height: 3rem;
  padding: 10px 20px;
  border: 0;
  background-color: #0d6efd;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  &:hover {
    background-color: rgba(#0d6efd, 0.8);
  }
`;
