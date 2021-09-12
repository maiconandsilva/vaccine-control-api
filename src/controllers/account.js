const Controller = require("./controller");
const {auth, jwtToken} = require("../utils");
const models = require("../models");
const {validate} = require("../utils/validation");

class AccountController extends Controller {
    async signup(request, response) {
        const {email, password} = request.body;
        const user = models.User.build({email});
        await user.setPassword(password);
        await user.save();
    }

    async authenticate(request, response) {
        let user;
        const {email, password} = request.body;

        if (email) {
            user = await models.User.findOne({where: {email}});
        }

        validate(user && await auth.comparePassword(password, user.password),
            "Email or password doesn't match");

        const token = await jwtToken.generate({id: user.id});
        response.json({token});
    }

    async update(request, response) {
        const {email, password} = request.body;
        if (email) response.locals.user.email = email;
        if (password) await response.locals.user.setPassword(password);
        await response.locals.user.save();
    }
}

module.exports = new AccountController();
