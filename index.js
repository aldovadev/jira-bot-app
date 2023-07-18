const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const Routes = require("./Routes/Route");
require("dotenv").config();

app.use(Routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
