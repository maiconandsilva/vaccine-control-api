/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const db = require("../src/database/sequelize");

describe("sequelize", () => {
  describe("#authenticate()", function () {
    it("should establish a connection successfully", async function () {
      await db.authenticate();
    });
  });
});
