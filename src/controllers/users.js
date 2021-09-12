const Controller = require("./controller");
const models = require("../models");

class UsersController extends Controller {
    async getAll(request, response) {
        let users = await models.User.findAll({
            attributes: ["id", "email", "type"],
        });
        response.json({users});
    }

    async update(request, response) {
        const {users: usersData} = request.body;
        let users = await models.User.findAll({
            where: {id: usersData.map(user => user.id)}
        });

        // bulkCreate didn't work
        for (let userData of usersData) {
            let user = users.find(u => u.id === userData.id);
            user.type = userData.type;
            await user.save({transaction: this.transaction});
        }
    }
}

module.exports = new UsersController();
