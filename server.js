const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const referralRoutes = require("./referralRoutes");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "https://accredian-frontend-task-ten-alpha.vercel.app",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.use("/api", referralRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running...");
  });
  
