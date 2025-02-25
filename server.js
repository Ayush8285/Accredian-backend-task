const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const referralRoutes = require("./referralRoutes");

const app = express();
app.use(cors({ origin: "*" })); // Allow all domains

app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.use("/api", referralRoutes);

app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
    console.log("Server running...");
  });
  
