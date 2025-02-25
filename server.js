const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const referralRoutes = require("./referralRoutes");
require("dotenv").config();

const app = express();
const allowedOrigins = [process.env.FRONTEND_URL]; 

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
}));

app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.use("/api", referralRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running...");
  });
  
