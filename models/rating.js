module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
  
    Rating.associate = (models) => {
      Rating.belongsTo(models.Dish, { foreignKey: 'dishId', as: 'dish' });
    };
  
    return Rating;
  };