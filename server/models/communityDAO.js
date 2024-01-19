/* eslint-disable camelcase */
const pool = require('./pool');

const sql = {
  // 게시판 입력
  insert: `INSERT INTO community (user_id, category, title, contents, Image)
            VALUES (?, ?, ?, ?, ?)`,
  // 게시판 수정(이미지는 update로 힘들다나?)
  update: `UPDATE community
            SET title = ?,
                contents = ?,
                category = ?,
                Image =?
            WHERE id = ?`,
  // 게시판 삭제
  delete: 'DELETE FROM community WHERE id = ?',

  // 게시물 리스트 조회 (전체)
  listAll: `SELECT
              c.id AS id,
              IFNULL(u.nickname, '사용자 없음') AS nickname,
              c.category AS category,
              c.title AS title,
              c.created_at AS created_at,
              c.view_cnt AS view_cnt,
              c.like_cnt AS like_cnt
            FROM community c
            LEFT JOIN user u ON c.user_id = u.id
            ORDER BY c.created_at DESC`,

  // 게시판 상세보기(닉네임 댓글 등)
  board: `SELECT b.id, b.user_id, u.nickname, b.title, b.contents, b.created_at, b.like_cnt, b.view_cnt, b.Image, b.category 
          FROM community b
            JOIN user u ON b.user_id = u.id
            LEFT JOIN community_likes l ON b.id = l.post_id
            LEFT JOIN community_comment c ON b.id = c.post_id
            LEFT JOIN user cu ON c.user_id = cu.id
          WHERE b.id = ?
          GROUP BY b.id, u.nickname, b.title, b.contents, b.created_at, b.like_cnt, b.view_cnt`,

  // 댓글 목록 조회
  getComments: `SELECT c.comment_id, c.contents, c.create_date, u.nickname, u.profile_image, c.user_id
                FROM community_comment c
                LEFT JOIN user u ON c.user_id = u.id
                WHERE c.post_id = ?
                ORDER BY c.create_date DESC`,

  // 좋아요 유저 조회
  getLike: `SELECT user_id
            FROM community_likes
            WHERE post_id = ?`,

  // 조회수 증가
  incCount: `UPDATE community SET view_cnt = view_cnt + 1 WHERE id = ?`,

  // 조회수 감소
  decCount: `UPDATE community SET view_cnt = view_cnt - 1 WHERE id = ?`,

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
      const [data] = await conn.query(sql.insert, [
        Number(user_id),
        category,
        title,
        contents,
        Image,
      ]);
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
    const { id, title, contents, Image, category } = item;
    let conn = null;
    try {
      conn = await pool.getConnection();
      await conn.beginTransaction();

      const [resp] = await conn.query(sql.update, [title, contents, category, Image, Number(id)]);

      conn.commit();
      callback({
        status: 200,
        message: '게시물 수정 완료',
        data: resp,
      });
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

  // 게시물 리스트 조회 (전체 또는 특정 카테고리)
  boardList: async (callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // DB 연결
      const query = sql.listAll; // 항상 listAll을 사용하도록 변경

      const [data] = await conn.query(query);
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

      // 좋아요 목록 조회
      const [likeData] = await conn.query(sql.getLike, [post_id]);

      // 좋아요 목록을 배열로 변환
      const likes = likeData.map((item) => item.user_id);

      conn.commit();

      callback({
        status: 200,
        message: '게시물 상세 조회 성공',
        data: {
          board: boardData[0],
          comments: commentData,
          likes: likes,
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

      await conn.query(sql.commentInsert, [Number(post_id), Number(user_id), contents]);

      conn.commit();

      callback({
        status: 200,
        message: '정상적으로 댓글이 등록 되었습니다.',
        data: {},
      });
    } catch (error) {
      console.error('댓글 입력 실패:', error);

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
  commentUpdate: async (item, callback) => {
    const { comment_id, user_id, contents } = item;
    let conn = null;
    try {
      conn = await pool.getConnection();
      await conn.beginTransaction();

      const [resp] = await conn.query(sql.update, [comment_id, contents, user_id]);

      conn.commit();
      callback({
        status: 200,
        message: '게시물 수정 완료',
        data: resp,
      });
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
      // 좋아요 등록 및 게시물에 업데이트
      await conn.query(sql.like, [post_id, user_id]);
      await conn.query(sql.likeupdate, [post_id]);
      await conn.query(sql.decCount, [post_id]);
      conn.commit();
      callback({ status: 200, message: 'OK', ok: true });
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
      // 좋아요 취소 및 게시물에 업데이트
      await conn.query(sql.notlike, [post_id, user_id]);
      await conn.query(sql.notlikeupdate, [post_id]);
      await conn.query(sql.decCount, [post_id]);
      conn.commit();
      callback({ status: 200, message: 'OK', ok: true });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '좋아요 취소 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = communityDAO;
