const db = require("../database/sequelize");
const {DataTypes} = require("sequelize");

module.exports = db.define(
"Vaccine", {
    name: { type: DataTypes.STRING, allowNull: false },
    manufacturer: { type: DataTypes.STRING, allowNull: false }
});
