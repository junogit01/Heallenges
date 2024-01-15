import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import FormItem from '@components/Challenge/FormItem';
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
        const { data } = await axios.get(`/challenges/${boardId}`);
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

  // console.log(data);

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

          const response = await axios.put(`/challenges/${data.id}`, formData);
          console.log(response);
          if (response.data.status === 200) {
            Swal.fire({
              text: '성공적으로 수정하였습니다.',
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
            text: '도전이 성공적으로 생성되었습니다.', // Alert 내용
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

  const maxLength = 15;

  const handleInputChange = e => {
    const inputValue = e.target.value;

    if (inputValue.length <= maxLength) {
      updateValue({ oldData: data, propName: 'title', propValue: inputValue });
    }
  };

  return (
    <Wrapper>
      <Form>
        <Column>
          <FormItem label="도전 제목">
            <StyledInput
              onChange={handleInputChange}
              defaultValue={isEdit && challengeDetail?.title}
              value={data.title}
            />
            <MaxLengthIndicator>
              {data.title.length}/{maxLength}
            </MaxLengthIndicator>
          </FormItem>
          <FormItem label="도전 설명">
            <StyledTextarea
              onChange={e => updateValue({ oldData: data, propName: 'description', propValue: e.target.value })}
              defaultValue={isEdit && challengeDetail?.description}
              value={data.description}
            />
          </FormItem>
          <FormItem label="도전 유형">
            <SelectContainer>
              <StyledSelect
                name="type"
                onChange={e => updateValue({ oldData: data, propName: 'type', propValue: e.target.value })}
                value={isEdit ? data.type || challengeDetail?.type : data.type}>
                <option value="">도전 유형을 선택해주세요.</option>
                <option value="운동">운동</option>
                <option value="영양">영양</option>
                <option value="취미">취미</option>
              </StyledSelect>
            </SelectContainer>
          </FormItem>
          <FormItem label="참여자 총 수">
            <StyledInput
              type="number"
              style={{ padding: '0.5rem', width: '5rem' }}
              onChange={e => updateValue({ oldData: data, propName: 'total_participants', propValue: e.target.value })}
              defaultValue={isEdit && challengeDetail?.total_participants}
              value={data.total_participants}
            />
          </FormItem>
          <FormItem label="도전 규칙">
            <StyledInput
              type="text"
              onChange={e => updateValue({ oldData: data, propName: 'rules', propValue: e.target.value })}
              defaultValue={isEdit && challengeDetail?.rules}
              value={data.rules}
            />
          </FormItem>
          <FormItem label="도전 기간" style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}></label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative', width: '150px' }}>
                <input
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    backgroundColor: '#fff',
                    color: '#333',
                    fontSize: '16px',
                  }}
                  onChange={e => setData({ ...data, start_date: e.target.value })}
                  value={data.start_date}
                  type="date"
                />
                <div
                  style={{
                    fontSize: '14px',
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                  }}></div>
              </div>
              <p>~</p>
              <div style={{ position: 'relative', width: '150px' }}>
                <input
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    backgroundColor: '#fff',
                    color: '#333',
                    fontSize: '16px',
                  }}
                  onChange={e => setData({ ...data, end_date: e.target.value })}
                  value={data.end_date}
                  type="date"
                />
                <div
                  style={{
                    fontSize: '14px',
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                  }}></div>
              </div>
            </div>
          </FormItem>
          <FormItem label="보상 포인트">
            <input
              type="number"
              onChange={e => updateValue({ oldData: data, propName: 'reward', propValue: e.target.value })}
              defaultValue={isEdit && challengeDetail.reward}
              value={data.reward}
              style={{ width: '6rem', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </FormItem>
        </Column>
        <Column>
          <FormItem label="도전 썸네일">
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

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 1000px;
  gap: 20px; /* 간격을 줄임 */
  background-color: #f5f5f5; /* 배경색 추가 */
  padding: 20px; /* 내부 여백 추가 */
  border-radius: 10px; /* 테두리 둥글게 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
  background-color: #ffffff; /* 배경색 추가 */
  padding: 20px; /* 내부 여백 추가 */
  border: 1px solid #dddddd; /* 테두리 추가 */
  border-radius: 10px; /* 테두리 둥글게 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
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

const StyledSelect = styled.select`
  padding: 10px; /* 내부 여백 추가 */
  border: 1px solid #ddd; /* 테두리 스타일 추가 */
  border-radius: 5px; /* 테두리 둥글게 */
  background-color: #fff; /* 배경색 설정 */
  color: #333; /* 텍스트 색상 설정 */
  font-size: 16px; /* 폰트 크기 설정 */
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  resize: vertical; /* 수직 리사이즈 가능 */
  min-height: 100px; /* 최소 높이 지정 */
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  font-size: 16px;
`;

const MaxLengthIndicator = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;
