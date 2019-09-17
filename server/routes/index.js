var express = require('express');
var router = express.Router();
var request=require('request');
/* GET home page. */
router.get('/cities', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  request.get("http://maoyan.com/ajax/cities",(err,response,body)=>{
      res.json(JSON.parse(response.body));
  });
});
module.exports = router;
