const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const campaignRoute = require("./routes/campaign");
const stripeRoute = require("./routes/stripe");
const addressRoute = require("./routes/address");
const pendingRoute = require("./routes/pending");
const contributeRoute = require("./routes/contribute");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/campaign", campaignRoute);
app.use("/api/donate", stripeRoute);
app.use("/api/addresses", addressRoute);
app.use("/api/pendings", pendingRoute);
app.use("/api/contributes", contributeRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
