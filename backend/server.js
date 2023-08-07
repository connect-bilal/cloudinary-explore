const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { deleteAsset } = require("./controllers/cloudinary");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server...!");
});

app.delete("/api/delete", deleteAsset);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`I am live in port no. ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
