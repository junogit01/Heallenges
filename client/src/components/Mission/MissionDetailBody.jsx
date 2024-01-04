import React from 'react';

function MissionDetailBody() {
  return (
    <div className="card mb-5  mx-auto " style={{ width: '70rem' }}>
      <img src="/images/cards-1.jpg" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">미션 타이틀</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <p>
            Officiis animi maxime nulla quo et harum eum quis a. Sit hic in qui quos fugit ut rerum atque. Optio
            provident dolores atque voluptatem rem excepturi molestiae qui. Voluptatem laborum omnis ullam quibusdam
            perspiciatis nulla nostrum. Voluptatum est libero eum nesciunt aliquid qui. Quia et suscipit non sequi.
            Maxime sed odit. Beatae nesciunt nesciunt accusamus quia aut ratione aspernatur dolor. Sint harum eveniet
            dicta exercitationem minima. Exercitationem omnis asperiores natus aperiam dolor consequatur id ex sed.
            Quibusdam rerum dolores sint consequatur quidem ea. Beatae minima sunt libero soluta sapiente in rem
            assumenda. Et qui odit voluptatem. Cum quibusdam voluptatem voluptatem accusamus mollitia aut atque aut.
          </p>
        </li>
        <li className="list-group-item">
          {' '}
          <i className="bi bi-person"></i>
          누적 참가자 수 :
        </li>
        <li className="list-group-item">
          <i className="bi bi-tags"></i>리워드
        </li>
      </ul>
      <div className="card-body">
        <h4 className="comments-count">8 Comments</h4>

        <div className="comment">
          <div className="d-flex">
            <div className="comment-img">
              <img
                src="/images/blog/comments-1.jpg"
                alt=""
                style={{ maxHeight: '5rem', maxWidth: '5rem', marginRight: '5rem' }}
              />
            </div>
            <div>
              <h5>
                <p>Georgia Reader</p>{' '}
              </h5>
              <time datetime="2020-01-01">01 Jan,2022</time>
              <p>
                Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et. Est ad aut sapiente quis molestiae
                est qui cum soluta. Vero aut rerum vel. Rerum quos laboriosam placeat ex qui. Sint qui facilis et.
              </p>
            </div>
          </div>
          <div className="Reply_div">
            <h4> 댓글 </h4>

            <div className="Reply_write">
              <textarea
                rows="3"
                placeholder="100자 이내의 글을 입력해주세요."
                maxLength="100"
                name="write_reply"
                style={{ width: '68rem' }}></textarea>
              <input type="button" value="등록" id="reply_submit_button" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionDetailBody;
