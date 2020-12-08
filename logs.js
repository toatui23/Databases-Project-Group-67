module.exports = function(){
  var express = require('express');
  var router = express.Router();

  function serveLogs(req, res){
    console.log("asked for logs")
    var query = 'SELECT logID, email, planName, date FROM logs JOIN plans ON logs.planID = plans.planID JOIN users ON logs.userID = users.userID';
    var mysql = req.app.get('mysql');
    var context = {}

    function handleRenderingOfLogs(error, results, fields){
      console.log(error)
      console.log(results)
      console.log(fields)

      context.logs = results;

      res.render('logs', context)
    }
    mysql.pool.query(query, handleRenderingOfLogs)
  }

  router.get('/', serveLogs)
  return router;
}();
