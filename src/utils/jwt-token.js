const {tokenSettings} = require("../config");
const jwt = require("jsonwebtoken");
const {validate} = require("./validation");

class JwtToken {
    constructor({privateKey, publicKey, tokenExpiration}) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.tokenExpiration = tokenExpiration;
    }

    async generate(data, options = {}) {
        options = {
            expiresIn: this.tokenExpiration,
            ...options,
        };
        return jwt.sign(data, this.privateKey, options);
    }

    async validate(token) {
        return jwt.verify(token, this.publicKey, function(err, decoded) {
            validate(!err, "Couldn't decode token");
            return decoded;
        });
    }

    async decode(token){
        return jwt.decode(token);
    }
}

module.exports = new JwtToken(tokenSettings);
