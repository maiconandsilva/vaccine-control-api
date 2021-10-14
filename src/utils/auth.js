const bcrypt = require("bcrypt");

class Auth {
  SALT_ROUNDS = 8;
  
  constructor(crypt) {
    this.crypt = crypt;
  }

  async hashPassword(password) {
    const hash = await this.crypt.hash(password, this.SALT_ROUNDS);
    return hash;
  }

  async comparePassword(plainTextPassword, hash) {
    const passwordMatches = await this.crypt.compare(plainTextPassword, hash);
    return passwordMatches;
  }
}

module.exports = new Auth(bcrypt);
