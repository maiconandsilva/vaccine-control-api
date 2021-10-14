const models = require("../models");
const { responseHandler } = require("../utils");
const { jwtToken } = require("../utils");

class AuthMiddleware {
  async requireAuthentication(request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
      responseHandler.handleError(request, response, {
        message: "Provide jwt token 'authorization' header",
      }, { status: 401 });
      return;
    }

    const [, token] = authorization.split(" ");
    response.locals.userToken = await jwtToken.validate(token);
    next();
  }

  async loadUserFromToken(request, response, next) {
    const { id } = response.locals.userToken;
    response.locals.user = id ? await models.User.findByPk(id) : null;

    if (!response.locals.user) {
      responseHandler.handleError(request, response, {
        message: "Couldn't find user for token",
      }, { status: 404 });
      return;
    }
    next();
  }

  verifyUserAuthorization(...userTypesAllowed) {
    return async (request, response, next) => {
      if (userTypesAllowed?.indexOf(response.locals.user.type) === -1) {
        responseHandler.handleError(request, response, {
          message: "User doesn't have permission to access this resource.",
        }, { status: 401 });
        return;
      }
      next();
    };
  }
}

module.exports = new AuthMiddleware();
