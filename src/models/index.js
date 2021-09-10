const User = require("./user");
const Vaccine = require("./vaccine");
const VaccinationRecord = require("./vaccination-record");
const db = require("../database/sequelize")

const env = process.env;

function sync() {
    if (env.NODE_ENV === "development" && env.DB_SYNC === "true") {
        db.sync({
            alter: process.env.DB_SYNC_FORCE !== "true",
            force: process.env.DB_SYNC_FORCE === "true"});
    }
}

module.exports = {
    User,
    Vaccine,
    VaccinationRecord,
    sync,
};
