var express = require('express');
var storyStore = require('../services/story-store');
var router = express.Router();

router.post('/', function (req, res) {
  storyStore(req.db).insert(req.body, (err, result) => {
    if (err) {
      console.log(`Error: ${err}`);
      res.status(500).json({message: err});
    } else {
      res.status(result ? 201 : 200).json(result);
    }
  });
});

router.get('/all', function (req, res) {
  storyStore(req.db).all((data) => res.json(data));
});

router.get('/latest', function (req, res) {
  storyStore(req.db).latest((data) => res.json(data));
});

router.get('/new', function (req, res) {
  storyStore(req.db).latestNew((data) => res.json(data));
});

module.exports = router;