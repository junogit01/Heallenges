const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'heallenges.cafe24app.com',
  port: '3306',
  user: 'esens01',
  password: 'gpfflswl12!',
  database: 'esens01',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
if (pool) console.log('database connected...');

module.exports = pool;
