const express = require('express');
const stripe = require('stripe');

const router = express.Router();

router.post('/payment', (req, res) => {
  console.log(req.body);
  const stripeObj = stripe(process.env.STRIPE_KEY);
  stripeObj.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount * 70,
      currency: 'inr',
      description: 'Software development services',
    },
    (err, stripeRes) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
