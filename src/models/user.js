const {DataTypes, Model, UUIDV4} = require("sequelize");
const validator = require("validator");
const sequelize = require("../database/sequelize");
const {auth} = require("../utils");

class User extends Model {
    static USER_TYPE_ENUM = { ADMIN: "admin", USER: "user" };

    _plainTextPassword = ""

    async setPassword(password) {
        this.password = await auth.hashPassword(password);
        this._plainTextPassword = password;
    }
}

User.init({
    id: {
        primaryKey: true, type: DataTypes.UUID, defaultValue: UUIDV4,
        validate: {
            isUUID: 4
        },
    },
    email: {
        type: DataTypes.STRING, allowNull: false, unique: true,
        set(value) {
            this.setDataValue("email", value?.trim()?.toLowerCase());
        },
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING, allowNull: false,
        validate: {
            validatePassword(value) {
                const plainPassword = this._plainTextPassword;
                if (plainPassword && !validator.isStrongPassword(plainPassword)) {
                    throw new Error(
                        "Password must have at least 8 characters, " +
                        "one or more lowercase and uppercase characters, " +
                        "numbers and symbols."
                    );
                }
            },
        },
    },
    type: {
        type: DataTypes.ENUM, values: Object.values(User.USER_TYPE_ENUM),
        defaultValue: User.USER_TYPE_ENUM.USER,
        allowNull: false,
        validate: {
            isIn: [Object.values(User.USER_TYPE_ENUM)],
        },
    },
}, {
    sequelize,
});

module.exports = User
