const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const referralRoutes = require("./referralRoutes");

const app = express();

const allowedOrigin = process.env.FRONTEND_ORIGIN?.trim(); 

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
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
  
