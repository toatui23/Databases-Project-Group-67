module.exports = function(){
  var express = require('express');
  var bodyParser = require('body-parser');
  var router = express.Router();

  function getPlans(res, mysql, context, complete){
    mysql.pool.query('SELECT planID, planName, description, duration FROM plans', function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.plans = results;
            complete();
        });
    }

    function getLifts(res, mysql, context, complete){
      mysql.pool.query('SELECT liftID, liftName, sets, reps FROM lifts', function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.lifts = results;
              complete();
      });
    }

    function getMuscles(res, mysql, context, complete){
        mysql.pool.query('SELECT muscleID, muscleTitle FROM muscles', function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.muscles = results;
                complete();
        });
    }

  router.post('/', function(req, res){
    console.log(req.body.planName)
    var mysql = req.app.get('mysql');
    if (req.body.planName){
      var sql = "INSERT INTO plans (planName, description, duration) VALUES (?, ?, ?)";
      var inserts = [req.body.planName, req.body.description, req.body.duration];
    }
    else if(req.body.liftName){
      var sql = "INSERT INTO lifts (liftName, sets, reps) VALUES (?, ?, ?)";
      var inserts = [req.body.liftName, req.body.sets, req.body.reps];
    }
    else if(req.body.muscleTitle){
      var sql = "INSERT INTO muscles (muscleTitle) VALUES (?)"
      var inserts = [req.body.muscleTitle];
    }
    else{
      res.write("No input given\n");
    }
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect('/create')
      }
    });
  });

  router.get('/', function(req, res){
       var callbackCount = 0;
       var context = {};
       context.jsscripts = [];
       var mysql = req.app.get('mysql');
       getPlans(res, mysql, context, complete);
       getLifts(res, mysql, context, complete);
       getMuscles(res, mysql, context, complete);
       function complete(){
           callbackCount++;
           if(callbackCount >= 3){
               res.render('create', context);
           }

       }
   });

  return router;
  }();
