const express = require("express");
const models = require("../models");
const authMiddleware = require("../middlewares/authorization");
const {responseHandler} = require("../utils");

const vaccinationRouter = express.Router();

vaccinationRouter.use(
    authMiddleware.requireAuthentication,
    authMiddleware.loadUserFromToken
);

vaccinationRouter.get("/", async function (request, response) {
    const vaccinationRecord = await models.VaccinationRecord.findAll({
        where: {userId: [response.locals.user.id]}
    });
    if (!vaccinationRecord) {
        return responseHandler.handleError(request, response, {
            message: "Couldn't find vaccination registry."
        });
    }
    response.json({vaccinationRecord});
});

vaccinationRouter.post("/", async function (request, response) {
    const {lot, date, vaccineId} = request.body;
    try {
        const user = await models.VaccinationRecord.create({
            lot, date, vaccineId, userId: response.locals.user.id});
        response.send();
    } catch (error) {
        responseHandler.handleError(request, response, error);
    }
});

vaccinationRouter.post("/:id", async function (request, response) {
    const {id} = request.params;
    const {lot, date, vaccineId} = request.body;

    const vaccinationRecord = await models.VaccinationRecord.findOne({
        where: {id, userId: [response.locals.user.id]}
    });

    if (!vaccinationRecord) {
        return responseHandler.handleError(request, response, {
            message: "Couldn't find vaccination log."
        });
    }
    if (lot != null) vaccinationRecord.lot = lot;
    if (date != null) vaccinationRecord.date = date;
    if (vaccineId) vaccinationRecord.vaccineId = vaccineId;
    try {
        await vaccinationRecord.save();
        response.send();
    } catch (error) {
        responseHandler.handleError(request, response, error);
    }
});

vaccinationRouter.post("/:id/delete", async function (request, response) {
    const {id} = request.params;

    const vaccinationRecord = await models.VaccinationRecord.findOne({
        where: {id, userId: [response.locals.user.id]}
    });

    if (!vaccinationRecord) {
        return responseHandler.handleError(request, response, {
            message: "Couldn't find vaccination log."
        });
    }
    try {
        await vaccinationRecord.destroy();
        response.send();
    } catch (error) {
        responseHandler.handleError(request, response, error);
    }
});

module.exports = vaccinationRouter;
