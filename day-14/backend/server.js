const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// DB + Server
mongoose.connect("mongodb://127.0.0.1:27017/userdb")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(6000, () => console.log("Server running on port 6000"));
  })
  .catch(err => console.error(err));
