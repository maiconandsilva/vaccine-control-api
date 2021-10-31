const Controller = require("./controller");
const { auth, jwtToken } = require("../utils");
const models = require("../models");
const { validate } = require("../utils/validation");

class AccountController extends Controller {
  async getUser(request, response) {
    const user = await response.locals.user;
    const {
      email, type, createdAt, updatedAt,
    } = user;

    response.json({
      email, type, createdAt, updatedAt,
    });
  }

  async signup(request, response) {
    const { email, password } = request.body;
    const user = models.User.build({ email });
    await user.setPassword(password);
    await user.save();
  }

  async authenticate(request, response) {
    const { email, password } = request.body;
    const user = email ? await models.User.findOne({ where: { email } }) : null;

    validate(user && await auth.comparePassword(password, user.password),
      "Email or password doesn't match");

    const token = await jwtToken.generate({ id: user.id });
    response.json({ token });
  }

  async update(request, response) {
    // Do nothing
  }

  async updateEmail(request, response) {
    const { email } = request.body;
    response.locals.user.email = email;
    await response.locals.user.save();
  }

  async updatePassword(request, response) {
    const { password } = request.body;
    await response.locals.user.setPassword(password);
    await response.locals.user.save();
  }
}

module.exports = new AccountController();
