const dotenv = require("dotenv"); dotenv.config(); //! First import. Don't change this
const models = require("./models");
const db = require("./database/sequelize");

models.sync();
