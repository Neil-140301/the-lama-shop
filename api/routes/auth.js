const express = require('express');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

//register
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json('wrong credentials');

    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !isPasswordMatched && res.status(400).json('wrong credentials');

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.PWD_SECRET,
      { expiresIn: '3d' }
    );

    const { password, ...rest } = user._doc;

    res.status(200).json({ ...rest, token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
