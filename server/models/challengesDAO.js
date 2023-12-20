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
  completeChallenge: `UPDATE challenges SET status = 'Completed' WHERE id = ?`
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
        challengeData.prize
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
  getAllChallenges: async (callback) => {
    
  },

  // 특정 ID의 챌린지 조회
  getChallengeById: async (challengeId, callback) => {
    try {
      // 특정 ID의 챌린지 조회하는 쿼리 실행
      const challenge = await pool.query(sql.getChallengeById, [challengeId]);
      callback({ status: 200, message: 'Challenge retrieved', data: challenge });
    } catch (error) {
      callback({ status: 500, message: 'Failed to retrieve challenge', error: error });
    }
  },

  // 챌린지 정보 수정
  updateChallenge: async (updatedChallengeData, callback) => {
    
  },

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
  getParticipants: async (challengeId, callback) => {
    
  },

  // 새로운 참가자 추가
  addParticipant: async (participantData, callback) => {
   
  },

  // 참가자 삭제
  removeParticipant: async (challengeId, participantId, callback) => {
  
  },

  // 챌린지 완료 처리
  completeChallenge: async (challengeId, callback) => {
    
  }
};

module.exports = challengeDAO;
