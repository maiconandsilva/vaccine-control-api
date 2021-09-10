const {DataTypes, Model} = require("sequelize");
const validator = require("validator");
const sequelize = require("../database/sequelize");
const Vaccine = require("./vaccine");
const User = require("./user");
const {validate} = require("../utils/validation");


class VaccinationRecord extends Model {

}

VaccinationRecord.init({
    lot: DataTypes.STRING,
    date: {
        type: DataTypes.DATEONLY,
        set(value) {
            this.setDataValue("date", new Date(value));
        },
        validate: {
            isDate: true,
            isNotInTheFuture(value) {
                if (value) {
                    validate(!validator.isAfter(String(value)),
                        "Vaccination date cannot be in the future");
                }
            },
        },
    },
    vaccineId: {
        type: DataTypes.INTEGER,
        references: { model: Vaccine, key: "id" },
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        references: { model: User, key: "id" },
        allowNull: false,
    },
}, {
    sequelize,
});

module.exports = VaccinationRecord;
