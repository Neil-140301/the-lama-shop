const express = require('express');
const CryptoJS = require('crypto-js');
const Cart = require('../models/Cart');
const {
  verifyAuth,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorize,
} = require('./verifyAuth');

const router = express.Router();

//create
router.post('/', verifyAuth, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();

    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update
router.put('/:id', verifyTokenAndAuthorize, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete('/:id', verifyTokenAndAuthorize, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('Cart deleted successfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

//get
router.get('/find/:userId', verifyTokenAndAuthorize, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
