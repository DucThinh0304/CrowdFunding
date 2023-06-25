const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  try {
  } catch (err) {}
});

router.get("/", async (req, res) => {
  try {
  } catch (err) {}
});

router.delete("/", async (req, res) => {
  try {
  } catch (err) {}
});

module.exports = router;
