const Controller = require("./controller");
const models = require("../models");
const {validate} = require("../utils/validation");

class VaccinationController extends Controller {
    async getAll(request, response) {
        const vaccinationRecord = await models.VaccinationRecord.findAll({
            where: {userId: [response.locals.user.id]}
        });

        validate(vaccinationRecord, "Couldn't find vaccination registry.");
        response.json({vaccinationRecord});
    }

    async create(request, response) {
        const {lot, date, vaccineId} = request.body;
        const user = await models.VaccinationRecord.create({
            lot, date, vaccineId, userId: response.locals.user.id
        });
    }

    async update(request, response) {
        const {id} = request.params;
        const {lot, date, vaccineId} = request.body;

        const vaccinationRecord = await models.VaccinationRecord.findOne({
            where: {id, userId: response.locals.user.id}
        });

        validate(vaccinationRecord, "Couldn't find vaccination log.");

        if (lot) vaccinationRecord.lot = lot;
        if (date) vaccinationRecord.date = date;
        if (vaccineId) vaccinationRecord.vaccineId = vaccineId;

        await vaccinationRecord.save();
    }

    async delete(request, response) {
        const {id} = request.params;

        const vaccinationRecord = await models.VaccinationRecord.findOne({
            where: {id, userId: [response.locals.user.id]}
        });

        validate(vaccinationRecord, "Couldn't find vaccination log.");
        await vaccinationRecord.destroy();
    }
}

module.exports = new VaccinationController();
