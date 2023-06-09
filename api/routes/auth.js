const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER

router.post("/register", async (req, res) => {
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

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Không tồn tại tài khoản này!!");
      return;
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.password) {
      res.status(401).json("Sai mật khẩu!");
      return;
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
