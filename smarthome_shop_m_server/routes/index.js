var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/home', function(req, res, next) {
  res.send({
    code:0
  })
});
module.exports = router;
