const pool = require('./pool');

const sql = {
  boardList: `SELECT b.id, u.name, b.title, DATE_FORMAT(b.createdAt, '%Y-%m-%d') as createdAt, b.contents, b.viewCnt
              from user u inner join board b on u.user_id = b.creatorId
              ORDER BY b.id DESC
              LIMIT ?, ?`,
  board: `SELECT b.id, u.name, b.title, DATE_FORMAT(b.createdAt, '%Y-%m-%d') as createdAt, b.contents, b.viewCnt
          from user u inner join board b on u.user_id = b.creatorId
          WHERE b.id = ?`,
  insert: `INSERT INTO board(title, contents, creatorId) VALUES(?, ?, ?)`,
  update: `UPDATE board SET title = ?, contents= ?, updatedAt = NOW() WHERE id = ?`,
  delete: 'DELETE FROM board WHERE id = ?',
  totalCount: `SELECT COUNT(*) as cnt FROM board`,
  incCount: `UPDATE board SET viewCnt = viewCnt + 1 WHERE id = ?`,
};

const boardDAO = {
  boardList: async (item, callback) => {
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      const [data] = await conn.query(sql.boardList, [Number(no * size), Number(size)]);
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
  insert: async (item, callback) => {
    const { title, content, creatorId } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      conn.beginTransaction();
      const [data] = await conn.query(sql.insert, [title, content, creatorId]);
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
  update: async (item, callback) => {
    const { title, content, id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      const [resp] = await conn.query(sql.update, [title, content, Number(id)]);
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
};

module.exports = boardDAO;
