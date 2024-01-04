import React from 'react';

function CommentForm() {
  return (
    <div className="comment">
      <div className="Reply_div">
        <h4> 댓글 </h4>

        <div className="Reply_write" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <textarea
            rows="3"
            placeholder="100자 이내의 글을 입력해주세요."
            maxLength="100"
            name="write_reply"
            style={{ width: '53rem', marginBottom: '10px' }}></textarea>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '53rem' }}>
            <input type="button" value="등록" id="reply_submit_button" className="btn btn-primary" />
            {/* className=""하면 기존대로 나옴 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
