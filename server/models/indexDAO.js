const bcrypt = require('bcryptjs');
const pool = require('./pool');

const sql = {
  // 이메일 검증
  checkEmail: `select email
              from user
              where email = ?`,
  // 로그인
  login: `select *
          from user
          where email = ?`,
  // 회원가입
  signup: `INSERT INTO user(name, nickname, email, password, about_me, blog_url, created_at, profile_image, zipcode, address) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  // 도전 조회
  challenge: `SELECT *
              FROM challenges
              LIMIT 0, 10
  `,
  insertImage: `UPDATE user SET profile_image = ? where id = ? `,
};

const indexDAO = {
  checkEmail: async (item, callback) => {
    const email = item;
    let conn = null;
    try {
      conn = await pool.getConnection();
      const resp = await conn.query(sql.checkEmail, [email]);
      if (resp[0]) {
        return callback({ status: 401, message: '이미 존재하는 이메일 입니다.', data: resp[0] });
      } else {
        return callback({ status: 200, message: '사용 가능한 이메일 입니다.', data: resp[0] });
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  signup: async (item, callback) => {
    const {
      name,
      nickname,
      email,
      password,
      about_me,
      blog_url,
      created_at,
      profile_image,
      zipcode,
      address,
    } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      // 기존 유저가 존재하는지 체크
      const [data] = await conn.query(sql.checkEmail, [email]);
      if (data[0]) {
        return callback({ status: 501, message: '이미 사용자가 존재합니다.', data: data });
      } else {
        const salt = await bcrypt.genSalt();
        bcrypt.hash(password, salt, async (error, hash) => {
          if (error) {
            return { status: 502, message: '암호화 실패', error: error };
          } else {
            const [resp] = await conn.query(sql.signup, [
              name,
              nickname,
              email,
              hash,
              about_me,
              blog_url,
              created_at,
              profile_image,
              zipcode,
              address,
            ]);
            return callback({ status: 200, message: '회원가입에 성공했습니다.', data: resp });
          }
        });
      }
    } catch (error) {
      callback({ status: 503, message: '입력 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  login: async (item, callback) => {
    const { email, password } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      const [user] = await conn.query(sql.login, [email]); // id 체크
      if (!user[0]) {
        callback({ status: 401, message: '정확한 이메일, 패스워드를 입력해주세요.' });
      } else {
        bcrypt.compare(password, user[0].password, async (error, result) => {
          // 해쉬 암호화된 비밀번호와 입력한 비밀번호 비교
          if (error)
            // 틀리면 error
            callback({ status: 401, message: '정확한 이메일, 패스워드를 입력해주세요.', error });
          else if (result) {
            // 맞으면 true
            callback({
              status: 200,
              message: '로그인 성공!',
              data: { name: user[0].name, email: user[0].email, id: user[0].id },
            });
          } else {
            callback({ status: 403, message: '로그인 처리중 에러 발생.', error });
          }
        });
      }
    } catch (error) {
      callback({ status: 500, message: '로그인 실패', error: error.message });
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = indexDAO;
