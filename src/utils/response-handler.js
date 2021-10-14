class ResponseHandler {
  _validationErrorDefauls = {
      status: 400,
      jsonResponseType: "validation",
  }

  handleError(request, response, error, args = {}) {
    const options = { ...this._validationErrorDefauls, ...error, ...args };

    try {
      // Validation Error
      response.status(options.status).json({
        error: error.errors.map((item) => item.message),
        type: options.jsonResponseType,
      });
    } catch (e) {
      // Generic Error
      response.status(options.status).json({
        error: [error.message],
        type: options.jsonResponseType,
      });
    }
  }
}

module.exports = new ResponseHandler();
