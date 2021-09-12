const express = require("express");
const cors = require("cors");
const api = require("./api");
const account = require("./account");
const users = require("./users");
const vaccination = require("./vaccination-record");
const vaccine = require("./vaccine");
const {errorsController} = require("../controllers");

const app = express();

// Load app settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register root routes
app.use("/api", api);

api.use("/account", account);
api.use("/users", users);
api.use("/vaccination", vaccination);
api.use("/vaccine", vaccine);

// Register root middlewares

// Register root error routes
app.use(errorsController.handleErrors)
module.exports = app;
