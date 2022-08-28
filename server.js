const express = require("express")
const cors = require("cors")
const app = express()
const setupDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes")
const houseRoutes = require("./src/routes/houseRoutes")
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupDB()

app.use("/auth", authRoutes)
app.use("/house", houseRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});