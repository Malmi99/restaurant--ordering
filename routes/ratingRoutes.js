//routes/rating routes
const express = require('express');
const router = express.Router();
const { createRating, getRatings } = require('../controllers/ratingController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth(), createRating);
router.get('/:dishId', getRatings);

module.exports = router;
