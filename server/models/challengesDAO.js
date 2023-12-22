const pool = require('./pool');

const sql = {
  createChallenge: `
    INSERT INTO challenges 
    (title, description, type, totalParticipants, rules, schedule, status, hostId, mainImage, prize) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  getAllChallenges: `SELECT * FROM challenges`,
  getChallengeById: `SELECT * FROM challenges WHERE id = ?`,
  updateChallenge: `
    UPDATE challenges 
    SET title = ?, description = ?, type = ?, totalParticipants = ?, rules = ?, schedule = ?, status = ?, hostId = ?, mainImage = ?, prize = ? 
    WHERE id = ?
  `,
  deleteChallenge: `DELETE FROM challenges WHERE id = ?`,
  getParticipants: `SELECT * FROM participants WHERE challengeId = ?`,
  addParticipant: `INSERT INTO participants (challengeId, memberId, authority, contribution) VALUES (?, ?, ?, ?)`,
  removeParticipant: `DELETE FROM participants WHERE challengeId = ? AND participantId = ?`,
  completeChallenge: `UPDATE challenges SET status = 'Completed' WHERE id = ?`,
  insert: `INSERT INTO challenge_community (title, contents, image, challenge_id, user_id) VALUES (?, ?, ?,?,?)`,
  update: `UPDATE challenge_community
           SET title = ?, contents = ?
           WHERE id = ?`,
  delete: `DELETE FROM challenge_community WHERE id = ?`,
  incCount: `UPDATE challenge_community SET view_cnt = view_cnt + 1 WHERE id = ?`,
  boardList: `SELECT m.title, m.view_cnt, u.name, m.id
              FROM challenges c
              JOIN challenge_community m ON c.id = m.challenge_id
              JOIN user u ON m.user_id = u.id
              WHERE c.id = ?
              LIMIT ?, ?`,
  board: `SELECT c.title, c.contents, u.name, c.view_cnt, c.created_at
          FROM challenge_community c
          JOIN challenges ON c.challenge_id = challenges.id
          JOIN user u ON c.user_id = u.id
          WHERE challenges.id = ? and c.id = ?`,
  getComment: `SELECT m.contents, u.name
               FROM challenge_community c
               JOIN challenge_comment m ON c.id = m.post_id
               JOIN user u ON m.user_id = u.id
               WHERE c.id = ?`,
  insertComment: `INSERT INTO challenge_comment(contents, user_id, post_id) VALUES(?, ?, ?)`,
  deleteComment: `DELETE FROM challenge_comment WHERE id = ?`,
};

const challengeDAO = {
  /**
   * 챌린지를 생성한다
   *
   * 새로운 챌린지를 데이터베이스에 추가한다. 챌린지 데이터는 challengeData 객체에 담겨있다.
   * 성공적으로 챌린지를 생성하면 콜백 함수를 통해 성공 메시지와 결과를 반환한다.
   * 오류가 발생할 경우 콜백 함수를 통해 오류 메시지와 오류 객체를 반환한다.
   *
   * @param {Object} challengeData - 새 챌린지에 대한 데이터.
   * @param {Function} callback - 응답을 처리하기 위한 콜백 함수.
   */
  createChallenge: async (challengeData, callback) => {
    try {
      // 데이터베이스에 챌린지를 삽입합니다.
      const result = await pool.query(sql.createChallenge, [
        challengeData.title,
        challengeData.description,
        challengeData.type,
        challengeData.totalParticipants,
        challengeData.rules,
        challengeData.schedule,
        challengeData.status,
        challengeData.hostId,
        challengeData.mainImage,
        challengeData.prize,
      ]);

      callback({ status: 200, message: '챌린지가 생성되었습니다', data: result });
      // 성공응답
    } catch (error) {
      console.error('챌린지 생성 중 오류 발생:', error);
      // 오류 처리
      callback({ status: 500, message: '챌린지 생성에 실패하였습니다', error: error });
      // 실패 응답
    }
  },

  // 모든 챌린지 조회
  getAllChallenges: async (callback) => {},

  // 특정 ID의 챌린지 조회
  getChallengeById: async (challengeId, callback) => {
    try {
      // 특정 ID의 챌린지 조회하는 쿼리 실행
      const challenge = await pool.query(sql.getChallengeById, [challengeId.id]);
      callback({ status: 200, message: 'Challenge retrieved', data: challenge });
    } catch (error) {
      callback({ status: 500, message: 'Failed to retrieve challenge', error: error });
    }
  },

  // 챌린지 정보 수정
  updateChallenge: async (updatedChallengeData, callback) => {},

  // 챌린지 삭제
  deleteChallenge: async (challengeId, callback) => {
    try {
      // 특정 ID의 챌린지 삭제하는 쿼리 실행
      const result = await pool.query(sql.deleteChallenge, [challengeId]);
      callback({ status: 200, message: 'Challenge deleted', data: result });
    } catch (error) {
      callback({ status: 500, message: 'Failed to delete challenge', error: error });
    }
  },

  // 특정 챌린지의 참가자 목록 조회
  getParticipants: async (challengeId, callback) => {},

  // 새로운 참가자 추가
  addParticipant: async (participantData, callback) => {},

  // 참가자 삭제
  removeParticipant: async (challengeId, participantId, callback) => {},

  // 챌린지 완료 처리
  completeChallenge: async (challengeId, callback) => {},

  // 도전별 게시판 리스트
  boardList: async (item, callback) => {
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      conn.beginTransaction();
      const [data] = await conn.query(sql.boardList, [item.id, Number(no * size), Number(size)]);
      conn.commit();
      callback({
        status: 200,
        message: '해당 도전 게시글 가져오기 성공',
        pageno: no + 1,
        pagesize: size,
        data: data,
      });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '불러오기 대실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  // 도전별 게시판 카테고리별 리스트
  categoryBoardList: async (item, callback) => {
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      conn.beginTransaction();
      const [data] = await conn.query(sql.boardList, [
        item.id,
        item.category,
        Number(no * size),
        Number(size),
      ]);
      conn.commit();
      callback({
        status: 200,
        message: '해당 도전 게시글 가져오기 성공',
        pageno: no + 1,
        pagesize: size,
        data: data,
      });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '불러오기 대실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  // 도전별 커뮤니티 상세 글
  board: async (item, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      conn.beginTransaction();
      await conn.query(sql.incCount, [item.id]);
      const [data] = await conn.query(sql.board, [item.challengeId, item.id]);
      const [comment] = await conn.query(sql.getComment, [item.id]);
      conn.commit();
      callback({
        status: 200,
        message: '게시글 상세 불러오기 성공',
        data: data,
        comment: comment,
      });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '불러오기 대실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  update: async (item, callback) => {
    const { title, contents, id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      const [resp] = await conn.query(sql.update, [title, contents, id]);
      return callback({ status: 200, message: '게시글 수정 완료', data: resp });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '게시글 수정 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  delete: async (item, callback) => {
    const { id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      const [resp] = await conn.query(sql.delete, [id]);
      return callback({ status: 200, message: '게시글 삭제 완료', data: resp });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '게시글 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  insert: async (item, callback) => {
    const { title, contents, image, challenge_id, user_id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      const [resp] = await conn.query(sql.insert, [title, contents, image, challenge_id, user_id]);
      return callback({ status: 200, message: '게시글 작성 완료', data: resp });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '게시글 작성 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  insertComment: async (item, callback) => {
    const { contents, user_id, post_id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      const [resp] = await conn.query(sql.insertComment, [contents, user_id, post_id]);
      return callback({ status: 200, message: '댓글 작성 완료', data: resp });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '댓글 작성 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  deleteComment: async (item, callback) => {
    const { id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      const [resp] = await conn.query(sql.deleteComment, [id]);
      return callback({ status: 200, message: '댓글 삭제 완료', data: resp });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '댓글 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
};

module.exports = challengeDAO;
