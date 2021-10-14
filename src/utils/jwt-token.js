const jsonwebtoken = require("jsonwebtoken");
const { tokenSettings } = require("../config");
const { validate } = require("./validation");

class JwtToken {
  constructor(tokenManager, { privateKey, publicKey, tokenExpiration }) {
    this.tokenManager = tokenManager;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.tokenExpiration = tokenExpiration;
  }

  async generate(data, options = {}) {
    const signOptions = { expiresIn: this.tokenExpiration, ...options };
    return this.tokenManager.sign(data, this.privateKey, signOptions);
  }

  async validate(token) {
    return this.tokenManager.verify(token, this.publicKey, (err, decoded) => {
      validate(!err, "Couldn't decode token");
      return decoded;
    });
  }

  async decode(token) {
    return this.tokenManager.decode(token);
  }
}

module.exports = new JwtToken(jsonwebtoken, tokenSettings);
