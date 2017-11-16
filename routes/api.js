var express = require('express'),
    router = express.Router(),
    db = require('../controllers/queries');

router.get('/notes', db.getAllNotes);
router.get('/notes/:id', db.getSingleNote);
router.post('/notes', db.createNote);
router.patch('/notes/:id', db.updateNote);
router.delete('/notes/:id', db.removeNote);

module.exports = router;