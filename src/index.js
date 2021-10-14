// eslint-disable-next-line import/newline-after-import
const dotenv = require("dotenv"); dotenv.config(); //! First import. Don't change this
const models = require("./models");
const app = require("./routes");

models.sync();

const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.info(`Web server listening on port ${port}`);
});
