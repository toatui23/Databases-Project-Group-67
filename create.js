module.exports = function(){
  var express = require('express');
  var router = express.Router();

  function servePlans(req, res){
    console.log("asked for plans")
    var query = 'SELECT planID, planName, description, duration FROM plans';
    var mysql = req.app.get('mysql');
    var context = {}

    function handleRenderingOfPlans(error, results, fields){
      console.log(error)
      console.log(results)
      console.log(fields)

      context.plans = results;

      res.render('create', context)
    }
    mysql.pool.query(query, handleRenderingOfPlans)
  }

  router.get('/', servePlans)
  return router;
}();
