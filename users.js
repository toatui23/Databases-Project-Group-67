module.exports = function(){
  var express = require('express');
  var router = express.Router();

  function serveUsers(req, res){
    console.log("asked for users")
    var query = 'SELECT userID, fName, lName, email, password FROM users';
    var mysql = req.app.get('mysql');
    var context = {}

    function handleRenderingOfUsers(error, results, fields){
      console.log(error)
      console.log(results)
      console.log(fields)

      context.users = results;

      res.render('users', context)
    }
    mysql.pool.query(query, handleRenderingOfUsers)
  }

  router.get('/', serveUsers)
  return router;
}();
