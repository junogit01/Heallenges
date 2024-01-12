// ScrollBtn.jsx

import React, { useState } from 'react';
import './ScrollBtn.css';
import Chatbot from '@components/ChatBot';
import Modal from 'react-modal';

function ScrollBtn() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const openChatbotModal = () => {
    setIsChatbotOpen(true);
  };

  const closeChatbotModal = () => {
    setIsChatbotOpen(false);
  };

  return (
    <>
      <div className="scroll__container mb-5" style={{ position: 'fixed', right: '5%', bottom: '5%', zIndex: '1' }}>
        <div className="mb-4">
          <button id="top" type="button" onClick={openChatbotModal}>
            <i className="bi bi-chat-dots"></i>
          </button>
        </div>
      </div>

      {isChatbotOpen && (
        <div>
          <Modal
            isOpen={openChatbotModal}
            onRequestClose={() => closeChatbotModal()}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                zIndex: 10,
              },
              content: {
                borderRadius: '30px',
                display: 'flex',
                flexDirection: 'column',
                top: '18vh',
                left: '120vh',
                outline: 'none',
                zIndex: 10,
              },
            }}>
            <Chatbot />
            <span style={{ position: 'absolute', cursor: 'pointer', right: '20px' }} onClick={closeChatbotModal}>
              <i class="bi bi-x-lg"></i>
            </span>
          </Modal>
        </div>
      )}
    </>
  );
}

export default ScrollBtn;
