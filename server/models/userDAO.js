// DAO => Data Access Object
// npm i mysql2
// get the client
const bcrypt = require('bcrypt');
// Create the connection pool. The pool-specific settings are the defaults
const pool = require('./pool');

const sql = {
  update: `UPDATE user SET nickname = ?, password = ?, about_me = ?, blog_url = ?, profile_image = ?, zipcode = ?, address1 = ?  WHERE id = ?`,
  delete: `DELETE FROM user where id = ?`,
  mypage: `SELECT *
               FROM user
               WHERE id = ?`,
  myChallenge: `SELECT c.title, c.type
                FROM user u
                JOIN challenge_participants p ON u.id = p.user_id
                JOIN challenges c ON p.challenge_id = c.id
                WHERE u.id = ?;
  `,
};

const userDAO = {
  update: async (item, callback) => {
    const { nickname, password, about_me, blog_url, profile_image, zipcode, address1, id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return

      const salt = await bcrypt.genSalt();
      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) {
          callback({ status: 500, message: '회원정보 수정 실패', error: error });
        } else {
          const [resp] = await conn.query(sql.update, [
            nickname,
            hash,
            about_me,
            blog_url,
            profile_image,
            zipcode,
            address1,
            id,
          ]);
          conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
          return callback({ status: 200, message: '회원정보 수정 완료', data: resp });
        }
      });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '회원정보 수정 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  delete: async (item, callback) => {
    const { id } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return ㄷ
      const [data, filedset] = await conn.query(sql.delete, [id]);
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      callback({ status: 200, message: '유저 삭제 완료', data: data });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '유저 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  mypage: async (item, callback) => {
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction();
      // 개인정보 획득
      const [data, filedset] = await conn.query(sql.mypage, [item.id]);
      // 유저 참여 대회 정보 획득
      const [challenge] = await conn.query(sql.myChallenge, [item.id]);

      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      callback({ status: 200, message: '프로필 조회 완료', data: data, challenge: challenge });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '프로필 조회 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  // temp: async (item, callback) => {
  //   // console.log('userDAO=>',);
  //   const {  } = item;
  //   let conn = null;
  //   try {
  //     conn = await pool.getConnection(); // db 접속
  //     const [data, filedset] = await conn.query(sql., []);
  //     callback({ status: 200, message: 'ok', data: resp });
  //   } catch (error) {
  //     callback({ status: 500, message: '입력 실패', error: error });
  //   } finally {
  //     if (conn !== null) conn.release(); // db 접속 해제
  //   }
  // },
};

module.exports = userDAO;
