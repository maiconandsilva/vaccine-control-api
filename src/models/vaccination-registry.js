const db = require("../database/sequelize");
const {DataTypes} = require("sequelize");

module.exports = db.define(
"VaccinationRegistry", {
    lot: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    vaccine_id: {
        type: DataTypes.INTEGER,
        references: { model: "Vaccine", key: "id" },
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        references: { model: "User", key: "id" },
        allowNull: false,
    },
});
