const pool = require('./pool');

const sql = {
  rankList: `SELECT
              name, reward_cnt, (@rank:=@rank+1) AS rank FROM user
              AS a,(SELECT @rank:=0)
              AS b ORDER BY a.reward_cnt
              DESC, a.name`,
  totalCount: `SELECT COUNT(*) as reward_cnt FROM user`,
  rankSearch: `SELECT
                name, reward_cnt, rank
              FROM
                (SELECT
                  name, reward_cnt, (@rank:=@rank+1) AS rank
                FROM
                  user AS a,
                  (SELECT @rank:=0) AS b
                ORDER BY
                  a.reward_cnt DESC, a.name) AS ranked_users
              WHERE
                name = ?`,
};

const rankDAO = {
  rankList: async (item, callback) => {
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      const [data, filedset] = await conn.query(sql.rankList);
      const [total] = await conn.query(sql.totalCount);
      callback({
        status: 200,
        message: 'ok',
        pageno: no + 1,
        pagesize: size,
        total: total[0].reward_cnt,
        data: data,
      });
    } catch (error) {
      callback({ status: 500, message: '랭킹 조회 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },

  rankSearch: async (item, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      const [data, fieldset] = await conn.query(sql.rankSearch, [`${item}`]);
      callback({
        status: 200,
        message: '검색 성공',
        data: data,
      });
    } catch (error) {
      callback({ status: 500, message: '랭킹 검색 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = rankDAO;
