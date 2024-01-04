/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import moment from 'moment';

const Board = ({ user_id, title, nickname, view_cnt, created_at, contents }) => {
  useEffect(() => {
    console.log('Board 컴포넌트가 마운트되었습니다.');
    console.log(title);
    console.log(nickname);
    console.log(view_cnt);
    console.log(created_at);
    console.log(contents);
  }, [user_id, title, nickname, view_cnt, created_at, contents]); // 빈 배열을 두어 컴포넌트가 마운트될 때만 실행되도록 설정

  return (
    <div className="container mt-2" style={{ marginTop: '70px' }}>
      <table className="table table-borderless">
        <tbody>
          {/* 제목 */}
          <tr>
            <td colSpan="8" className="text-center">
              <h3 style={{ margin: '0 auto', textAlign: 'left' }}>{title}</h3>
            </td>
          </tr>
          {/* 닉네임, 게시일, 조회수 */}
          <tr
            style={{
              minHeight: '50px',
              border: '1px solid #ddd',
              padding: '0px',
            }}>
            <td colSpan="2" className="text-center align-items-center">
              <strong>닉네임:</strong> {nickname || '사용자 없음'}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="text-center align-items-center">
              <strong>게시일:</strong> {moment(created_at).format('YYYY-MM-DD HH:mm:ss')}
            </td>
            <td className="text-center align-items-center">
              <strong>조회수:</strong> {view_cnt || 0}
            </td>
          </tr>
          {/* 내용 */}
          <tr>
            <td colSpan="8">
              <div
                style={{
                  minHeight: '300px',
                  fontSize: '1.5em',
                  border: '0px solid #ddd',
                  padding: '10px',
                  textAlign: 'left',
                }}>
                <strong></strong> {contents || '내용 없음'}
              </div>
            </td>
          </tr>
          {/* 좋아요, 수정, 삭제 버튼 */}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="button" className="btn btn-primary btn-lg" style={{ margin: '0 5px' }}>
                  좋아요
                </button>
                <button type="button" className="btn btn-warning btn-lg" style={{ margin: '0 5px' }}>
                  수정
                </button>
                <button type="button" className="btn btn-danger btn-lg" style={{ margin: '0 5px' }}>
                  삭제
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Board;
