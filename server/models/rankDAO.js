const pool = require('./pool');

const sql = {
  rankList: `SELECT
              name, reward_cnt, (@rank:=@rank+1) AS rank FROM user
              AS a,(SELECT @rank:=0)
              AS b ORDER BY a.reward_cnt
              DESC`,
  totalCount: `SELECT COUNT(*) as reward_cnt FROM user`,
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
      callback({ status: 500, message: '입력 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
};

module.exports = rankDAO;
