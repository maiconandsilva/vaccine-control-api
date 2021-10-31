const sequelize = require("../database/sequelize");
const { assert } = require("../utils/validation");
const { responseHandler } = require("../utils");

class ControllerInterceptor {
  get(target, propertyName, receiver) {
    const interceptedProperty = target[propertyName];
    const { excludes, includes } = target;

    assert(!(excludes.length && includes.length),
      "Cannot set both 'excludes' and 'includes' in controller");

    if (typeof interceptedProperty !== "function"
        || (excludes.length && excludes.indexOf(propertyName) > -1)
        || (includes.length && includes.indexOf(propertyName) === -1)) {
      return interceptedProperty;
    }

    return async (...args) => {
      const [request, response] = args;
      const transaction = await sequelize.transaction();
      // eslint-disable-next-line no-param-reassign
      target.transaction = transaction;
      try {
        const result = await interceptedProperty.apply(target, args); // TODO
        response.end();
        await transaction.commit();
        return result;
      } catch (error) {
        await transaction.rollback();
        return responseHandler.handleError(request, response, error);
      }
    };
  }
}

module.exports = ControllerInterceptor;
