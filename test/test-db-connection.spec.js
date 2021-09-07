const db = require("../src/database/sequelize");

describe("sequelize", () => {
    describe("#authenticate()", function() {
        it("should establish a connection successfully", async function() {
            await db.authenticate();
        });
    });
});
