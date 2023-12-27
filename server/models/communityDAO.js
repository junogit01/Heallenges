/* eslint-disable camelcase */
const pool = require('./pool');

const sql = {
  // 게시판 입력
  insert: `INSERT INTO community (category, title, contents, Image)
            VALUES (?, ?, ?, ?)`,
  // 게시판 수정
  update: `UPDATE community
            SET title = ?,
                contents = ?,
                category = ?
            WHERE id = ? AND user_id = ?`,
  // 게시판 삭제
  delete: 'DELETE FROM community WHERE id = ?',

  // 아이디 받아서 해야되는데 지금 백단으로는 힘듦
  // delete: 'DELETE FROM community WHERE id = ? AND user_id = ?',
  // checkOwnership: 'SELECT COUNT(*) AS count FROM community WHERE id = ? AND user_id = ?',

  // 게시물 리스트 조회 (전체)
  listAll: `SELECT
              c.id AS 게시판번호,
              IFNULL(u.nickname, '사용자 없음') AS 닉네임,
              c.category AS 카테고리,
              c.title AS 제목,
              c.created_at AS 게시물생성일,
              c.view_cnt AS 조회수,
              c.like_cnt AS 좋아요
            FROM community c
            LEFT JOIN user u ON c.user_id = u.id
            ORDER BY c.created_at DESC`,
  // 게시물 리스트 조회 (특정 카테고리)
  listByCategory: `SELECT
                      c.id AS 게시판번호,
                      IFNULL(u.nickname, '사용자 없음') AS 닉네임,
                      c.category AS 카테고리,
                      c.title AS 제목,
                      c.created_at AS 게시물생성일,
                      c.view_cnt AS 조회수,
                      c.like_cnt AS 좋아요
                    FROM community c
                    LEFT JOIN user u ON c.user_id = u.id
                    WHERE c.category = ?
                    ORDER BY c.created_at DESC`,
  // 게시판 상세보기(닉네임 댓글 등)
  board: `SELECT b.id, u.nickname, b.title, b.contents, b.created_at, b.like_cnt, b.view_cnt 
          FROM community b
            JOIN user u ON b.user_id = u.id
            LEFT JOIN community_likes l ON b.id = l.post_id
            LEFT JOIN community_comment c ON b.id = c.post_id
            LEFT JOIN user cu ON c.user_id = cu.id
          WHERE b.id = ?
          GROUP BY b.id, u.nickname, b.title, b.contents, b.created_at, b.like_cnt, b.view_cnt`,
  // 댓글 목록 조회
  getComments: `SELECT c.comment_id, c.contents, c.create_date, u.nickname
                FROM community_comment c
                LEFT JOIN user u ON c.user_id = u.id
                WHERE c.post_id = ?
                ORDER BY c.create_date ASC`,
  // 조회수 증가
  incCount: `UPDATE community SET view_cnt = view_cnt + 1 WHERE id = ?`,

  // 댓글 입력(여기부터 다시 시작)
  commentInsert: `INSERT INTO community_comment (post_id, user_id, contents)
                  VALUES (?, ?, ?)`,
  // 댓글 수정
  commentUpdate: `UPDATE community_comment
                SET contents = ?
                WHERE comment_id = ? AND user_id = ?`,
  // 댓글 삭제
  commentDelete: `DELETE FROM community_comment WHERE comment_id = ?`,

  // 좋아요 추가
  like: `INSERT INTO community_likes (post_id, user_id) VALUES (?, ?)`,
  likeupdate: `UPDATE community SET like_cnt = like_cnt + 1 WHERE id = ?`,

  // 좋아요 취소 (GREATEST로 0미만 못가게 방지)
  notlike: `DELETE FROM community_likes WHERE post_id = ? AND user_id = ?`,
  notlikeupdate: `UPDATE community SET like_cnt = GREATEST(like_cnt - 1, 0) WHERE id = ?`,
};

