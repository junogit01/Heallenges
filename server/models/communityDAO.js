const pool = require('./pool');

const sql = {
  insert: `INSERT INTO community (category, title, contents, Image)
            VALUES (?, ?, ?, ?)`,
  update: `UPDATE community
            SET title = ?, contents = ?
            WHERE id = ?`,
  delete: `DELETE FROM community WHERE id = ?`,
  list: `SELECT b.id, u.nickname, title, DATE_FORMAT(b.created_at, '%Y-%m-%d %h-%i-%s') as Created, view_cnt, like_cnt
            FROM user u INNER JOIN community b ON u.id = b.user_id
            ORDER BY b.created_at DESC
            LIMIT ?,?`,
  totalCount: `SELECT COUNT(*) as cnt FROM community`,
  board: `SELECT b.id, u.nickname, b.title, b.contents, b.created_at, b.like_cnt, b.view_cnt,
          GROUP_CONCAT(DISTINCT l.user_id) AS likeUserIDs, 
          GROUP_CONCAT(DISTINCT CONCAT(cu.nickname, ': ', c.contents, ' (', c.create_date, ')') ORDER BY c.create_date ASC SEPARATOR '\n') AS formattedComments
          FROM
            community b
          JOIN
            user u ON b.user_id = u.id
          LEFT JOIN
            Likes l ON b.id = l.post_id
          LEFT JOIN
            comment c ON b.id = c.post_id
          LEFT JOIN
            user cu ON c.user_id = cu.id
          WHERE
            b.id = ?
          GROUP BY
            b.id, u.nickname, b.title, b.contents, b.created_at, b.like_cnt, b.view_cnt`,
  incCount: `UPDATE community SET view_cnt = view_cnt + 1 WHERE id = ?`,
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
    const { title, contents, id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      const [resp] = await conn.query(sql.update, [title, contents, id]);
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

      const [resp] = await conn.query(sql.board, [item.id]);
      await conn.query(sql.incCount, [item.id]);

      conn.commit();
      callback({ status: 200, message: 'OKay', data: resp[0] });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '게시물 조회 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = communityDAO;
