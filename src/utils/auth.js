const bcrypt = require("bcrypt");

class Auth {
    SALT_ROUNDS = 8;

    async hashPassword(password) {
        return await bcrypt.hash(password, this.SALT_ROUNDS);
    }

    async comparePassword(plainTextPassword, hash) {
        return await bcrypt.compare(plainTextPassword, hash);
    }
}

module.exports = new Auth();
