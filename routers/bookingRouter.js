const express = require('express');
const router = express.Router();
const db = require('../dbConfig');
const { isLoggedIn } = require('../middlewares/middleware');

router.get('/', (req, res) => {
  db('trips')
    .then(comments =>
      !comments.length
        ? res.status(404).json({
            message: 'There are no trips just yet, please try again later!'
          })
        : res.json(comments)
    )
    .catch(err => res.status(500).json(err));
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('trips')
    .where('id', id)
    .then(comment =>
      comment
        ? res.json(comment)
        : res.status(404).json({
            message: 'There is no trip with the specified ID, try again!'
          })
    )
    .catch(err => res.status(500).json(err));
});
router.post('/', (req, res) => {
  const { airport, airplane, departure,  numberOfKids } = req.body;
  const trip = { airport, airplane, departure,  numberOfKids };

  db('trips')
    .insert(trip)
    .then(ids => res.status(201).json(ids[0]))
    .catch(err => res.status(500).json(err));
});


module.exports = router;
