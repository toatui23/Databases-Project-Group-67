module.exports = function(){
  var express = require('express');
  var router = express.Router();

  function servePlans_Lifts(req, res){
    var query = 'SELECT planID, liftID FROM plan_lifts';
    var mysql = req.app.get('mysql');
    var context = {};

    function handleRenderingOfPlans_Lifts(error, results, fields){
      console.log(error)
      console.log(results)
      console.log(fields)

      context.plans_lifts = results
      res.render('plans_lifts', context)
    }
    mysql.pool.query(query, handleRenderingOfPlans_Lifts)
  }

  router.get('/', servePlans_Lifts);
  return router;
}();
