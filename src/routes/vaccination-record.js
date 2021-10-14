const express = require("express");
const authMiddleware = require("../middlewares/authorization");
const { vaccinationController } = require("../controllers");

const vaccinationRouter = express.Router();

vaccinationRouter.use(
  authMiddleware.requireAuthentication,
  authMiddleware.loadUserFromToken,
);

vaccinationRouter.get("/", vaccinationController.getAll);
vaccinationRouter.post("/", vaccinationController.create);
vaccinationRouter.post("/:id", vaccinationController.update);
vaccinationRouter.post("/:id/delete", vaccinationController.delete);

module.exports = vaccinationRouter;
