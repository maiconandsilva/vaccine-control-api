const ControllerInterceptor = require("./controller-interceptor");

class Controller {
  includes = []
  excludes = []
  transaction

  constructor() {
    return new Proxy(this, new ControllerInterceptor());
  }
}

module.exports = Controller;
