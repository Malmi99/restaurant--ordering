module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define('Dish', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Dish.associate = (models) => {
    Dish.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    Dish.hasMany(models.Rating, { foreignKey: 'dishId', as: 'ratings' });
  };

  return Dish;
};