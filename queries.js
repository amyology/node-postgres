var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/notes';
var db = pgp(connectionString);

// add query functions
function getAllNotes(req, res, next) {
  db.any('select * from notes')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleNote(req, res, next) {
  var noteID = parseInt(req.params.id);
  db.one('select * from notes where id = $1', noteID)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function createNote(req, res, next) {
  db.none('insert into notes(title, author, message)' +
      'values(${title}, ${author}, ${message})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one note'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateNote(req, res, next) {
  db.none('update notes set title=$1, author=$2, message=$3 where id=$4',
    [req.body.title, req.body.author, req.body.message, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeNote(req, res, next) {
  var noteID = parseInt(req.params.id);
  db.result('delete from notes where id = $1', noteID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} note`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllNotes: getAllNotes,
  getSingleNote: getSingleNote,
  createNote: createNote,
  updateNote: updateNote,
  removeNote: removeNote
};