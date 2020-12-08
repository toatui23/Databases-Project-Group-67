module.exports = function(){
  var express = require('express');
  var router = express.Router();

  function getPlans(res, mysql, context, complete){
    mysql.pool.query("SELECT planID as")
  }

  router.get('/', function(req, res){
    var callbackCount = 0;
    var context = {};
    //context.jsscripts = [];
    var mysql = req.app.get('mysql');
    getPlans(res, mysql, context, complete);
    getLifts(res, mysql, context, complete);
    function complete(){
      callbackCount++;
      if (callbackCount >= 2) {
        res.render('workouts', context);
      }
    }
  });

  return router;
}();
