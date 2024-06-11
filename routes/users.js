const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /users
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to add user' });
  }
});

module.exports = router;
