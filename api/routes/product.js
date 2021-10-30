const express = require('express');
const CryptoJS = require('crypto-js');
const Product = require('../models/Product');
const {
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require('./verifyAuth');

const router = express.Router();

//create
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product deleted successfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

//get
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all products
router.get('/', async (req, res) => {
  const { new: qNew, category } = req.query;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (category) {
      products = await Product.find({ category: { $in: [category] } });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
