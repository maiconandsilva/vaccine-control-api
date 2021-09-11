const express = require("express");
const models = require("../models");
const sequelize = require("../database/sequelize");
const authMiddleware = require("../middlewares/authorization");
const {responseHandler} = require("../utils");

const usersRouter = express.Router();

usersRouter.use(
    authMiddleware.requireAuthentication,
    authMiddleware.loadUserFromToken,
    authMiddleware.verifyUserAuthorization(models.User.USER_TYPE_ENUM.ADMIN),
);

usersRouter.get("/", async function (request, response) {
    let users = await models.User.findAll({attributes: ["id", "email", "type"]});
    response.json({users});
});

usersRouter.post("/update", async function (request, response) {
    const {users: usersData} = request.body;
    const transaction = await sequelize.transaction();
    try {
        let users = await models.User.findAll({
            where: {id: usersData.map(user => user.id)}
        });

        // bulkCreate didn't work
        for (let userData of usersData) {
            let user = users.find(u => u.id === userData.id);
            user.type = userData.type;
            await user.save();
        }

        await transaction.commit();
        response.send();
    } catch (error) {
        await transaction.rollback();
        responseHandler.handleError(request, response, error);
    }
});

module.exports = usersRouter;
