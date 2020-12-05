var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_lengwinc',
  password        : '8005',
  database        : 'cs340_lengwinc'
});
module.exports.pool = pool;
