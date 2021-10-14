const Sequelize = require("sequelize");

const { env } = process;

const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: "postgres" /* one of "mysql" | "mariadb" | "postgres" | "mssql" */,
  define: {
    underscored: true,
    freezeTableName: true,
  },
  logQueryParameters: env.NODE_ENV === "development",
  benchmark: env.NODE_ENV === "development",
});

module.exports = sequelize;
