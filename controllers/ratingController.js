const { Rating } = require('../models');
// ratings create
exports.createRating = async (req, res) => {
  const { dishId, rating, comment } = req.body;
  const userId = req.user.id;
  try {
    const newRating = await Rating.create({ userId, dishId, rating, comment });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create rating!' });
  }
};

//get ratings
exports.getRatings = async (req, res) => {
  const { dishId } = req.params;
  try {
    const ratings = await Rating.findAll({ where: { dishId } });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ratings!' });
  }
};
