// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  totalSales,
  topSellingItems,
  averageOrderValue
} = require('../controllers/reportController');

router.get('/total-sales', auth(), totalSales);
router.get('/top-selling-items', auth(), topSellingItems);
router.get('/average-order-value', auth(), topSellingItems);
module.exports = router;
