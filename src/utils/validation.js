function validate(condition, message) {
  if (!condition) {
    throw new Error(message || "Validation failed");
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = {
  validate,
  assert,
};
