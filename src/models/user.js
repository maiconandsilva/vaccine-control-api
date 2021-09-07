const db = require("../database/sequelize");
const {DataTypes} = require("sequelize");

module.exports = db.define(
"User", {
    id: {
        primaryKey: true, type: DataTypes.UUID, defaultValue: db.UUIDV4
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    type: {
        type: DataTypes.ENUM, values: ['admin', 'user'], defaultValue: 'user',
        allowNull: false,
    },
});
