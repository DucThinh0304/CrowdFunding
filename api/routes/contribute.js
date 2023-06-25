const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Contribute = require("../models/Contribute");

router.get("/find/:id", async (req, res) => {
  try {
    const contributes = await Contribute.find({ username: `${req.params.id}` });
    res.status(200).json(contributes);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.get("/findbyCampaign/:id", async (req, res) => {
  try {
    const contributes = await Contribute.find({ campaign: `${req.params.id}` });
    res.status(200).json(contributes);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const contribute = query
      ? await Contribute.find().sort({ Id: -1 }).limit(15)
      : await Contribute.find();
    res.status(200).json(users);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
