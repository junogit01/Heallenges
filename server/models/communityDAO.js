const pool = require('./pool');

const sql = {
  insert: `INSERT INTO Community (userID, category, title, contents, Image)
            VALUES ((SELECT id FROM User WHERE nickname = ? LIMIT 1), ?, ?, ?, ?)`,
  update: `UPDATE Community
            SET title = ?, contents = ?
            WHERE postID = ?`,
  delete: `DELETE FROM Community WHERE postID = ?`,
  list: `SELECT b.userID, u.nickname, title, DATE_FORMAT(b.CommunityCreatedAt, '%Y-%m-%d %h-%i-%s') as CommunityCreatedAt, viewCnt, likeCnt
            FROM User u INNER JOIN Community b ON u.id = b.userID
            ORDER BY b.CommunityCreatedAt DESC
            LIMIT ?,?;`,
  totalCount: `SELECT COUNT(*) as cnt FROM Community`,
};

const communityDAO = {
  // 게시물 입력
  insert: async (item, callback) => {
    const { userID, category, title, contents, Image } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      conn.beginTransaction();
      const [data] = await conn.query(sql.insert, [userID, category, title, contents, Image]);
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
    const { title, contents, postID } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      const [resp] = await conn.query(sql.update, [title, contents, postID]);
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

      const [resp] = await conn.query(sql.delete, [Number(item.postID)]);
      conn.commit();

      callback({ status: 200, message: 'OK', data: resp });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '게시물 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 게시물 전체 조회
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
};

module.exports = communityDAO;
