import React, { useEffect, useState } from 'react';
import ChallengesDetailSideBar from './ChallengeDetailSideBar';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loginState } from '@recoils/login';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

function ChallengesDetailBody({ data, title, id, isParticipated }) {
  const user = useRecoilValue(loginState);
  const navigate = useNavigate();
  // 참가 여부에 따른 버튼 활성화,비활성화 저장
  const [isAttended, setIsAttended] = useState(isParticipated);
  // 참가 여부에 따른 버튼 텍스트 변화
  const [buttonText, setButtonText] = useState(isParticipated ? '이미 참가한 도전입니다.' : '도전 참여');
  // 참가한 챌린지 저장

  useEffect(() => {
    // 부모 컴포넌트에서 받은 isParticipated 값을 사용하여 버튼 상태 업데이트
    setIsAttended(isParticipated);
    setButtonText(isParticipated ? '이미 참가한 도전입니다.' : '도전 참여');
  }, [isParticipated]); // isParticipated 변화에 반응

  // 도전 참가 버튼
  const handleAttend = async e => {
    e.preventDefault();
    try {
      if (user.id) {
        const result = await axios.post(`/challenges/participants`, {
          challenge_id: data.id,
          user_id: user.id,
        });

        if (result.data.status === 200) {
          // 도전 참가 상태 저장
          setIsAttended(true);
          setButtonText('참여 완료');

          Swal.fire({
            text: '참가 완료', // Alert 내용
            icon: 'success', // Alert 타입
          });
        } else {
          Swal.fire({
            text: '모집인원이 마감되었습니다', // Alert 내용
            icon: 'error', // Alert 타입
          });
        }
      } else {
        Swal.fire({
          text: '로그인 후에 이용이 가능합니다.', // Alert 내용
          icon: 'error', // Alert 타입
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 도전 참가 취소 버튼
  const handleCancelAttend = async e => {
    e.preventDefault();
    try {
      if (user.id) {
        const result = await axios.delete(`/challenges/participants`, {
          data: {
            challengeId: data.id,
            userId: user.id,
          },
        });

        if (result.data.status === 200) {
          setIsAttended(false);
          setButtonText('도전 참여');
          Swal.fire({
            text: '참가가 취소되었습니다.',
            icon: 'success',
          });
        } else {
          Swal.fire({
            text: '참가자 목록에서 삭제 실패',
            icon: 'error',
          });
        }
      } else {
        Swal.fire({
          text: '로그인 후에 이용이 가능합니다.',
          icon: 'error',
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 도전 삭제 버튼
  const handleDelete = async e => {
    e.preventDefault();
    const { value: confirmResult } = await Swal.fire({
      title: '정말로 삭제 하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    });

    if (confirmResult) {
      try {
        const result = await axios.delete(`/challenges/${data.id}`);
        Swal.fire({
          text: '삭제 되었습니다.', // Alert 내용
          icon: 'success', // Alert 타입
        });
        navigate('/challenges');
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <main id="main" style={{ marginTop: '30px' }}>
        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up">
            <div className="row g-5">
              <div className="col-lg-9" data-aos="fade-up" data-aos-delay={200}>
                <div
                  className="mb-5"
                  style={{
                    width: '100%',
                    height: '300px',
                    backgroundImage: `url(${data?.main_image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover', // 'contain' 대신 'cover'로 변경
                    backgroundRepeat: 'no-repeat',
                  }}></div>
                <Container className="mt-5">
                  <Row>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title style={{ fontSize: '3rem', marginBottom: '20px' }}>{data?.title}</Card.Title>
                          <Card.Text style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
                            {data?.description}
                          </Card.Text>
                          <div className="d-flex align-items-center mb-3">
                            <strong className="me-2">도전 인원:</strong>
                            <span>{data?.total_participants}명</span>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <strong className="me-2">도전 기간:</strong>
                            <span>
                              {data?.start_date?.slice(0, 10)} - {data?.end_date?.slice(0, 10)}
                            </span>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <strong className="me-2">도전 규칙:</strong>
                            <span>{data?.rules}</span>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <strong className="me-2">도전 보상:</strong>
                            <span>{data?.reward}</span>
                          </div>
                          <div className="d-flex mt-4">
                            <Button variant="primary" onClick={handleAttend} disabled={isAttended}>
                              {buttonText}
                            </Button>
                            {isAttended && (
                              <Button variant="danger" onClick={handleCancelAttend} className="ms-2">
                                참가 취소
                              </Button>
                            )}
                            {data.host_id === user.id && (
                              <Button variant="warning ms-auto" className="ms-2">
                                <Link
                                  style={{ color: 'white', textDecoration: 'none' }}
                                  to={`/challenges/edit/${data.id}`}>
                                  도전 수정
                                </Link>
                              </Button>
                            )}
                            {data.host_id === user.id && (
                              <Button variant="danger" onClick={handleDelete} className="ms-2">
                                도전 삭제
                              </Button>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
              <ChallengesDetailSideBar />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ChallengesDetailBody;
