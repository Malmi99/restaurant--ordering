// module.exports = app;
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const authMiddleware = require('./middleware/authMiddleware');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'kmmi1999',
  database: 'restaurant_db'
});

const User = require('./models/User')(sequelize, DataTypes);
const Dish = require('./models/dish')(sequelize, DataTypes);
const Category = require('./models/category')(sequelize, DataTypes);
const Rating = require('./models/rating')(sequelize, DataTypes);

app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
const dishRoutes = require('./routes/dishRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use('/auth', authRoutes);
app.use('/dishes', dishRoutes);
app.use('/categories', categoryRoutes);
app.use('/ratings', ratingRoutes);
app.use('/orders', orderRoutes);
app.use('/reports', reportRoutes);

const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
