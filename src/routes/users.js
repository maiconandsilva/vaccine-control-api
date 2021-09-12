const express = require("express");
const {usersController} = require("../controllers");
const models = require("../models");
const authMiddleware = require("../middlewares/authorization");
const usersRouter = express.Router();

usersRouter.use(
    authMiddleware.requireAuthentication,
    authMiddleware.loadUserFromToken,
    authMiddleware.verifyUserAuthorization(models.User.USER_TYPE_ENUM.ADMIN),
);

usersRouter.get("/", usersController.getAll);
usersRouter.post("/update", usersController.update);

module.exports = usersRouter;
