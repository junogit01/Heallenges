import axios from 'axios';
import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';

function UpdatePasswordModal(props) {
  const { show, handleClose, id } = props;

  // react-hook-form 정의
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      current: '',
      mode: 'onBlur',
    },
  });

  // 모달 창을 닫을때 기본 값을 모두 초기화 한다. 이때 validate, touch, dirty도 모두 기본 값으로 지정
  const closeEvent = useCallback(() => {
    setValue('current', '', { shouldValidate: false, shouldTouch: false, shouldDirty: false });
    setValue('password', '', { shouldValidate: false, shouldTouch: false, shouldDirty: false });
    setValue('confirm', '', { shouldValidate: false, shouldTouch: false, shouldDirty: false });
    // 모달 창 닫기
    handleClose();
  }, [setValue, handleClose]);

  const onSubmit = useCallback(
    async data => {
      // {...register('이름')}으로 등록한 값은 모두 여기에 객체로 담긴다
      // console.log(data);

      // 그 받은 값에 필요한 값 추가. 저는 id가 필요해서 props로 받은 해당 유저의 id 값을 추가
      const sendData = { ...data, id: id };

      // 서버 전송
      const resp = await axios.post(`http://localhost:8001/mypage/${id}/password`, sendData);
      // console.log(resp);

      // 기존 비밀번호가 매칭되지 않는 경우 500번 코드 전송. 500번이 전송되면 강제로 current 필으에 에러가 발생시켜 에러 메시지가
      // 화면에 표시되게 하기 위해 setError 메서드 사용
      if (resp.data.status === 401) {
        setError(
          'current', // 에러 핸들링할 input요소 name
          { message: '비밀번호가 일치하지 않습니다.' }, // 에러 메세지
          { shouldFocus: true }, // 에러가 발생한 input으로 focus 이동
        );
      } else if (resp.data.status === 200) {
        closeEvent();
        Swal.fire({
          title: '비밀번호 변경 완료',
          icon: 'success',
        });
      } else if (resp.data.status === 500) {
        Swal.file({
          title: '비밀번호 변경 실패',
          text: '지속적으로 발생시 문의를 남겨주세요',
          icon: 'error',
        });
      }
    },
    [closeEvent, setError, id],
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>비밀번호 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="current">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              {...register('current', {
                required: { value: true, message: '변경 전 비밀번호를 입력해주세요' },
              })}
            />
            {errors.current && <p className="errorMsg">{errors.current.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>새로운 비밀번호</Form.Label>
            <Form.Control
              type="password"
              {...register('password', {
                required: { value: true, message: '새로운 비밀번호를 입력해주세요' },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                  message: '영문, 숫자, 특수문자를 조합하여 8글자 이상 입력해 주세요',
                },
              })}
            />
            {errors.password && <p className="errorMsg">{errors.password.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              {...register('confirm', {
                // 검증 로직
                // getValues()는 hook- form이 관리하는 모든 필드 값을 가져오고  getValues('password')는 password 값만 가져온다
                // 이 값이 현재 필드의 값(data)와 같은지를 체크. 같으면 true(리엑트는 boolean 값은 화면에 표시 안함), 맞지 않으면 에러 문구 출력
                validate: {
                  compare: data => (getValues('password') === data ? true : '비밀번호가 같지 않습니다'),
                },
              })}
            />
            {errors.confirm && <p className="errorMsg">{errors.confirm.message}</p>}
          </Form.Group>
          <hr />
          <Button variant="outline-secondary" type="submit">
            변경하기
          </Button>{' '}
          <Button variant="outline-secondary" onClick={closeEvent}>
            취소
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdatePasswordModal;
