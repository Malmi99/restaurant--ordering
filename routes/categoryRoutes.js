//routes/category routes
const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth(), createCategory);
router.get('/', auth(), getCategories);
router.get('/:id', auth(),getCategoryById);
router.put('/:id', auth(), updateCategory);
router.delete('/:id', auth(), deleteCategory);

module.exports = router;
