const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("index page rendering");
  res.render('index', { title: 'project' });
});

module.exports = router;
