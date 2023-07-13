const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const User = require("../models/User");
const Campaign = require("../models/Campaign");
const CryptoJS = require("crypto-js");
const Conversation = require("../models/Conversation");
const Contribute = require("../models/Contribute");
const Message = require("../models/Message");
const Address = require("../models/Address");
const Pending = require("../models/Pending");

//UPDATE
router.put("/:id", async (req, res) => {
  // if (req.body.password) {
  //   req.body.password = CryptoJS.AES.decrypt(
  //     req.body.password,
  //     process.env.PASS_SEC
  //   ).toString();
  // }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//CHANGE PASSWORD
router.put("/password/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword === req.body.password) {
      const reqNewPassword = CryptoJS.AES.encrypt(
        req.body.newPassword,
        process.env.PASS_SEC
      ).toString();
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { password: reqNewPassword },
        },
        { new: true }
      );
      res.status(200).json("Success");
      return;
    } else {
      res.status(401).json("Wrong password");
    }
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await User.updateMany(
      { followings: `${req.params.id}` },
      {
        $pullAll: {
          followings: `${req.params.id}`,
        },
      }
    );
    await Campaign.deleteMany({ username: `${req.params.id}` });
    await Campaign.updateMany(
      {
        comment: [
          {
            userId: `${req.params.id}`,
          },
        ],
      },
      {
        $pullAll: {
          comment: [
            {
              userId: `${req.params.id}`,
            },
          ],
        },
      }
    );
    await Pending.deleteMany({ username: req.params.id });
    await Contribute.updateMany(
      { username: req.params.id },
      { $set: { username: "64ae6e54492ff07d2c2a9d80" } }
    );

    await Message.updateMany(
      { sender: req.params.id },
      { $set: { sender: "64ae6e54492ff07d2c2a9d80" } }
    );
    await Conversation.updateMany(
      { members: `${req.params.id}` },
      {
        $set: {
          "members.$": "64ae6e54492ff07d2c2a9d80",
        },
      }
    );
    await Address.deleteMany({ username: req.params.id });
    res.status(200).json("Người dùng đã bị xóa...");
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
});

//GET USER

router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET USER AVT

router.get("/public/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {
      password,
      email,
      isAdmin,
      createdAt,
      updatedAt,
      address,
      favorite,
      __v,
      ...others
    } = user._doc;
    res.status(200).json(others);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET ALL PUBLIC USER

router.get("/publicAll", async (req, res) => {
  try {
    const users = await User.find();
    let array = [];
    for (const user of users) {
      const { password, email, isAdmin, createdAt, updatedAt, __v, ...others } =
        user._doc;
      array.push(others);
    }
    res.status(200).json(array);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET ALL USER

router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ createdAt: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET USER STAT

router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//FAVORITE

router.put("/favorite/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          favorite: {
            id: req.body.campaignId,
          },
        },
      },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//REMOVE FAVORITE

router.put("/removefavorite/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pullAll: {
          favorite: [
            {
              id: req.body.campaignId,
            },
          ],
        },
      },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//get following
router.get("/followings/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const followings = await Promise.all(
      user.followings.map((followingsId) => {
        return User.findById(followingsId);
      })
    );
    let followingList = [];
    followings.map((following) => {
      const { _id, username, name, avt } = following;
      followingList.push({ _id, username, name, avt });
    });
    res.status(200).json(followingList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/following/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          followings: `${req.body.userId}`,
        },
      },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    const newConversation = new Conversation({
      members: [req.params.id, req.body.userId],
    });
    const savedConversation = await newConversation.save();
    res.status(200).json(others);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
});

router.post("/new", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    res.status(403).json("Đã tồn tại tài khoản này");
    return;
  }
  const email = await User.findOne({ email: req.body.email });
  if (email) {
    res.status(403).json("Email này đã được sử dụng");
    return;
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    avt: req.body.avt,
    name: req.body.name,
    phonenumber: req.body.phonenumber,
    gender: req.body.gender,
    isAuthority: req.body.isAuthority,
    isAdmin: req.body.isAdmin,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
