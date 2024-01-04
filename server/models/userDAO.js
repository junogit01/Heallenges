// DAO => Data Access Object
// npm i mysql2
// get the client
const bcrypt = require('bcryptjs');
// Create the connection pool. The pool-specific settings are the defaults
const pool = require('./pool');

const sql = {
  // 유저 정보 수정
  update: `UPDATE user 
           SET nickname = ?, about_me = ?, blog_url = ?, profile_image = ?, zipcode = ?, address = ?  
           WHERE email = ?`,

  // 유저 비밀번호 변경
  updatePassword: `UPDATE user 
                   SET password = ? 
                   WHERE id = ?`,
  // 유저 정보 삭제
  delete: `DELETE FROM user where id = ?`,
  // 마이페이지
  mypage: `SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d %h-%i-%s') as Created
           FROM user
           WHERE id = ?`,
  // 참여한 도전 조회
  myChallenge: `SELECT c.title, c.type, c.id
                FROM user u
                JOIN challenge_participants p ON u.id = p.user_id
                JOIN challenges c ON p.challenge_id = c.id
                WHERE u.id = ?;
  `,
};

const userDAO = {
  update: async (item, callback) => {
    const { nickname, about_me, blog_url, profile_image, zipcode, address, email } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction();

      const [resp] = await conn.query(sql.update, [
        nickname,
        about_me,
        blog_url,
        profile_image,
        zipcode,
        address,
        email,
      ]);
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      return callback({ status: 200, message: '회원정보 수정 완료', data: resp });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '회원정보 수정 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  updatePassword: async (item, callback) => {
    console.log(item);
    let conn = null;
    try {
      conn = await pool.getConnection();
      await conn.beginTransaction();
      const [data] = await conn.query(sql.mypage, [item.id]);
      console.log(data[0]);
      const compare = await bcrypt.compare(item.current, data[0]?.password);
      console.log(compare);
      if (compare) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(item.password, salt);
        const resp = await conn.query(sql.updatePassword, [hash, item.id]);
        conn.commit();
        callback({ status: 200, message: '비밀번호 변경 성공' });
      } else {
        callback({ status: 401, message: '비밀번호를 다시 확인해주세요' });
      }
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '비밀번호 변경 실패', error: error });
    } finally {
      if (conn) conn.release();
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
