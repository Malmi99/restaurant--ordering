module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
      }
    });
    Order.associate = models => {
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
  };

    return Order;
  };
  