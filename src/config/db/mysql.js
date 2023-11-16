const mysql = require("mysql2");

var connection = mysql.createPool({
  host: "bvgv7nqjsmgk0w4kw657-mysql.services.clever-cloud.com",
  user: "uwid9wqgxou1p760",
  password: "XZSbrZMMQanXuroOHy9u",
  port: 3306,
  database: "bvgv7nqjsmgk0w4kw657",
  multipleStatements: true,
});

module.exports.connection = connection;
