const Controller = require("./controller");
const models = require("../models");
const { validate } = require("../utils/validation");

class VaccinationController extends Controller {
  async getAll(request, response) {
    const vaccination = await models.VaccinationRecord.findAll({
      where: { userId: [response.locals.user.id] },
    });

    validate(vaccination, "Couldn't find vaccination registry.");
    response.json({ vaccination });
  }

  async create(request, response) {
    const { lot, date, vaccineId } = request.body;
    const vaccination = await models.VaccinationRecord.create({
      lot, date, vaccineId, userId: response.locals.user.id,
    });

    response.json({ vaccination });
  }

  async update(request, response) {
    const { id } = request.params;
    const { lot, date, vaccineId } = request.body;

    const vaccinationRecord = await models.VaccinationRecord.findOne({
      where: { id, userId: response.locals.user.id },
    });

    validate(vaccinationRecord, "Couldn't find vaccination log.");

    vaccinationRecord.lot = lot;
    vaccinationRecord.date = date;
    vaccinationRecord.vaccineId = vaccineId;

    await vaccinationRecord.save();
  }

  async delete(request, response) {
    const { id } = request.params;

    const vaccinationRecord = await models.VaccinationRecord.findOne({
      where: { id, userId: [response.locals.user.id] },
    });

    validate(vaccinationRecord, "Couldn't find vaccination log.");
    await vaccinationRecord.destroy();
  }
}

module.exports = new VaccinationController();
