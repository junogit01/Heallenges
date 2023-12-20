const bcrypt = require('bcrypt');
const pool = require('./pool');

const sql = {
  checkEmail: `select *
              from User
              where email = ?`,
  signup: `INSERT INTO User(name, nickname, email, password, phoneNumber, aboutMe, blogUrl, createdAt, profileImage, zipcode, address1) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  login: `SELECT *
          FROM User
          WHERE email= ? and password = ?`,
  update: `UPDATE User SET nickname = ?, password = ?, phoneNumber = ?, aboutMe = ?, blogUrl = ?, profileImage = ?, zipcode = ?, address1 = ?  WHERE id = ?`,
  delete: `DELETE FROM User where id = ?`,
  userList: `SELECT * from User ORDER BY User_id DESC 
            LIMIT ?, ?`,
  mypage: `SELECT *
               FROM User
               WHERE id = ?`,
  myChallenge: `SELECT u.*, c.title, c.type
                FROM User u
                JOIN ChallengeParticipants p ON u.id = p.memberId
                JOIN Challenges c ON p.challengeId = c.id
                WHERE u.id = ?;
  `,
};

const indexDAO = {
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
    const {
      name,
      nickname,
      email,
      password,
      phoneNumber,
      aboutMe,
      blogUrl,
      createdAt,
      profileImage,
      zipcode,
      address1,
    } = item;
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
            const [resp] = await conn.query(sql.signup, [
              name,
              nickname,
              email,
              hash,
              phoneNumber,
              aboutMe,
              blogUrl,
              createdAt,
              profileImage,
              zipcode,
              address1,
            ]);
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
};

module.exports = indexDAO;
