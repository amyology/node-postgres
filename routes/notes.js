var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  request('http://localhost:3000/api/notes', function (error, response, body) {
    if (response.statusCode == 200) {
      res.render('notes/index', { title: 'Notes!', data: JSON.parse(body) });
    } else {
      res.render('notes/index', { title: 'Notes!', data: error });
    }
  });
});

module.exports = router;