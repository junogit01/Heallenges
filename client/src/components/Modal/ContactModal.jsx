import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import emailJs from '@emailjs/browser';
import Swal from 'sweetalert2';

function ContactModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const form = useRef();
  const sendEmail = event => {
    event.preventDefault();
    emailJs.sendForm('service_ono70bg', 'template_4i820ub', form.current, 'Zw-7BuvjUC7ncOZHR').then(
      result => {
        Swal.fire({
          title: '문의 접수 완료', // Alert 제목
          text: '정상적으로 접수되었습니다. 빠르게 확인 후 조치하겠습니다.', // Alert 내용
          icon: 'success', // Alert 타입
        });
      },
      error => {
        Swal.fire({
          title: '문의 접수 실패', // Alert 제목
          text: '접수 실패하였습니다. 다시 시도해 주시기 바랍니다.', // Alert 내용
          icon: 'error', // Alert 타입
        });
      },
    );
  };
  return (
    <>
      <Link to="#" className="dropdown-item" variant="primary" onClick={handleShow}>
        문의하기
      </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>문의하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form} onSubmit={sendEmail}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>회신 이메일</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" autoFocus name="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>문의 내용</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="문의하실 내용을 입력해주세요" name="message" />
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
              <Button className="me-2" type="submit" variant="primary" onClick={handleClose}>
                제출하기
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ContactModal;
