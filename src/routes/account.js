const {authMiddleware} = require("../middlewares");
const {responseHandler} = require("../utils");
const {auth, jwtToken} = require("../utils");
const models = require("../models");
const express = require("express");

const accountRouter = express.Router();

accountRouter.post("/signup", async function (request, response) {
    const {email, password} = request.body;
    try {
        const user = models.User.build({email});
        await user.setPassword(password);
        await user.save();
        response.send();
    } catch (error) {
        responseHandler.handleError(request, response, error);
    }
});

accountRouter.post("/authenticate", async function (request, response) {
    let user;
    const {email, password} = request.body;

    if (email) {
        user = await models.User.findOne({where: {email}});
    }

    if (!user || !await auth.comparePassword(password, user.password)) {
        return responseHandler.handleError(request, response, {
            message: "Email or password doesn't match",
        });
    }
    const token = await jwtToken.generate({id: user.id});
    response.json({token});
});

accountRouter.use(
    authMiddleware.requireAuthentication,
    authMiddleware.loadUserFromToken
);

accountRouter.post("/update", async function(request, response) {
    const {email, password} = request.body;
    try {
        if (email) response.locals.user.email = email;
        if (password) await response.locals.user.setPassword(password);
        await response.locals.user.save();
        response.send();
    } catch (error) {
        responseHandler.handleError(request, response, error);
    }
});

module.exports = accountRouter;
