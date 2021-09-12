const sequelize = require("../database/sequelize");
const {assert} = require("../utils/validation");
const {responseHandler} = require("../utils");


class ControllerInterceptor {
    get(target, propertyName, receiver) {
        const interceptedProperty = target[propertyName];
        assert(!(target.excludes.length && target.includes.length),
            "Cannot use both excludes and includes in controller")

        if (typeof interceptedProperty !== "function" ||
            target.excludes.length && target.excludes.indexOf(propertyName) > -1 ||
            target.includes.length && target.includes.indexOf(propertyName) === -1) {
            return interceptedProperty;
        }

        const self = this;
        return async function(...args) {
            const [request, response] = args;
            const transaction = await sequelize.transaction();
            target.transaction = transaction;
            try {
                let result = await interceptedProperty.apply(self, args);
                response.end();
                await transaction.commit();
                return result;
            } catch (error) {
                await transaction.rollback();
                responseHandler.handleError(request, response, error);
            }
        };
    }
}

class Controller {
    includes = []
    excludes = []
    transaction

    constructor() {
        return new Proxy(this, new ControllerInterceptor());
    }
}

module.exports = Controller;
