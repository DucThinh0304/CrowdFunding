const Campaign = require("../models/Campaign");
const User = require("../models/User");

const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post("/payment/:id", async (req, res) => {
  try {
    const charges = stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "vnd",
    });

    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          support: {
            id: req.body.campaignId,
            amount: req.body.amount,
            stripe: charges,
          },
        },
      }
    );

    await Campaign.findOneAndUpdate(
      { _id: req.body.campaignId },
      {
        $inc: { donatesum: req.body.amount, supporters: 1 },
      }
    );
    res.status(200).json(charges);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  // (stripeErr, stripeRes) => {
  //   if (stripeErr) {
  //     res.status(500).json(stripeErr);
  //   } else {
  //     res.status(200).json(stripeRes);
  //   }
  // }
});

module.exports = router;
