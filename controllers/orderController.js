const { Order, OrderItem } = require('../models');

//create order
exports.placeOrder = async (req, res) => {
  const { items } = req.body;
  try {
    const order = await Order.create({ userId: req.user.id });
    const orderItems = items.map(item => ({ ...item, orderId: order.id }));
    await OrderItem.bulkCreate(orderItems);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Failed to place order!' });
  }
};

//get all the orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [OrderItem] });

    // Map the orders array to format the response
    const formattedOrders = orders.map(order => {
      return {
        id: order.id,
        userId: order.userId,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        OrderItems: order.OrderItems.map(orderItem => {
          return {
            id: orderItem.id,
            orderId: orderItem.orderId,
            dishId: orderItem.dishId,
            quantity: orderItem.quantity,
            price: orderItem.price,
            createdAt: orderItem.createdAt,
            updatedAt: orderItem.updatedAt
          };
        })
      };
    });

    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders!' });
  }
};

//get order by id
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ 
      where: { id },
      include: OrderItem 
    });
    // chaeck order is available
    if (!order) {
      return res.status(404).json({ error: 'Order not found!' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch order!' });
  }
};

//update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await Order.update({ status }, { where: { id } });
    res.status(200).json({ message: 'Order status updated!' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update order status!' });
  }
};
