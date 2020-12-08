module.exports = function(){
  var express = require('express');
  var router = express.Router();

  function serveLifts_Muscles(req, res){
    var query = 'SELECT liftID, muscleID FROM lift_muscles';
    var mysql = req.app.get('mysql');
    var context = {};

    function handleRenderingOfLifts_Muscles(error, results, fields){
      console.log(error)
      console.log(results)
      console.log(fields)

      context.lifts_muscles = results
      res.render('lifts_muscles', context)
    }
    mysql.pool.query(query, handleRenderingOfLifts_Muscles)
  }

  router.get('/', serveLifts_Muscles);
  return router;
}();
