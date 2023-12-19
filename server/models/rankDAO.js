const sql = {
  rankList: `SELECT
              U.name,
              U.rewardCnt
              FROM User U
              ORDER BY rewardCnt DESC
              LIMIT ?, ?`,
};

const rankDAO = {
  rankList: async (item, callback) => {
    // const { limits, limite } = item;
    // console.log('userDAO=>',);
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      const [data, filedset] = await conn.query(sql.rankList, [Number(no * size), Number(size)]);
      const [total] = await conn.query(sql.totalCount);
      callback({
        status: 200,
        message: 'ok',
        pageno: no + 1,
        pagesize: size,
        total: total[0].cnt,
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
