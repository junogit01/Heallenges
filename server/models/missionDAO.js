const pool = require('./pool');

const sql = {
  createMission: `INSERT INTO mission
                  (title, description, start_date, end_date, user_cnt, mission_image, reward)
                  VALUES (?, ?, ?, ?, ?, ?, ?)
                  ON DUPLICATE KEY UPDATE user_cnt = user_cnt + 1`,
};

const missionDAO = {
  createMission: async (item, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      const { title, description, start_date, end_date, mission_image, reward } = item;
      const [result] = await conn.query(sql.createMission, [
        title,
        description,
        start_date,
        end_date,
        0,
        mission_image,
        reward,
      ]);
      callback({
        status: 200,
        message: '미션 생성 성공',
        missionId: result.insertId,
      });
    } catch (error) {
      callback({ status: 500, message: '미션 생성 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = missionDAO;
