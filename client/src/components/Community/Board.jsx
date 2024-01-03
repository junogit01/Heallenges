/* eslint-disable camelcase */
import React from 'react';
import moment from 'moment';

const Board = ({ title, nickname, view_cnt, created_at, contents }) => {
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
              minHeight: '50px', // 최소한의 높이 설정
              border: '1px solid #ddd', // 예시로 보여주기 위한 테두리 스타일
              padding: '0px', // 예시로 보여주기 위한 안쪽 여백
            }}>
            <td colSpan="2" className="text-center align-items-center">
              <strong>닉네임:</strong> {nickname || '사용자 없음'}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            {/* 게시일 */}
            <td className="text-center align-items-center">
              <strong>게시일:</strong> {moment(created_at).format('YYYY-MM-DD HH:mm:ss')}
            </td>
            {/* 조회수 */}
            <td className="text-center align-items-center">
              <strong>조회수:</strong> {view_cnt || 0}
            </td>
          </tr>
          {/* 내용 */}
          <tr>
            <td colSpan="8">
              <div
                style={{
                  minHeight: '300px', // 최소한의 높이 설정
                  fontSize: '1.5em',
                  border: '0px solid #ddd', // 예시로 보여주기 위한 테두리 스타일
                  padding: '10px', // 예시로 보여주기 위한 안쪽 여백
                  textAlign: 'left', // 왼쪽 정렬 추가
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
              <td style={{ margin: '0 5px' }}>
                <button type="button" className="btn btn-primary btn-lg">
                  좋아요
                </button>
              </td>
              <td style={{ margin: '0 5px' }}>
                <button type="button" className="btn btn-warning btn-lg">
                  수정
                </button>
              </td>
              <td style={{ margin: '0 5px' }}>
                <button type="button" className="btn btn-danger btn-lg">
                  삭제
                </button>
              </td>
            </td>
          </tr>
          {/* <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-primary btn-lg" style={{ marginRight: '5px' }}>
                  좋아요
                </button>
                <button type="button" className="btn btn-warning btn-lg" style={{ marginRight: '5px' }}>
                  수정
                </button>
                <button type="button" className="btn btn-danger btn-lg" style={{ marginRight: '5px' }}>
                  삭제
                </button>
              </div>
            </td>
          </tr> */}
          {/* <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-primary btn-lg">
                  좋아요
                </button>
                <button type="button" className="btn btn-warning btn-lg" style={{ margin: '0 5px' }}>
                  수정
                </button>
                <button type="button" className="btn btn-danger btn-lg">
                  삭제
                </button>
              </div>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
