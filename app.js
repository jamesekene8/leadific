const express = require("express");
const domainRoutes = require("./routes/domainRoutes");

const app = express();

app.use(express.json());

app.use("/domain", domainRoutes);

module.exports = app;
