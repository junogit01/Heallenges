const pool = require('./pool');

const sql = {
  createMission: `INSERT INTO mission
                  (title, description, user_cnt, mission_image, reward, mission_type)
                  VALUES (?, ?, ?, ?, ?, ?)`,
  delete: `DELETE FROM mission WHERE id = ?`,
  missionList: `SELECT title, mission_image, description FROM mission WHERE mission_type = ?`,
  // missionList: `SELECT title, mission_image, description FROM mission WHERE ? IS NULL OR mission_type = ?`,
  totalCount: `SELECT COUNT(*) as title FROM mission`,
  missionDetail: `SELECT m.title, m.description, m.user_cnt, m.mission_image, m.reward, m.mission_type,
                  user.name, mc.content, mc.created_at
                  FROM mission m
                  LEFT JOIN mission_comment mc ON m.id = mc.mission_id
                  LEFT JOIN user ON mc.user_id = user.id
                  WHERE m.id = ?;`,
  createComment: `INSERT INTO mission_comment
                  (user_id, mission_id, content)
                  VALUES (?, ?, ?)`,
  participateMission: `INSERT INTO mission_user
                  (user_id, mission_id, status, start_at)
                  VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
  updateComment: ``,
  deleteComment: ``,
};
// 미션 생성
const missionDAO = {
  createMission: async (item, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      const { title, description, mission_image, reward, mission_type } = item;
      const [result] = await conn.query(sql.createMission, [
        title,
        description,
        0,
        mission_image,
        reward,
        mission_type,
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
  // 미션 삭제
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
      callback({ status: 500, message: '미션 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },
  // 미션 리스트
  missionList: async (item, callback) => {
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;
    const missionType = item.mission_type;
    let conn = null;
    try {
      conn = await pool.getConnection();
      const [data, filedset] = await conn.query(sql.missionList, missionType);
      const [total] = await conn.query(sql.totalCount);
      callback({
        status: 200,
        message: 'ok',
        pageno: no + 1,
        pagesize: size,
        total: total[0].title,
        data: data,
      });
    } catch (error) {
      callback({ status: 500, message: '미션 조회 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 미션 상세 페이지
  missionDetail: async (item, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const [resp] = await conn.query(sql.missionDetail, [item.id]);

      conn.commit();
      callback({ status: 200, message: 'OK', data: resp[0] });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '미션 상세 조회 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 미션 참여

  participateMission: async (item, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      const { user_id, mission_id } = item;
      await conn.query(sql.participateMission, [user_id, mission_id, 1]);

      callback({ status: 200, message: '미션 참여 성공' });
    } catch (error) {
      callback({ status: 500, message: '미션 참여 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 댓글 생성
  createComment: async (item, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      const { user_id, mission_id, content } = item;
      await conn.query(sql.createComment, [user_id, mission_id, content]);
      callback({ status: 200, message: '댓글 생성 성공' });
    } catch (error) {
      callback({ status: 500, message: '댓글 생성 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = missionDAO;
