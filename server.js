const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const referralRoutes = require("./referralRoutes");

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,  
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
  
