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

router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const contribute = query
      ? await Contribute.find().sort({ createdAt: -1 }).limit(5)
      : await Contribute.find();
    res.status(200).json(contribute);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.get("/findbyId/:id", async (req, res) => {
  try {
    const contributes = await Contribute.findById(req.params.id);
    res.status(200).json(contributes);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.get("/count/:id", async (req, res) => {
  try {
    const contributes = await Contribute.count({
      campaign: `${req.params.id}`,
    });

    res.status(200).json(contributes);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
