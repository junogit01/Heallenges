/* eslint-disable camelcase */
const pool = require('./pool');

const sql = {
  // 게시판 입력
  insert: `INSERT INTO community (category, title, contents, Image)
            VALUES (?, ?, ?, ?)`,
  // 게시판 수정
  update: `UPDATE community
            SET title = ?, contents = ?
            WHERE id = ?`,
  // 게시판 삭제
  delete: `DELETE FROM community WHERE id = ?`,
  // 게시판 전체보기(no와 size를 이용해서 개수 조절)
  list: `SELECT b.id, u.nickname, title, DATE_FORMAT(b.created_at, '%Y-%m-%d %h-%i-%s') as Created, view_cnt, like_cnt
            FROM user u INNER JOIN community b ON u.id = b.user_id
            ORDER BY b.created_at DESC
            LIMIT ?,?`,
  // 게시물 총 개수
  totalCount: `SELECT COUNT(*) as cnt FROM community`,
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
                  INNER JOIN user u ON c.user_id = u.id
                WHERE c.post_id = ?
                ORDER BY c.create_date ASC`,
  // 조회수 증가
  incCount: `UPDATE community SET view_cnt = view_cnt + 1 WHERE id = ?`,
  // 댓글 입력
  c_insert: `INSERT INTO community_comment (contents)
              VALUES (?)`,
  // 댓글 수정
  c_update: `UPDATE community_comment
              SET contents = ?
              WHERE comment_id = ?`,
  // 댓글 삭제
  c_delete: `DELETE FROM community_comment WHERE comment_id = ?`,

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
    const { category, title, contents, Image } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      conn.beginTransaction();
      const [data] = await conn.query(sql.insert, [category, title, contents, Image]);
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
    const { title, contents, comment_id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      const [resp] = await conn.query(sql.update, [title, contents, comment_id]);
      conn.commit();
      callback({
        status: 200,
        message: '수정 완료',
        data: resp,
      });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '게시물 수정 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
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

  // 게시물 리스트 조회(전체)
  boardList: async (item, callback) => {
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      const [data] = await conn.query(sql.list, [Number(no * size), Number(size)]);
      const [total] = await conn.query(sql.totalCount);
      const totalPage = Math.ceil(total[0].cnt / size);
      callback({
        status: 200,
        message: 'List Up OK',
        pageno: no + 1,
        pagesize: size,
        total: total[0].cnt,
        totalPage,
        data: data,
      });
    } catch (error) {
      callback({ status: 500, message: '불러오기 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  // 게시물 상세 조회(댓글도 표시)
  board: async (item, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      // 게시물 조회
      const [boardResult] = await conn.query(sql.board, [item.id]);

      // 댓글 목록 조회
      const [commentsResult] = await conn.query(sql.getComments, [item.id]);

      // 조회수 증가
      await conn.query(sql.incCount, [item.id]);

      conn.commit();

      // 게시물과 댓글 목록을 함께 반환
      callback({
        status: 200,
        message: 'OK',
        data: { board: boardResult[0], comments: commentsResult },
      });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '게시물 조회 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 댓글 입력
  c_insert: async (item, callback) => {
    const { contents } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      conn.beginTransaction();
      const [data] = await conn.query(sql.c_insert, [contents]);
      conn.commit();
      callback({
        status: 200,
        message: '정상적으로 댓글이 등록 되었습니다.',
        data: data,
      });
    } catch (error) {
      callback({
        status: 500,
        message: '댓글 입력 실패',
        error: error,
      });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 댓글 수정
  c_update: async (item, callback) => {
    // eslint-disable-next-line camelcase
    const { contents, comment_id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      const [resp] = await conn.query(sql.c_update, [contents, comment_id]);
      conn.commit();
      callback({
        status: 200,
        message: '수정 완료',
        data: resp,
      });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '댓글 수정 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  // 댓글 삭제
  c_delete: async (item, callback) => {
    console.log(item);
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const [resp] = await conn.query(sql.c_delete, [Number(item.comment_id)]);
      conn.commit();

      callback({ status: 200, message: 'OK', data: resp });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '댓글 삭제 실패', error: error });
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
