module.exports = function(){
  var express = require('express');
  var bodyParser = require('body-parser');
  var router = express.Router();

  function getUsers(res, mysql, context, complete){
    mysql.pool.query('SELECT userID, fName, lName, email, password FROM users', function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users  = results;
            complete();
        });
    }


  router.post('/', function(req, res){
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO users (fName, lName, email, password) VALUES (?, ?, ?, ?)";
    var inserts = [req.body.fname, req.body.lname, req.body.email, req.body.password];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect('/users')
      }
    });
  });

  router.get('/', function(req, res){
       var callbackCount = 0;
       var context = {};
       context.jsscripts = [];
       var mysql = req.app.get('mysql');
       getUsers(res, mysql, context, complete);
       function complete(){
           callbackCount++;
           if(callbackCount >= 1){
               res.render('users', context);
           }

       }
   });

  return router;
}();
