const pool = require('./pool');

const sql = {
  // 커뮤니티 게시글 작성
  challengeBoardInsert: `INSERT INTO challenge_community (title, contents, image, category, challenge_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
  // 커뮤니티 조회수 증가
  challengeBoardincCount: `UPDATE challenge_community SET view_cnt = view_cnt + 1 WHERE id = ?`,
  // 인증 포인트 부여
  challengeRewardincCount: `UPDATE user SET reward_cnt = reward_cnt + ?
                             WHERE id = ?`,
  // 인증 포인트 확인
  getChallengeById: `SELECT * 
                     FROM challenges 
                     WHERE id = ?`,
  // 챌린지 참여 확인
  getchallengeParticipants: `SELECT user_id
                             FROM challenge_participants p 
                             WHERE challenge_id = ?`,
  // 커뮤니티 게시글 리스트 조회
  challengeBoardList: `SELECT m.title, m.view_cnt, u.name, u.nickname, m.id, m.category, DATE_FORMAT(m.created_at, '%Y-%m-%d %h-%i-%s') as created, m.image
                FROM challenges c
                JOIN challenge_community m ON c.id = m.challenge_id
                JOIN user u ON m.user_id = u.id
                WHERE c.id = ?
                ORDER BY m.created_at DESC`,
  // 커뮤니티 게시글 상세 조회
  challengeBoardDetail: `SELECT c.title, c.contents, u.name, c.view_cnt, DATE_FORMAT(c.created_at, '%Y-%m-%d %h-%i-%s') as created, c.image, c.id, u.id as user_id, c.category
            FROM challenge_community c
            JOIN challenges ON c.challenge_id = challenges.id
            JOIN user u ON c.user_id = u.id
            WHERE challenges.id = ? and c.id = ?`,
  // 커뮤니티 댓글 조회
  challengeGetComment: `SELECT m.contents, m.id, u.profile_image, DATE_FORMAT(m.created_date, '%Y-%m-%d %h-%i-%s') as created, u.nickname, u.id as user_id
                 FROM challenge_community c
                 JOIN challenge_comment m ON c.id = m.post_id
                 JOIN user u ON m.user_id = u.id
                 WHERE c.id = ?
                 ORDER BY m.created_date DESC`,
  // 커뮤니티 게시글 수정
  challengeBoardUpdate: `UPDATE challenge_community
                         SET title = ?, contents = ?, category = ?, image = ?
                         WHERE id = ?`,
  // 커뮤니티 게시글 삭제
  challengeBoardDelete: `DELETE FROM challenge_community
                         WHERE id = ?`,

  // 커뮤니티 댓글 작성
  challengeInsertComment: `INSERT INTO challenge_comment(contents, user_id, post_id) VALUES(?, ?, ?)`,
  // 커뮤니티 댓글 삭제
  challengeDeleteComment: `DELETE FROM challenge_comment WHERE id = ?`,
  // 메인용 도전 조회
  getChallenges: `SELECT * 
                     FROM challenges 
                     ORDER BY created_at DESC 
                     LIMIT 0, 10`,
};

const challengesCommunityDAO = {
  // 도전별 게시판 리스트
  challengeBoardList: async (item, callback) => {
    console.log(item);
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;
    const id = Number(item.id);
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      conn.beginTransaction();
      // const check = await conn.query(sql.getchallengeParticipants, [id]);
      // const participantsId = check[0].map((row) => row.user_id);
      // if(participantsId.includes(item.id))
      const [data] = await conn.query(sql.challengeBoardList, [item.id, Number(no), Number(size)]);
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
      callback({ status: 500, message: '불러오기 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },

  // 메인용 도전 조회
  getChallenges: async (callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      const [data] = await conn.query(sql.getChallenges);
      callback({
        status: 200,
        message: '대회 목록 조회 성공',
        data: data,
      });
    } catch (error) {
      callback({ status: 500, message: '불러오기 대실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },

  // 도전별 참가자 조회
  challengeParticipants: async (item, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.query(sql.challengeBoardincCount, [item.id]);
      const [data] = await conn.query(sql.getchallengeParticipants, [item.challengeId]);
      const participantsId = data.map((row) => row.user_id);
      console.log(participantsId);
      callback({
        status: 200,
        message: '도전 참가자 불러오기 성공',
        data: participantsId,
      });
    } catch (error) {
      callback({ status: 500, message: '불러오기 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },

  // 도전별 커뮤니티 상세 글
  challengeBoardDetail: async (item, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.query(sql.challengeBoardincCount, [item.id]);
      const [data] = await conn.query(sql.challengeBoardDetail, [item.challengeId, item.id]);
      const [comment] = await conn.query(sql.challengeGetComment, [item.id]);
      callback({
        status: 200,
        message: '게시글 상세 불러오기 성공',
        data: data,
        comment: comment,
      });
    } catch (error) {
      callback({ status: 500, message: '불러오기 대실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },

  // 도전 커뮤니티 게시글 수정
  challengeBoardUpdate: async (item, callback) => {
    const { title, contents, category, image, id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      const [resp] = await conn.query(sql.challengeBoardUpdate, [
        title,
        contents,
        category,
        image,
        id,
      ]);
      return callback({ status: 200, message: '게시글 수정 완료', data: resp });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '게시글 수정 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },

  // 도전 게시글 삭제
  challengeBoardDelete: async (item, callback) => {
    const { id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      const [resp] = await conn.query(sql.challengeBoardDelete, [id]);
      return callback({ status: 200, message: '게시글 삭제 완료', data: resp });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '게시글 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },

  // 도전 게시글 작성
  challengeBoardInsert: async (item, callback) => {
    const { title, contents, image, category, challenge_id, user_id, id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      const [resp] = await conn.query(sql.challengeBoardInsert, [
        title,
        contents,
        image,
        category,
        challenge_id,
        user_id,
      ]);
      if (category === '인증') {
        const challengeData = await conn.query(sql.getChallengeById, [id]);
        const reward_cnt = challengeData[0][0].reward;
        await conn.query(sql.challengeRewardincCount, [reward_cnt, user_id]);
      }
      return callback({ status: 200, message: '게시글 작성 완료', data: resp });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '게시글 작성 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },

  // 도전 댓글 작성
  challengeInsertComment: async (item, callback) => {
    console.log(item);
    const { contents, user_id, post_id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      const [resp] = await conn.query(sql.challengeInsertComment, [contents, user_id, post_id]);
      return callback({ status: 200, message: '댓글 작성 완료', data: resp });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '댓글 작성 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },

  // 도전 댓글 삭제
  challengeDeleteComment: async (item, callback) => {
    const { id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      const [resp] = await conn.query(sql.challengeDeleteComment, [id]);
      return callback({ status: 200, message: '댓글 삭제 완료', data: resp });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '댓글 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
};

module.exports = challengesCommunityDAO;
