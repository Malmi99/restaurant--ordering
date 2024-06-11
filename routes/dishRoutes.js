// routes/dishRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  createDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish
} = require('../controllers/dishController');

router.post('/', auth(), upload.single('image'), createDish);
router.get('/', auth(),getDishes);
router.get('/:id', auth(),getDishById);
router.put('/:id', auth(), updateDish);
router.delete('/:id', auth(), deleteDish);

module.exports = router;
