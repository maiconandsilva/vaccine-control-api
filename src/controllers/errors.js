const Controller = require("./controller");
const { responseHandler } = require("../utils");

class ErrorController extends Controller {
  async handleErrors(error, request, response, next) {
    // console.log("error code: " + error.code);
    // response.status(500);
    // response.render('error', { error: error });
    //
    responseHandler.handleError(request, response, error);
  }
}

module.exports = new ErrorController();
