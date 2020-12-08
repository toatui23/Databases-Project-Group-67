module.exports = function(){
  var express = require('express');
  var router = express.Router();

  function getPlans(res, mysql, context, complete){
    sql = "SELECT planName, duration, description FROM plans";
    mysql.pool.query(sql, function(error,results,fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }
      context.plans = results;
      complete();
    });
  }

  function getPlansWithLifts(res, mysql, context, complete){
    sql = "SELECT plans.planName, lifts.liftName, lifts.sets, lifts.reps FROM plans INNER JOIN plan_lifts on plans.planID = plan_lifts.planID INNER JOIN lifts ON lifts.liftID = plan_lifts.liftID";
    mysql.pool.query(sql, function(error,results,fields){
      if(error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.plansWithLifts = results;
      complete();
    });
  }

  function getLiftsWithMuscles(res,mysql,context,complete){
    sql = "SELECT lifts.liftName, muscles.muscleTitle FROM lifts INNER JOIN lift_muscles ON lifts.liftID = lift_muscles.liftID INNER JOIN muscles ON muscles.muscleID = lift_muscles.muscleID";
    mysql.pool.query(sql, function(error,results,fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }
      context.liftsWithMuscles = results;
      complete();
    });
  }

  router.get('/', function(req, res){
    var callbackCount = 0;
    var context = {};
    //context.jsscripts = [];
    var mysql = req.app.get('mysql');
    getPlans(res, mysql, context, complete);
    getPlansWithLifts(res, mysql, context, complete);
    getLiftsWithMuscles(res, mysql, context, complete);
    function complete(){
      callbackCount++;
      if (callbackCount >= 3) {
        res.render('workouts', context);
      }
    }
  });

  return router;
}();
