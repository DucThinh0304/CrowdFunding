const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Contribute = require("../models/Contribute");
const Campaign = require("../models/Campaign");

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

router.delete("/:id", async (req, res) => {
  try {
    const contributes = await Contribute.findById(req.params.id);
    await Campaign.updateOne(
      { _id: contributes.campaign },
      { $inc: { donatesum: -contributes.amount, supporters: -1 } }
    );
    await Contribute.findByIdAndDelete(req.params.id);
    res.status(200).json("Xóa thành công");
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
