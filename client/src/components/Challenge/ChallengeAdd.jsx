import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import FormItem from '@components/Challenge/FormItem';
// import RadioGroup from '@components/Challenge/RadioGroup';
import CalendarInput from '@components/Challenge/CalendarInput';
import ImageInput from '@components/Challenge/ImageInput';
import { challengesListSelector } from '@recoils/challenge';
import { useRecoilState } from 'recoil';
import { loginState } from '@recoils/login';
import Swal from 'sweetalert2';
import axios from 'axios';

const ChallengeAdd = ({ isEdit }) => {
  const [user, setUser] = useRecoilState(loginState);
  const { insertChallenge } = useRecoilValue(challengesListSelector);
  const current = useLocation();
  const [challengeDetail, setChallengeDetail] = useState([]);
  const boardId = useParams().id;

  useEffect(() => {
    const getDetailList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8001/challenges/${boardId}`);
        setChallengeDetail(data.data[0]);
        setData(data.data[0]);
      } catch (e) {
        console.error(e);
      }
    };
    if (isEdit) {
      getDetailList();
    }
  }, []);

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
    host_id: user?.id,
    main_image: '',
    reward: '',
  };
  const [data, setData] = useState(dataType);

  console.log(data);

  const navigate = useNavigate();

  const handleClick = async evt => {
    evt.preventDefault();
    if (data.title === '') {
      Swal.fire({
        title: '도전 생성 중 에러 발생', // Alert 제목
        text: '제목을 입력해주세요.', // Alert 내용
        icon: 'error', // Alert 타입
      });
    } else if (data.description === '') {
      Swal.fire({
        title: '도전 생성 중 에러 발생', // Alert 제목
        text: '도전 설명을 입력해주세요.', // Alert 내용
        icon: 'error', // Alert 타입
      });
    } else if (data.type === '') {
      Swal.fire({
        title: '도전 생성 중 에러 발생', // Alert 제목
        text: '도전 유형을 선택해주세요.', // Alert 내용
        icon: 'error', // Alert 타입
      });
    } else if (data.total_participants == false) {
      Swal.fire({
        title: '도전 생성 중 에러 발생', // Alert 제목
        text: '참여자 총 수를 1명 이상 입력해주세요.', // Alert 내용
        icon: 'error', // Alert 타입
      });
    } else if (data.rules === '') {
      Swal.fire({
        title: '도전 생성 중 에러 발생', // Alert 제목
        text: '도전 규칙을 입력해주세요.', // Alert 내용
        icon: 'error', // Alert 타입
      });
    } else if (data.start_date === '') {
      Swal.fire({
        title: '도전 생성 중 에러 발생', // Alert 제목
        text: '도전 기간을 설정해주세요.', // Alert 내용
        icon: 'error', // Alert 타입
      });
    } else if (data.end_date === '') {
      Swal.fire({
        title: '도전 생성 중 에러 발생', // Alert 제목
        text: '도전 기간을 설정해주세요.', // Alert 내용
        icon: 'error', // Alert 타입
      });
    } else if (data.reward == false) {
      Swal.fire({
        title: '도전 생성 중 에러 발생', // Alert 제목
        text: '보상 내용이 올바르지 않습니다.', // Alert 내용
        icon: 'error', // Alert 타입
      });
    } else if (data.main_image === '') {
      Swal.fire({
        title: '도전 생성 중 에러 발생', // Alert 제목
        text: '도전 이미지를 등록해주세요.', // Alert 내용
        icon: 'error', // Alert 타입
      });
    } else {
      console.log('HELLO');
      console.log(data);
      if (
        data.title &&
        data.description &&
        data.type &&
        data.total_participants > 0 &&
        data.rules &&
        data.start_date &&
        data.end_date &&
        data.main_image &&
        data.reward
      ) {
        if (isEdit) {
          const formData = new FormData();
          formData.append('profile', data.main_image);
          formData.append('data', JSON.stringify(data));

          const response = await axios.put(`http://localhost:8001/challenges/${data.id}`, formData);
          console.log(response);
          if (response.data.status === 200) {
            Swal.fire({
              text: '수정하였습니다.',
              icon: 'success',
            });
            navigate('/challenges');
          } else {
            Swal.fire({
              text: '수정 실패 하였습니다.',
              icon: 'error',
            });
          }
        } else {
          insertChallenge(data);
          Swal.fire({
            title: '도전 생성 성공', // Alert 제목
            text: '도전 기간을 설정해주세요.', // Alert 내용
            icon: 'success', // Alert 타입
          });
          navigate('/challenges');
        }
      }
    }
  };
  const updateValue = ({ oldData, propName, propValue }) => {
    const temp = { ...oldData, [propName]: propValue };
    setData(temp);
  };

  return (
    <Wrapper>
      <Form>
        <Column>
          <FormItem label="도전 제목">
            <input
              onChange={e => updateValue({ oldData: data, propName: 'title', propValue: e.target.value })}
              defaultValue={isEdit && challengeDetail?.title}
              value={data.title}
            />
          </FormItem>
          <FormItem label="도전 설명">
            <Textarea
              onChange={e => updateValue({ oldData: data, propName: 'description', propValue: e.target.value })}
              defaultValue={isEdit && challengeDetail?.description}
              value={data.description}
            />
          </FormItem>
          <FormItem label="도전 유형">
            <select
              name="type"
              onChange={e => updateValue({ oldData: data, propName: 'type', propValue: e.target.value })}
              value={isEdit ? data.type || challengeDetail?.type : data.type}>
              <option value="">도전 유형을 선택해주세요.</option>
              <option value="Healthcare">운동</option>
              <option value="Nutrition">영양</option>
              <option value="Hobby">취미</option>
            </select>
          </FormItem>
          <FormItem label="참여자 총 수">
            <input
              type="number"
              onChange={e => updateValue({ oldData: data, propName: 'total_participants', propValue: e.target.value })}
              defaultValue={isEdit && challengeDetail?.total_participants}
              value={data.total_participants}
            />
          </FormItem>
          <FormItem label="도전 규칙">
            <input
              type="text"
              onChange={e => updateValue({ oldData: data, propName: 'rules', propValue: e.target.value })}
              defaultValue={isEdit && challengeDetail?.rules}
              value={data.rules}
            />
          </FormItem>
          <FormItem label="도전 기간">
            <CalendarGroup>
              {/* value={isEdit ? data.start_date || new Date(challengeDetail?.start_date) : data.start_date} */}
              <CalendarInput
                setData={setData}
                data={data}
                isStart={true}
                defaultValue={challengeDetail?.start_date}
                propName="start_date"
              />
              <CalendarInput
                setData={setData}
                data={data}
                isStart={false}
                defaultValue={challengeDetail?.end_date}
                propName="end_date"
              />
            </CalendarGroup>
          </FormItem>
        </Column>
        <Column>
          <FormItem label="보상 내용">
            <input
              type="number"
              onChange={e => updateValue({ oldData: data, propName: 'reward', propValue: e.target.value })}
              defaultValue={isEdit && challengeDetail.reward}
              value={data.reward}
            />
          </FormItem>
          <FormItem label="도전 이미지1">
            <ImageInput
              setData={setData}
              data={data}
              propName="main_image"
              inputData={isEdit ? data.main_image || challengeDetail?.main_image : data.main_image}
            />
          </FormItem>
        </Column>
      </Form>
      <AddButton className="btn btn-primary card-body" onClick={evt => handleClick(evt)}>
        {isEdit ? '도전 수정' : '도전 생성'}
      </AddButton>
    </Wrapper>
  );
};

export default ChallengeAdd;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Label = styled.label`
  cursor: pointer;
  width: 300px;
  height: 200px;
`;

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
