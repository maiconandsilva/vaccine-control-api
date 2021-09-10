function validate(condition, message) {
    if (!condition) {
        throw new Error(message || "Validation failed");
    }
}

module.exports = {
  validate,
};