const communityDAO = {
  // 게시물 입력
  insert: async (item, callback) => {
    const { user_id, category, title, contents, Image } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      conn.beginTransaction();
      const [data] = await conn.query(sql.insert, [user_id, category, title, contents, Image]);
      conn.commit();
      callback({
        status: 200,
        message: '정상적으로 게시물이 등록 되었습니다.',
        data: data,
      });
    } catch (error) {
      callback({
        status: 500,
        message: '게시물 입력 실패',
        error: error,
      });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 게시물 수정
  update: async (item, callback) => {
    const { id, user_id, title, contents, category } = item;
    let conn = null;
    try {
      conn = await pool.getConnection();
      await conn.beginTransaction();

      const [resp] = await conn.query(sql.update, [title, contents, category, id, user_id]);

      conn.commit();

      if (resp.affectedRows > 0) {
        callback({
          status: 200,
          message: '수정 완료',
          data: resp,
        });
      } else {
        // 해당 ID와 user_id에 맞는 글이 없는 경우
        callback({
          status: 404,
          message: '수정할 글이 없음',
          data: null,
        });
      }
    } catch (error) {
      conn.rollback();
      callback({
        status: 500,
        message: '게시물 수정 실패',
        error: error,
      });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 게시물 삭제
  delete: async (item, callback) => {
    console.log(item);
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const [resp] = await conn.query(sql.delete, [Number(item.id)]);
      conn.commit();

      callback({ status: 200, message: 'OK', data: resp });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '게시물 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 근데 삭제하려면 유저아이디도 같아야 되는거 같은데 (프론트단 하고 테스트용)
  // delete: async (item, callback) => {
  //   console.log(item);
  //   let conn = null;
  //   try {
  //     conn = await pool.getConnection();
  //     conn.beginTransaction();

  //     const [resp] = await conn.query(sql.delete, [Number(item.id), Number(item.user_id)]);
  //     conn.commit();

  //     callback({ status: 200, message: 'OK', data: resp });
  //   } catch (error) {
  //     conn.rollback();
  //     callback({ status: 500, message: '게시물 삭제 실패', error: error });
  //   } finally {
  //     if (conn !== null) conn.release();
  //   }
  // },

  // 게시물 리스트 조회 (전체 또는 특정 카테고리)
  boardList: async (category, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // DB 연결
      // eslint-disable-next-line prefer-const
      let query = category ? sql.listByCategory : sql.listAll;

      const [data] = await conn.query(query, category ? [category] : []);
      callback({
        status: 200,
        message: '게시물 리스트 조회 성공',
        data: data,
      });
    } catch (error) {
      callback({
        status: 500,
        message: '게시물 리스트 조회 실패',
        error: error.message,
      });
    } finally {
      if (conn !== null) conn.release(); // DB 연결 해제
    }
  },

  // 게시물 상세 조회(댓글도 표시)
  board: async (post_id, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      // 조회수 증가
      await conn.query(sql.incCount, [post_id]);

      // 게시물 상세 정보 조회
      const [boardData] = await conn.query(sql.board, [post_id]);

      // 댓글 목록 조회
      const [commentData] = await conn.query(sql.getComments, [post_id]);

      conn.commit();

      callback({
        status: 200,
        message: '게시물 상세 조회 성공',
        data: {
          board: boardData[0],
          comments: commentData,
        },
      });
    } catch (error) {
      conn.rollback();
      callback({
        status: 500,
        message: '게시물 상세 조회 실패',
        error: error.message,
      });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 댓글 입력
  commentInsert: async (item, callback) => {
    const { post_id, user_id, contents } = item;
    let conn = null;

    try {
      conn = await pool.getConnection(); // DB 접속
      conn.beginTransaction();

      await conn.query(sql.commentInsert, [post_id, user_id, contents]);

      conn.commit();

      callback({
        status: 200,
        message: '정상적으로 댓글이 등록 되었습니다.',
      });
    } catch (error) {
      console.error('댓글 입력 실패:', error);

      // 에러 처리를 추가하고 클라이언트에게 전달할 적절한 에러 메시지를 반환합니다.
      callback({
        status: 500,
        message: '댓글 입력 중에 오류가 발생했습니다.',
        error: error,
      });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 댓글 수정
  commentUpdate: async (contents, comment_id, user_id, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // 데이터베이스 접속

      // 사용자 ID 검증
      const userVerificationQuery =
        'SELECT COUNT(*) AS userCount FROM community_comment WHERE comment_id = ? AND user_id = ?';
      const [userVerificationResult] = await conn.query(userVerificationQuery, [
        comment_id,
        user_id,
      ]);

      if (userVerificationResult[0].userCount === 0) {
        // 사용자 ID가 일치하지 않으면 403 Forbidden 응답을 보냅니다.
        callback({
          status: 403,
          message: '해당 댓글에 대한 권한이 없습니다.',
        });
        return;
      }

      await conn.beginTransaction(); // 트랜잭션 시작

      const updateQuery =
        'UPDATE community_comment SET contents = ? WHERE comment_id = ? AND user_id = ?';
      const [data] = await conn.query(updateQuery, [contents, comment_id, user_id]);

      await conn.commit(); // 트랜잭션 커밋

      callback({
        status: 200,
        message: '댓글이 성공적으로 수정되었습니다.',
        data: data,
      });
    } catch (error) {
      await conn.rollback(); // 에러 발생 시 롤백
      callback({
        status: 500,
        message: '댓글 수정 실패',
        error: error,
      });
    } finally {
      if (conn !== null) conn.release(); // 연결 해제
    }
  },

  // 댓글 삭제
  commentDelete: async (comment_id, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const [result] = await conn.query(sql.commentDelete, [comment_id]);
      conn.commit();
      callback({
        status: 200,
        message: '댓글이 성공적으로 삭제되었습니다.',
        data: result,
      });
    } catch (error) {
      conn.rollback();
      callback({
        status: 500,
        message: '댓글 삭제 실패',
        error: error.message,
      });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 좋아요 등록
  like: async (item, callback) => {
    const { post_id, user_id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();
      // 좋아요 등록
      await conn.query(sql.like, [post_id, user_id]);
      // 좋아요 수 업데이트
      await conn.query(sql.likeupdate, [post_id]);
      conn.commit();
      callback({ status: 200, message: 'OK' });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '좋아요 등록 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 좋아요 취소
  notlike: async (item, callback) => {
    const { post_id, user_id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();
      // 좋아요 취소
      await conn.query(sql.notlike, [post_id, user_id]);
      // 좋아요 수 업데이트
      await conn.query(sql.notlikeupdate, [post_id]);
      conn.commit();
      callback({ status: 200, message: 'OK' });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '좋아요 취소 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 마지막 괄호 올라옴 방지 주석
};

module.exports = communityDAO;
