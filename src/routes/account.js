const {accountController} = require("../controllers");
const {authMiddleware} = require("../middlewares");
const {responseHandler} = require("../utils");
const {auth, jwtToken} = require("../utils");
const models = require("../models");
const express = require("express");

const accountRouter = express.Router();

accountRouter.post("/signup", accountController.signup);
accountRouter.post("/authenticate", accountController.authenticate);

accountRouter.use(
    authMiddleware.requireAuthentication,
    authMiddleware.loadUserFromToken
);

accountRouter.post("/update", accountController.update);

module.exports = accountRouter;
