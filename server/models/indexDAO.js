const bcrypt = require('bcrypt');
const pool = require('./pool');

const sql = {
  checkEmail: `select *
              from User
              where email = ?`,
  signup: `INSERT INTO User(name, nickname, email, password, phoneNumber, aboutMe, blogUrl, createdAt, profileImage, zipcode, address1) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
