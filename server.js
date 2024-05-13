const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT } = process.env;
const port = PORT || 6000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful"),
      app.listen(port, () => {
        console.log(`Server running. Use our API on port: ${port}`);
      });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
