/**
 * TODO 添加文件时无存在的目录，新增目录
 * */
var fs = require("fs");
var path = require("path");
/**
 * @desc 文件读取
 * @param {Object} options
 * @param {string} options.fileName
 * @param {string}  options.filePath
 * */
var readFile = function (options) {
  var completePath = path.resolve(__dirname, "..", "json", options.filePath || "", options.fileName);
  return new Promise(function (resolve, reject) {
    fs.readFile(completePath, { encoding: "utf-8" }, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

/**
 * @desc 新增文件
 * @param {Object} options
 * @param {string} options.fileName
 * @param {string}  options.filePath
 * @param {any*=}  options.data
 * */
var appendFile = function (options) {
  var completePath = path.resolve(__dirname, "..", "json", options.filePath || "", options.fileName);
  var submitData = JSON.stringify(options.data);
  return new Promise(function (resolve) {
    readFile(options)
      .then(function (data) {
        // 文件存在看添加内容是否一致 不一致则修改文件内容
        if (submitData !== data) writeFile(options);
      })
      .catch(function (err) {
        // 找不到文件 新建文件
        if (err)
          fs.appendFile(completePath, submitData, function (err) {
            if (err) throw err;
          });
      });
    resolve(submitData);
  });
};

/**
 * @desc 文件修改
 * @param {Object} options
 * @param {string} options.fileName
 * @param {string}  options.filePath
 * @param {any*=}  options.data
 * */
var writeFile = function (options) {
  var completePath = path.resolve(__dirname, "..", "json", options.filePath || "", options.fileName);
  var submitData = JSON.stringify(options.data);
  readFile(options)
    .then(function (res) {
      if (submitData !== res) {
        fs.writeFile(completePath, submitData, function (err) {
          if (err) throw err;
        });
      }
    })
    .catch(function (reject) {
      if (reject) {
        // 未找到文件
        console.log(JSON.stringify(reject));
        appendFile();
      }
    });
};
module.exports = {
  readFile,
  writeFile,
  appendFile,
};
