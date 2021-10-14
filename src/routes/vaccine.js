const express = require("express");
const models = require("../models");
const { vaccineController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const vaccineRouter = express.Router();

vaccineRouter.use(
  authMiddleware.requireAuthentication,
  authMiddleware.loadUserFromToken,
);

vaccineRouter.get("/", vaccineController.getAll);

vaccineRouter.use(
  authMiddleware.verifyUserAuthorization(models.User.USER_TYPE_ENUM.ADMIN),
);

vaccineRouter.post("/", vaccineController.create);
vaccineRouter.post("/:id", vaccineController.update);
vaccineRouter.post("/:id/delete", vaccineController.delete);

module.exports = vaccineRouter;
