const { sequelize } = require('../models');

//get total sales
exports.totalSales = async (req, res) => {
  const { period } = req.query;
  console.log(period)
  try {
    const [results] = await sequelize.query(`
      SELECT SUM(price * quantity) as totalSales
      FROM OrderItems
      WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 1 ${period.toUpperCase()})
    `);
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch total sales!' });
  }
};

//get top selling items
exports.topSellingItems = async (req, res) => {
  const { period } = req.query; 
  try {
    const [results] = await sequelize.query(`
      SELECT dishId, SUM(quantity) as totalSold, SUM(price * quantity) as totalRevenue
      FROM OrderItems
      WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 1 ${period.toUpperCase()})
      GROUP BY dishId
      ORDER BY totalSold DESC
    `);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top selling items!' });
  }
};

//get average order value
exports.averageOrderValue = async (req, res) => {
  const { period } = req.query;
  try {
    const [result] = await sequelize.query(`
      SELECT AVG(price * quantity) as averageOrderValue
      FROM OrderItems
      WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 1 ${period.toUpperCase()})
    `);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch average order value!' });
  }
};

