// DAO => Data Access Object
// npm i mysql2
// get the client
const bcrypt = require('bcrypt');

// Create the connection pool. The pool-specific settings are the defaults
const pool = require('./pool');

const sql = {
  checkEmail: `select *
              from User
              where email = ?`,
  signup: `INSERT INTO User(email, password, name) VALUES(?, ?, ?)`,
  login: `SELECT *
          FROM User
          WHERE email= ? and password = ?`,
  update: `UPDATE User SET password = ? WHERE email = ?`,
  delete: `DELETE FROM User where email = ?`,
  userList: `SELECT * from User ORDER BY User_id DESC 
            LIMIT ?, ?`,
  totalCount: `SELECT COUNT(*) as cnt FROM User`,
  userDetail: `SELECT *
               FROM User
               WHERE email = ?`,
};

const userDAO = {
  checkEmail: async (item, callback) => {
    const { email } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속 구문

      const [data, fieldset] = await conn.query(sql.checkEmail, [email]);
      // data는 나온 값, filedset은 db 구조
      if (data) {
        // data 값이 존재한다면? (정확한 값을 입력해야 불러와짐)
        const userEmail = data[0].email; // db에 저장된 email 삽입
        // 정확한 이메일이 불러져 왔다면?
        // 패스워드가 맞는지 봐야한다.
        if (userEmail === email) {
          // 유저의 db에 저장된 비밀번호와 입력한 비밀번호가 맞는 확인한다.
          callback({
            status: 200,
            message: '이메일 검증 성공',
            data: { name: data[0].name, email: data[0].email },
          });
        }
      }
    } catch (error) {
      callback({ status: 500, message: '로그인 실패', error: error.message });
    } finally {
      if (conn !== null) conn.release();
    }
  },
  // 만약 callback을 없앤다면 callback 부분을 return 으로 바꿔줘야한다.
  signup: async (item, callback) => {
    // console.log('userDAO=>',);
    const { email, password, name } = item;
    console.log(email);
    console.log(password);
    console.log(name);
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      // email check를 안하는 경우 일단 유저가 존재하는지 체크
      const [data] = await conn.query(sql.checkEmail, [email]);
      if (data[0]) {
        callback({ status: 500, message: '이미 사용자가 존재합니다.' });
      } else {
        const salt = await bcrypt.genSalt();
        bcrypt.hash(password, salt, async (error, hash) => {
          if (error) {
            return { status: 500, message: '암호화 실패', error: error };
          } else {
            const [resp] = await conn.query(sql.signup, [email, hash, name]);
            console.log(resp);
            return callback({ status: 200, message: '회원가입에 성공했습니다.', data: resp });
          }
        });
      }

      // console.log(data);
      // console.log('-- 입력완료');
      // 만약 return 문으로 작성한다면 Promise로 리턴된다.
    } catch (error) {
      console.log(error);
      callback({ status: 500, message: '입력 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  login: async (item, callback) => {
    const { email, password } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속 구문
      const [user] = await conn.query(sql.checkEmail, [email]); // id 체크
      if (!user[0]) {
        callback({ status: 401, message: '정확한 이메일, 패스워드를 입력해주세요.' });
      } else {
        bcrypt.compare(password, user[0].password, async (error, result) => {
          // 해쉬 암호화된 비밀번호와 입력한 비밀번호 비교
          if (error)
            // 틀리면 error
            callback({ status: 401, message: '정확한 이메일, 패스워드를 입력해주세요.', error });
          else if (result) {
            // 맞으면 true 반환
            // const [data, fieldset] = await conn.query(sql.login, [email, result]);
            callback({
              status: 200,
              message: '성공!',
              data: { name: user[0].name, email: user[0].email, id: user[0].user_id },
            });
          } else {
            callback({ status: 401, message: '로그인 처리중 에러 발생.', error });
          }
        });
      }
    } catch (error) {
      callback({ status: 500, message: '로그인 실패', error: error.message });
    } finally {
      if (conn !== null) conn.release();
    }
  },
  userList: async (item, callback) => {
    // const { limits, limite } = item;
    // console.log('userDAO=>',);
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      const [data, filedset] = await conn.query(sql.userList, [Number(no * size), Number(size)]);
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
  update: async (item, callback) => {
    const { email, password } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return

      const salt = await bcrypt.genSalt();

      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) {
          callback({ status: 500, message: '비밀번호 변경 실패', error: error });
        } else {
          const [resp] = await conn.query(sql.update, [hash, email]);
          await pool.query(sql.updatedAt, [email]);
          conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
          return callback({ status: 200, message: 'ok', data: resp });
        }
      });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '비밀번호 변경 실패', error: error });
    } finally {
      if (conn !== null) conn.release(); // db 접속 해제
    }
  },
  delete: async (item, callback) => {
    const { email } = item;
    let conn = null;
    try {
      conn = await pool.getConnection(); // db 접속
      await conn.beginTransaction(); // 쿼리가 모두 성공하고 return ㄷ
      const [data, filedset] = await conn.query(sql.delete, [email]);
      conn.commit(); // 위 모든 query를 반영한다는 것. 이로인해 위의 query 중 하나라도 실패하면 catch error로 가서 rollback 한다.
      callback({ status: 200, message: '유저 삭제 완료', data: data });
    } catch (error) {
      conn.rollback(); // 커밋 이전 상태로 돌려야한다.
      callback({ status: 500, message: '유저 삭제 실패', error: error });
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
