const Controller = require("./controller");
const models = require("../models");
const { validate } = require("../utils/validation");

class VaccineController extends Controller {
  async getAll(request, response) {
    const vaccines = await models.Vaccine.findAll();
    response.json({ vaccines });
  }

  async create(request, response) {
    const attrs = request.body;
    const vaccine = await models.Vaccine.create(attrs, {
      fields: ["name", "manufacturer"],
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, manufacturer } = request.body;

    const vaccine = await models.Vaccine.findByPk(id);

    validate(vaccine, "Couldn't find vaccine");

    vaccine.name = name;
    vaccine.manufacturer = manufacturer;
    await vaccine.save();

    response.json({ vaccine });
  }

  async delete(request, response) {
    const { id } = request.params;
    const vaccine = id ? await models.Vaccine.findByPk(id) : null;
    validate(vaccine, "Couldn't find vaccine");
    await vaccine.destroy();
  }
}

module.exports = new VaccineController();
