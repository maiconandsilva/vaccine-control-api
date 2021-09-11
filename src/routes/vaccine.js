const {USER_TYPE_ENUM} = require("../models/user");
const express = require("express");
const models = require("../models");
const {responseHandler} = require("../utils");
const {authMiddleware} = require("../middlewares");

const vaccineRouter = express.Router();

vaccineRouter.use(
    authMiddleware.requireAuthentication,
    authMiddleware.loadUserFromToken,
);

vaccineRouter.get("/", async function(request, response) {
    const vaccines = await models.Vaccine.findAll();
    response.json({vaccines});
});

vaccineRouter.use(
    authMiddleware.verifyUserAuthorization(USER_TYPE_ENUM.ADMIN),
);

vaccineRouter.post("/", async function(request, response) {
    const attrs = request.body;
    try {
        const vaccine = await models.Vaccine.create(attrs, {
            fields: ["name", "manufacturer"]
        });
        response.send();
    } catch (error) {
        responseHandler.handleError(request, response, error);
    }
});

vaccineRouter.post("/:id", async function(request, response) {
    const {id} = request.params;
    const {name, manufacturer} = request.body;

    const vaccine = await models.Vaccine.findByPk(id);
    if (!vaccine) {
        return responseHandler.handleError(request, response, {
            message: "Couldn't find vaccine",
        });
    }
    vaccine.name = name;
    vaccine.manufacturer = manufacturer;
    await vaccine.save();
    response.json({vaccine});
});

vaccineRouter.post("/:id/delete", async function(request, response) {
    const {id} = request.params;
    const vaccine = await models.Vaccine.findByPk(id);
    try {
        await vaccine.destroy();
        response.send();
    } catch (error) {
        responseHandler.handleError(request, response, error);
    }
});

module.exports = vaccineRouter;
