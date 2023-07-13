const Campaign = require("../models/Campaign");
const Contribute = require("../models/Contribute");

const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post("/payment/:id", async (req, res) => {
  try {
    const money = (req.body.amount * 98) / 100;
    const charges = stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "vnd",
    });

    const newContribute = new Contribute({
      username: req.params.id,
      campaign: req.body.campaignId,
      amount: money,
      stripe: req.body.tokenId,
    });
    const savedContribute = await newContribute.save();

    await Campaign.findOneAndUpdate(
      { _id: req.body.campaignId },
      {
        $inc: { donatesum: money, supporters: 1 },
      }
    );

    res.status(200).json(savedContribute);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
