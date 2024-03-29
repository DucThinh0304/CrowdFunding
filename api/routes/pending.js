const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Pending = require("../models/Pending");
const Campaign = require("../models/Campaign");

//CREATE
router.post("/", async (req, res) => {
  const newPending = new Pending(req.body);
  try {
    const savedPending = await newPending.save();
    res.status(201).json(savedPending);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedPending = await Pending.findByIdAndUpdate();
    req.params.id,
      {
        $set: req.body,
      },
      { new: true };
    res.status(200).json(updatedPending);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Pending.findByIdAndDelete(req.params.id);
    res.status(200).json("Pending has been deleted...");
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET PENDING

router.get("/find/:id", async (req, res) => {
  try {
    const pending = await Pending.find({ username: `${req.params.id}` });
    res.status(200).json(pending);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET PENDING

router.get("/findone/:id", async (req, res) => {
  try {
    const pending = await Pending.findById(req.params.id);
    res.status(200).json(pending);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET ALL PENDING

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  try {
    let pendings;
    if (qNew) {
      pendings = await Pending.find().sort({ createdAt: -1 }).limit(8);
    } else {
      pendings = await Pending.find();
    }
    res.status(200).json(pendings);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
});

// //MOVE TO PENDING

// router.put("/move/:id", async (req, res) => {
//   try {
//     const campaign = await Campaign.findById(req.params.id);
//     // const pending = new Pending(campaign)
//     const pending = new Pending({
//       title: campaign.title,
//       tag: campaign.tag,
//       donateneed: campaign.donateneed,
//       donatesum: campaign.donatesum,
//       img: campaign.img,
//       dayfinish: campaign.dayfinish,
//       username: campaign.username,
//       description: campaign.description,
//       donateamounts: campaign.donateamounts,
//     });
//     await pending.save();
//     await Campaign.findByIdAndDelete(req.params.id);
//     res.status(200).json();
//     return;
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//     return;
//   }
// });

module.exports = router;
