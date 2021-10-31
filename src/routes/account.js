const express = require("express");
const { accountController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const accountRouter = express.Router();

const accountUserRouter = express.Router();

accountUserRouter.use(
  authMiddleware.requireAuthentication,
  authMiddleware.loadUserFromToken,
);

accountUserRouter.get("/", accountController.getUser);
accountUserRouter.post("/updateEmail", accountController.updateEmail);
accountUserRouter.post("/updatePassword", accountController.updatePassword);

accountRouter.use("/me", accountUserRouter);

accountRouter.post("/signup", accountController.signup);
accountRouter.post("/authenticate", accountController.authenticate);

accountRouter.use(
  authMiddleware.requireAuthentication,
  authMiddleware.loadUserFromToken,
);

accountRouter.post("/update", accountController.update);

module.exports = accountRouter;
