const { Dish } = require('../models');

//create dish
exports.createDish = async (req, res) => {
  // Check if image file is uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image file.' });
  }

  const { name, price } = req.body;
  const { filename } = req.file;
  const imageUrl = `/uploads/${filename}`;

  console.log(imageUrl); 

  try {
    const dish = await Dish.create({ name, price, imageUrl });
    console.log(dish);
    res.status(201).json(dish);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create dish.' });
  }
};

//get dish by id
exports.getDishById = async (req, res) => {
  const { id } = req.params;
  try {
    const dish = await Dish.findOne({ where: { id } });
    if (!dish) {
      return res.status(404).json({ error: 'Dish not found!' });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dish!' });
  }
};

// get dishes 
exports.getDishes = async (req, res) => {
  try {
    const dishes = await Dish.findAll();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dishes!' });
  }
};

//update dishes
exports.updateDish = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const dish = await Dish.update({ name, price }, { where: { id } });
    res.status(200).json(dish);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update dish!' });
  }
};

//delete dishes
exports.deleteDish = async (req, res) => {
  const { id } = req.params;
  try {
    await Dish.destroy({ where: { id } });
    res.status(200).json({ message: 'Dish deleted successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete dish!' });
  }
};
