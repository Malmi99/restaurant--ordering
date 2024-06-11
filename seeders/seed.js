const { User, Dish, Order, OrderItem, Category, Rating } = require('../models');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
   // Seed Users
    await User.bulkCreate([
      { username: 'testmalmi12', email: 'malmi12@example.com', password: await bcrypt.hash('password', 8) },
      { username: 'testuser12', email: 'testuser12@example.com', password: await bcrypt.hash('password', 8) }
    ]);

    // Seed Categories
    const categories = await Category.bulkCreate([...Array(5)].map(() => ({
      name: faker.commerce.department()
    })));

    // Seed Dishes
    const dishes = await Dish.bulkCreate([...Array(10)].map(() => ({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()), 
      categoryId: faker.helpers.arrayElement(categories.map(c => c.id))
    })));

    // Seed Orders
    const orders = await Order.bulkCreate([...Array(10000)].map(() => ({
      userId: faker.helpers.arrayElement([1, 2])
    })));

    // Seed OrderItems
    await OrderItem.bulkCreate([...Array(10000)].map(() => ({
      orderId: faker.helpers.arrayElement(orders.map(order => order.id)),
      dishId: faker.helpers.arrayElement(dishes.map(dish => dish.id)),
      quantity: faker.number.int({ min: 1, max: 5 }),
      price: parseFloat(faker.commerce.price()) 
    })));

    // Seed Ratings
    await Rating.bulkCreate([...Array(20)].map(() => ({
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
      dishId: faker.helpers.arrayElement(dishes.map(dish => dish.id)),
      userId: faker.helpers.arrayElement([1, 2])
    })));

  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};

seedDatabase();
