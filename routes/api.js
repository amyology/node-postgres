var express = require('express');
var router = express.Router();
var db = require('../queries');

router.get('/notes', db.getAllNotes);
router.get('/notes/:id', db.getSingleNote);
router.post('/notes', db.createNote);
router.put('/notes/:id', db.updateNote);
router.delete('/notes/:id', db.removeNote);

module.exports = router;