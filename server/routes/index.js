var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/github', function(req, res, next) {
  res.send('hello chip');
});

module.exports = router;

