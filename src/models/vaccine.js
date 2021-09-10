const sequelize = require("../database/sequelize");
const {DataTypes, Model} = require("sequelize");

class Vaccine extends Model {

}

Vaccine.init({
    name: { type: DataTypes.STRING, allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    manufacturer: {
        type: DataTypes.STRING, allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
}, {
    sequelize,
});

module.exports = Vaccine;
