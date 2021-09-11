const models = require("../models");
const {responseHandler} = require("../utils");
const {jwtToken} = require("../utils");

class AuthMiddleware {
    async requireAuthentication(request, response, next) {
        const {authorization} = request.headers;

        if (!authorization) {
            return responseHandler.handleError(request, response, {
                message: "Provide jwt token 'authorization' header",
            }, {status: 401});
        }

        const [, token] = authorization.split(" ");
        response.locals.userToken = await jwtToken.validate(token);
        next();
    }

    async loadUserFromToken(request, response, next) {
        const {id} = response.locals.userToken;
        if (id) {
            response.locals.user = await models.User.findByPk(id);
        }
        next();
    }

    verifyUserAuthorization(...userTypesAllowed) {
        return async function (request, response, next) {
            if (userTypesAllowed?.indexOf(response.locals.user.type) === -1) {
                return responseHandler.handleError(request, response, {
                    message: "User doesn't have permission to access this resource.",
                }, {status: 401});
            }
            next();
        }
    }
}

module.exports = new AuthMiddleware();
