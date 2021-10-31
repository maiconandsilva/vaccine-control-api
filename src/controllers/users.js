const Controller = require("./controller");
const models = require("../models");

class UsersController extends Controller {
  async getAll(request, response) {
    const users = await models.User.findAll();
    response.json({ users });
  }

  async update(request, response) {
    const users = request.body;
    await models.User.bulkCreate(users, {
      updateOnDuplicate: ["type"],
    });
  }
}

module.exports = new UsersController();
