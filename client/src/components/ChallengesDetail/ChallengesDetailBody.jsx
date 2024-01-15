import React, { useEffect, useState } from 'react';
import ChallengesDetailSideBar from './ChallengeDetailSideBar';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '@recoils/login';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { participatedChallengesState } from '@recoils/challenge';

function ChallengesDetailBody({ data, title, id }) {
  const user = useRecoilValue(loginState);
  const [challengeUserInfo, setChallengeUserInfo] = useState([]);
  const navigate = useNavigate();
  // 참가 여부에 따른 버튼 활성화,비활성화 저장
  const [isAttended, setIsAttended] = useState(false);
  // 참가 여부에 따른 버튼 텍스트 변화
  const [buttonText, setButtonText] = useState('도전 참여');
  // 참가한 챌린지 저장
  const [participatedChallenges, setParticipatedChallenges] = useRecoilState(participatedChallengesState);

  useEffect(() => {
    const getChallengeUserInfo = async () => {
      try {
        if (title) {
          const result = await axios.get(`/challenges/participants?title=${title}`, {
            params: {
              challengeTitle: title,
            },
          });
          setChallengeUserInfo(result.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getChallengeUserInfo();
  }, [title]);

  useEffect(() => {
    // 사용자가 이미 참여한 도전인지 확인
    const alreadyParticipated = participatedChallenges.some(
      challenge => challenge.challengeId === data.id && challenge.userId === user.id,
    );
    setIsAttended(alreadyParticipated);
    if (alreadyParticipated) {
      setButtonText('이미 참가한 도전입니다.');
    }
  }, [data.id, participatedChallenges, user.id]);

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
          const updatedParticipatedChallenges = [...participatedChallenges, { challengeId: data.id, userId: user.id }];
          // 도전 참가 상태 저장
          setParticipatedChallenges(updatedParticipatedChallenges);
          setIsAttended(true);
          setButtonText('참여 완료');
          // 로컬 스토리지에도 저장
          saveToLocalStorage(updatedParticipatedChallenges);

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
          // 참가자 목록에서 제거
          const updatedParticipatedChallenges = participatedChallenges.filter(
            challenge => challenge.challengeId !== data.id || challenge.userId !== user.id,
          );
          // 도전 참가 상태 저장
          setParticipatedChallenges(updatedParticipatedChallenges);
          setIsAttended(false);
          setButtonText('도전 참여');
          // 로컬 스토리지에도 저장
          saveToLocalStorage(updatedParticipatedChallenges);
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
    const prompt = window.confirm('정말로 삭제 하시겠습니까?');
    if (prompt) {
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

  useEffect(() => {
    // 로컬 스토리지에서 상태를 가져옴
    const savedChallenges = JSON.parse(localStorage.getItem('participatedChallenges')) || [];
    setParticipatedChallenges(savedChallenges);

    // 현재 챌린지가 저장된 챌린지에 있는지 확인
    setIsAttended(savedChallenges.some(challenge => challenge.challengeId === data.id && challenge.userId === user.id));
  }, []);

  // JSON 형태로 데이터를 직렬화 하여 로컬스토리지에 저장
  const saveToLocalStorage = challenges => {
    localStorage.setItem('participatedChallenges', JSON.stringify(challenges));
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
