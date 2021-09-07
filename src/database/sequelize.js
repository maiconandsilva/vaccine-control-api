const Sequelize = require("sequelize");


const env = process.env;

const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USER, env.DB_PASS, {
    host: env.DB_HOST,
    dialect: "postgres" /* one of "mysql" | "mariadb" | "postgres" | "mssql" */,
    define: {
        freezeTableName: true
    },
});

module.exports = sequelize;
