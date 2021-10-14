const express = require("express");
const { accountController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const accountRouter = express.Router();

accountRouter.post("/signup", accountController.signup);
accountRouter.post("/authenticate", accountController.authenticate);

accountRouter.use(
  authMiddleware.requireAuthentication,
  authMiddleware.loadUserFromToken,
);

accountRouter.post("/update", accountController.update);

module.exports = accountRouter;
