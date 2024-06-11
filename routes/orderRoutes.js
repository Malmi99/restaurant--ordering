// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');

router.post('/', auth(), placeOrder);
router.get('/', auth(), getOrders);
router.get('/:id', auth(), getOrderById);
router.put('/:id/status', auth(), updateOrderStatus);

module.exports = router;
