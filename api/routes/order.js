const express = require('express');
const CryptoJS = require('crypto-js');
const Order = require('../models/Order');
const {
  verifyAuth,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorize,
} = require('./verifyAuth');

const router = express.Router();

//create
router.post('/', verifyAuth, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Order deleted successfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

//get
router.get('/find/:userId', verifyTokenAndAuthorize, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//order stats
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.productId;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: prevMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      { $project: { month: { $month: '$createdAt' }, sales: '$amount' } },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
