const router = require("express").Router();
const Address = require("../models/Address");
const { verifyTokenAndAuthorization } = require("./verifyToken");

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAddress);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json("Address has been deleted...");
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET USER ADDRESS

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const address = await Address.find({ username: `${req.params.id}` });
    res.status(200).json(address);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET ADDRESS

router.get("/findOne/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    res.status(200).json(address);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//ADD ADDRESS

router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const newAddress = new Address(req.body);
  try {
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
