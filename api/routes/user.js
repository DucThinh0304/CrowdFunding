const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const User = require("../models/User");
const CryptoJS = require("crypto-js");

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

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
    return;
  } catch (err) {
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

module.exports = router;
