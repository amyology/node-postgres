var express = require('express'),
    router = express.Router(),
    request = require('request');

// INDEX
router.get('/', function(req, res, next) {
  request('http://localhost:3000/api/notes', function (error, response, body) {
    if (response.statusCode == 200) {
      res.render('notes/index', { notes: JSON.parse(body) });
    }
  });
});

// NEW
router.get('/new', function(req, res, next) {
  res.render('notes/new');
});

// CREATE
router.post('/create', function(req, res, next) {
  var formData = {
    title: req.body.title,
    author: req.body.author,
    message: req.body.message
  };
  request.post({ url:'http://localhost:3000/api/notes', form: formData },
    function(err, httpResponse, body) {
      if (httpResponse.statusCode == 200) {
        res.redirect('/notes');
      } else {
        res.redirect('/notes/new');
        console.log(err);
      }
    });
});

//EDIT
router.get('/edit/:id', function(req, res, next) {
  var url = 'http://localhost:3000/api/notes/' + req.params.id;
  request(url, function (error, response, body) {
    res.render('notes/edit', { note: JSON.parse(body) });
  });
});

// UPDATE
router.post('/update', function(req, res, next) {
  var url = 'http://localhost:3000/api/notes/' + req.body.id;
  var formData = {
    title: req.body.title,
    author: req.body.author,
    message: req.body.message
  };
  request.patch({ url: url, form: formData },
    function(err, httpResponse, body) {
      if (httpResponse.statusCode == 200) {
        res.redirect('/notes/' + req.body.id);
      } else {
        res.redirect('/notes/edit/' + req.body.id);
        console.log(err);
      }
    });
});

// DESTROY
router.get('/destroy/:id', function(req, res, next) {
  var url = 'http://localhost:3000/api/notes/' + req.params.id;
  request.del(url, function(error, response, body) {
    res.redirect('/notes');
  });
});

// SHOW
router.get('/:id', function(req, res, next) {
  var url = 'http://localhost:3000/api/notes/' + req.params.id;
  request(url, function (error, response, body) {
    if (response.statusCode == 200) {
      res.render('notes/show', { note: JSON.parse(body) });
    } else {
      res.redirect('/notes');
    }
  });
});

module.exports = router;