import React, { useEffect, useRef, useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '';
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

  const addMessage = (sender, message) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;

    addMessage('user', message);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          max_tokens: 1024, // 답변 최대 글자 수,
          top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
          temperature: 0, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
          frequency_penalty: 0, // 전문성, 높을수록 간결, 낮을수록 전문적 (0~1)
          presence_penalty: 1, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
          stop: ['문장 생성 중단 단어'],
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || 'No response';
      addMessage('bot', aiResponse);
    } catch (error) {
      console.error('오류 발생!', error);
      addMessage('오류 발생!');
    } finally {
      setLoading(false);
    }
  };

  /*  onKeyUp, onKeyDown은 한글 입력 방식(조합)에 문제가 있는데
      isComposing 속성으로 입력이 완료 되었는지 여부를 확인할 수 있다고 한다.
      isComposing이 false여야 입력이 완료되었음을 나타낸다.
  */
  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      handleSendMessage();
    }
  };

  const chatDivRef = useRef(null);

  useEffect(() => {
    // 메시지가 변경될 때마다 chatDivRef의 맨 아래로 스크롤
    chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
  }, [messages]);

  return (
    <div id="Chatbot">
      <h2>인공지능 챗봇</h2>
      {loading && (
        <span className="messageWait" style={{ color: 'red' }}>
          답변을 기다리고 있습니다
        </span>
      )}
      <div
        ref={chatDivRef}
        className="chatDiv mx-2 mb-3"
        style={{
          maxHeight: '380px',
          overflowY: 'auto',
        }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
            style={{
              border: '1px solid #ccc',
              padding: '8px',
              borderRadius: '8px',
              marginBottom: '8px',
              backgroundColor: msg.sender === 'bot' ? '#fdfffa' : '#ebeb87',
              width: 'fit-content',
              marginLeft: msg.sender === 'user' ? 'auto' : '0',
              whiteSpace: 'pre-line',
            }}>
            {`${msg.sender === 'user' ? '나' : '챗봇'} : ${msg.message.replace(/\./g, '.\n')}`}
          </div>
        ))}
      </div>
      <div className="input-group mx-0" style={{ position: 'absolute', bottom: '20px', width: '500px' }}>
        <input
          className="form-control"
          type="text"
          placeholder="메시지를 입력하세요"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ width: '20rem' }}
        />
        <button className="btn btn-success" onClick={handleSendMessage}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
