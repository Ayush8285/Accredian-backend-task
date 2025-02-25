const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const referralRoutes = require("./referralRoutes");
require("dotenv").config();

const app = express();

const options = [
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
];

app.use(options);

app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.use("/api", referralRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running...");
  });
  
