var express = require("express");
var router = express.Router();
var query = require("../mysql/mysql.pool");
var { appendFile } = require("../utils/file.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  query("select * from files", function (qerr, vals, fields) {
    appendFile({
      fileName: "files.json",
      filePath: "file",
      data: {
        success: true,
        code: 200,
        data: vals,
      },
    }).then(function (data) {
      res.json(JSON.parse(data));
    });
  });
});

module.exports = router;
