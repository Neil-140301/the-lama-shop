const express = require('express');
const CryptoJS = require('crypto-js');
const User = require('../models/User');
const {
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require('./verifyAuth');

const router = express.Router();

router.put('/:id', verifyTokenAndAuthorize, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PWD_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete('/:id', verifyTokenAndAuthorize, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User deleted successfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

//get
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all users
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//user stats
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: '$createdAt' } } },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
