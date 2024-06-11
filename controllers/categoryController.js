const { Category } = require('../models');
//create category
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create category!' });
  }
};

//get categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories!' });
  }
};

//get category by id
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return res.status(404).json({ error: 'Category not found!' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category!' });
  }
};


//update category
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.update({ name }, { where: { id } });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update category!' });
  }
};

//delete category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.destroy({ where: { id } });
    res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete category!' });
  }
};
