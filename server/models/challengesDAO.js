const pool = require('./pool');

const sql = {
  createChallenge: `
    INSERT INTO challenges 
    (title, description, type, totalParticipants, rules, end_date, start_date, status, hostId, reward) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  getAllChallenges: `SELECT * FROM challenges`,
  getChallengeById: `SELECT * FROM challenges WHERE id = ?`,
  updateChallenge: `
    UPDATE challenges 
    SET title = ?, description = ?, type = ?, totalParticipants = ?, rules = ?, end_date = ?, start_date = ?, status = ?, hostId = ?, reward = ? 
    WHERE id = ?
  `,
  deleteChallenge: `DELETE FROM challenges WHERE id = ?`,
  getParticipants: `SELECT * FROM challenge_participants WHERE challenge_id = ?`,
  addParticipant: `INSERT INTO challenge_participants (challenge_id, user_id) VALUES (?, ?)`,
  removeParticipant: `DELETE FROM challenge_participants WHERE challenge_id = ? AND user_id = ?`,
  completeChallenge: `UPDATE challenges SET status = 'Completed' WHERE id = ?`,
  getChallengesByCategory: `SELECT * FROM challenges WHERE type = ?`,
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
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속 구문

      const result = await pool.query(sql.createChallenge, [
        challengeData.title,
        challengeData.description,
        challengeData.type,
        challengeData.totalParticipants,
        challengeData.rules,
        challengeData.end_date,
        challengeData.start_date,
        challengeData.status,
        challengeData.hostId,
        challengeData.reward,
      ]);

      callback({ status: 200, message: '챌린지가 생성되었습니다', data: result });
      // 성공응답
    } catch (error) {
      console.error('챌린지 생성 중 오류 발생:', error);
      // 오류 처리
      callback({ status: 500, message: '챌린지 생성에 실패하였습니다', error: error });
      // 실패 응답
    } finally {
      if (conn) conn.release(); // db 연결 종료
    }
  },

  // 모든 챌린지 조회
  getAllChallenges: async (callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속 구문
      // 'getAllChallenges' 쿼리를 실행하여 데이터베이스에서 모든 챌린지 정보를 가져온다.
      const challenges = await pool.query(sql.getAllChallenges);

      callback({ status: 200, message: '모든 챌린지 조회 성공', data: challenges });
      // 챌린지 조회 성공 응답
    } catch (error) {
      console.error('챌린지 조회중 오류 발생:', error);
      // 데이터베이스 쿼리 중 오류가 발생한 경우, 오류 정보와 함께 콜백 함수를 호출한다.
      // '챌린지 조회 오류' 메시지는 발생한 오류의 성격을 더 명확히 하기 위해 추가함
      callback({ status: 500, message: '모든 챌린지 조회 실패', error: error });
    } finally {
      if (conn) conn.release(); // db 연결 종료
    }
  },

  // id로 챌린지 조회
  getChallengeById: async (challengeId, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속 구문
      // 특정 ID로 챌린지를 조회하는 쿼리를 실행한다.
      const result = await pool.query(sql.getChallengeById, [challengeId]);

      // 조회된 챌린지가 있는지 확인
      if (result.length === 0) {
        // 챌린지가 데이터베이스에 존재하지 않는 경우, 콜백 함수를 호출하여 해당 메시지를 반환
        callback({ status: 404, message: '해당 ID의 챌린지를 찾을 수 없음' });
      } else {
        // 챌린지가 성공적으로 조회된 경우, 콜백 함수를 호출하여 챌린지 데이터를 반환
        callback({ status: 200, message: '챌린지 검색됨', data: result[0] });
      }
    } catch (error) {
      // 쿼리 실행 중 오류가 발생한 경우, 오류 정보를 포함하여 콜백 함수를 호출
      callback({ status: 500, message: '챌린지 검색 실패', error: error });
    } finally {
      if (conn) conn.release(); // db 연결 종료
    }
  },

  // 챌린지 정보 수정
  updateChallenge: async (updatedChallengeData, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속 구문
      // 먼저 주어진 ID로 챌린지가 존재하는지 확인.
      const existingChallenge = await pool.query(sql.getChallengeById, [updatedChallengeData.id]);

      // 해당 ID의 챌린지가 데이터베이스에 존재하는지 확인.
      if (existingChallenge.length === 0) {
        // 존재하지 않는 경우, 콜백 함수를 호출하여 챌린지가 존재하지 않음을 알림.
        callback({ status: 404, message: '수정하려는 챌린지가 존재하지 않습니다' });
      } else {
        // 챌린지가 존재하는 경우, 챌린지 정보를 업데이트.
        await pool.query(sql.updateChallenge, [
          updatedChallengeData.title,
          updatedChallengeData.description,
          updatedChallengeData.type,
          updatedChallengeData.totalParticipants,
          updatedChallengeData.rules,
          updatedChallengeData.end_date,
          updatedChallengeData.start_date,
          updatedChallengeData.status,
          updatedChallengeData.hostId,
          updatedChallengeData.reward,
          updatedChallengeData.id,
        ]);

        // 업데이트 후, 성공 메시지와 함께 콜백 함수를 호출.
        callback({ status: 200, message: '챌린지 정보가 성공적으로 업데이트되었습니다' });
      }
    } catch (error) {
      // 쿼리 실행 중 오류가 발생한 경우, 오류 정보를 포함하여 콜백 함수를 호출.
      callback({ status: 500, message: '챌린지 정보 업데이트 실패', error: error });
    } finally {
      if (conn) conn.release(); // db 연결 종료
    }
  },

  // 챌린지 삭제
  deleteChallenge: async (challengeId, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속 구문
      // 특정 ID의 챌린지 삭제하는 쿼리 실행
      const result = await pool.query(sql.deleteChallenge, [challengeId]);
      callback({ status: 200, message: 'Challenge deleted', data: result });
    } catch (error) {
      callback({ status: 500, message: 'Failed to delete challenge', error: error });
    } finally {
      if (conn) conn.release(); // db 연결 종료
    }
  },

  // 챌린지 타이틀로 참가자 목록 조회
  getParticipantsByTitle: async (challengeTitle, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속 구문
      // 챌린지 타이틀로 챌린지를 조회하는 쿼리를 실행.
      const challenge = await pool.query('SELECT * FROM challenges WHERE title = ?', [
        challengeTitle,
      ]);

      // 해당 타이틀의 챌린지가 데이터베이스에 존재하는지 확인.
      if (challenge.length === 0) {
        // 존재하지 않는 경우, 콜백 함수를 호출하여 해당 챌린지가 존재하지 않음을 알림.
        callback({ status: 404, message: '해당 타이틀의 챌린지를 찾을 수 없습니다' });
      } else {
        // 챌린지가 존재하는 경우, 해당 챌린지의 ID를 사용하여 참가자 목록을 조회.
        const participants = await pool.query(sql.getParticipants, [challenge[0].id]);

        // 참가자 목록을 콘솔에 출력.
        console.log('참가자 목록:');
        participants.forEach((participant) => {
          console.log(
            `ID: ${participant.id}, USER_ID: ${participant.user_id}, CHALLENGE_ID: ${participant.challenge_id}`,
          );
        });

        // 조회된 참가자 목록을 콜백 함수를 통해 반환.
        callback({ status: 200, message: '참가자 목록 조회 성공', data: participants });
      }
    } catch (error) {
      // 쿼리 실행 중 오류가 발생한 경우, 오류 정보를 포함하여 콜백 함수를 호출.
      callback({ status: 500, message: '참가자 목록 조회 실패', error: error });
    } finally {
      if (conn) conn.release(); // db 연결 종료
    }
  },

  // 새로운 참가자 추가
  addParticipant: async (participantData, callback) => {
    try {
      // 주어진 ID로 챌린지를 조회.
      const challenge = await pool.query(sql.getChallengeById, [participantData.challenge_id]);

      // 해당 챌린지가 존재하는지 또는 호스트 ID가 추가하려는 사용자의 ID와 일치하는지 확인.
      if (challenge.length === 0 || challenge[0].hostId !== participantData.user_id) {
        // 챌린지가 존재하지 않거나 호스트 ID가 일치하지 않을 경우, 콜백 함수를 통해 해당 메시지를 반환.
        callback({ status: 404, message: '해당 챌린지가 존재하지 않습니다' });
      } else {
        // 챌린지의 호스트 ID가 일치하는 경우, 새로운 참가자를 추가.
        await pool.query(sql.addParticipant, [
          participantData.challenge_id,
          participantData.user_id,
        ]);

        // 참가자 추가 후, 성공 메시지를 콜백 함수를 통해 반환.
        callback({ status: 200, message: '참가자가 성공적으로 추가되었습니다' });
      }
    } catch (error) {
      // 쿼리 실행 중 오류가 발생한 경우, 오류 정보를 포함하여 콜백 함수를 호출.
      callback({ status: 500, message: '참가자 추가 실패', error: error });
    }
  },

  // 참가자 삭제
  removeParticipant: async (challengeId, participantId, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속 구문
      // 먼저 주어진 ID로 챌린지가 존재하는지 확인.
      const challengeExists = await pool.query(sql.getChallengeById, [challengeId]);

      // 해당 챌린지가 존재하는지 확인합니다.
      if (challengeExists.length === 0) {
        // 챌린지가 존재하지 않을 경우, 콜백 함수를 호출하여 해당 메시지를 반환.
        callback({ status: 404, message: '해당 챌린지가 존재하지 않습니다' });
      } else {
        // 챌린지가 존재하는 경우, 주어진 참가자 ID가 해당 챌린지의 참가자 목록에 있는지 확인.
        const participantExists = await pool.query(sql.getParticipants, [challengeId]);
        const isParticipant = participantExists.some(
          (participant) => participant.id === participantId,
        );

        if (!isParticipant) {
          // 참가자가 해당 챌린지의 참가자 목록에 없는 경우, 콜백 함수를 호출하여 해당 메시지를 반환.
          callback({ status: 404, message: '해당 참가자가 챌린지에 존재하지 않습니다' });
        } else {
          // 참가자가 존재하는 경우, 해당 참가자를 삭제.
          await pool.query(sql.removeParticipant, [challengeId, participantId]);

          // 참가자 삭제 후, 성공 메시지를 콜백 함수를 통해 반환.
          callback({ status: 200, message: '참가자가 성공적으로 삭제되었습니다' });
        }
      }
    } catch (error) {
      // 쿼리 실행 중 오류가 발생한 경우, 오류 정보를 포함하여 콜백 함수를 호출.
      callback({ status: 500, message: '참가자 삭제 실패', error: error });
    } finally {
      if (conn) conn.release(); // db 연결 종료
    }
  },

  // 챌린지 완료 처리
  completeChallenge: async (challengeId, userId, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속 구문
      // 먼저 주어진 ID로 챌린지를 조회.
      const challenge = await pool.query(sql.getChallengeById, [challengeId]);

      // 해당 챌린지가 존재하는지 확인.
      if (challenge.length === 0) {
        // 챌린지가 존재하지 않을 경우, 콜백 함수를 호출하여 해당 메시지를 반환.
        callback({ status: 404, message: '챌린지를 찾을 수 없습니다' });
      } else if (challenge[0].hostId !== userId) {
        // 챌린지의 호스트 ID가 설정한 사용자의 ID와 일치하지 않는 경우, 권한이 없음을 알림.
        callback({ status: 403, message: '챌린지를 완료할 권한이 없습니다' });
      } else {
        // 현재 날짜가 챌린지의 예정된 종료 날짜를 초과했는지 확인.
        const currentDate = new Date();
        const scheduledEndDate = new Date(challenge[0].end_date);

        if (currentDate < scheduledEndDate) {
          // 예정된 종료 날짜가 아직 되지 않았다면, 콜백 함수를 호출하여 해당 메시지를 반환.
          callback({ status: 403, message: '챌린지가 아직 종료되지 않았습니다' });
        } else {
          // 챌린지를 완료로 표시
          await pool.query(sql.completeChallenge, [challengeId]);

          // 챌린지 완료 후, 성공 메시지를 콜백 함수를 통해 반환.
          callback({ status: 200, message: '챌린지가 성공적으로 완료되었습니다' });
        }
      }
    } catch (error) {
      // 쿼리 실행 중 오류가 발생한 경우, 오류 정보를 포함하여 콜백 함수를 호출.
      callback({ status: 500, message: '챌린지 완료 처리 실패', error: error });
    } finally {
      if (conn) conn.release(); // db 연결 종료
    }
  },

  getChallengesByCategory: async (category, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속 구문
      // 카테고리에 해당하는 모든 챌린지를 조회하는 쿼리 실행
      const challenges = await pool.query(sql.getChallengesByCategory, [category]);

      callback({ status: 200, message: '카테고리별 챌린지 조회 성공', data: challenges });
    } catch (error) {
      console.error('카테고리별 챌린지 조회 중 오류 발생:', error);
      callback({ status: 500, message: '카테고리별 챌린지 조회 실패', error: error });
    } finally {
      if (conn) conn.release(); // db 연결 종료
    }
  },
};

module.exports = challengeDAO;
