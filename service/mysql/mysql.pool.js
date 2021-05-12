/**
 * @description mysql数据库连接池
 */

var mysql = require("mysql");

var pool = mysql.createPool({
  host: "localhost", // 数据库地址
  port: "3306", // 端口
  user: "root", // 用户名称
  password: "root", // 用户密码
  database: "information_schema", // 要链接的数据库名称
});

let query = (sql, callback) => {
  pool.getConnection((err, conn) => {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, (qerr, vals, fields) => {
        //释放连接
        conn.release();
        //事件驱动回调
        callback(qerr, vals, fields);
      });
    }
  });
};

module.exports = query; // 暴露出这个接口
