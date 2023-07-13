const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Campaign = require("../models/Campaign");
const Pending = require("../models/Pending");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCampaign = new Campaign(req.body);
  try {
    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate();
    req.params.id,
      {
        $set: req.body,
      },
      { new: true };
    res.status(200).json(updatedCampaign);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//ADD UPDATE
router.put("/update/:id", async (req, res) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          update: {
            img: req.body.img ? req.body.img : "",
            description: req.body.description,
            day: req.body.day,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCampaign);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.status(200).json("Campaign has been deleted...");
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET CAMPAIGN

router.get("/find/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    res.status(200).json(campaign);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET USER CAMPAIGN

router.get("/userfind/:id", async (req, res) => {
  try {
    const campaign = await Campaign.find({ username: `${req.params.id}` });
    res.status(200).json(campaign);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET ALL CAMPAIGN

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qTag = req.query.tag;
  try {
    let campaigns;
    if (qNew) {
      campaigns = await Campaign.find().sort({ createdAt: -1 }).limit(8);
    } else if (qTag) {
      campaigns = await Campaign.find({
        tag: {
          $in: [qTag],
        },
      });
    } else {
      campaigns = await Campaign.find();
    }
    res.status(200).json(campaigns);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//COMMENT

router.post("/comment/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comment: {
            userId: req.body.userId,
            content: req.body.content,
            time: req.body.time,
            star: req.body.star,
          },
        },
        $inc: { comments: 1 },
      }
    );
    res.status(200).json(campaign);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//MOVE TO PUBLIC

router.put("/move/:id", async (req, res) => {
  try {
    const count = await Campaign.find().count();
    const pending = await Pending.findById(req.params.id);
    const campaign = new Campaign({
      Id: count,
      title: pending.title,
      tag: pending.tag,
      donateneed: pending.donateneed,
      donatesum: pending.donatesum,
      img: pending.img,
      dayfinish: pending.dayfinish,
      username: pending.username,
      description: pending.description,
      donateamounts: pending.donateamounts,
    });
    await campaign.save();
    await Pending.findByIdAndDelete(req.params.id);
    res.status(200).json();
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
