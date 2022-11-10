require ("dotenv").config();
require("express-async-errors");
const express = require('express');
const mongoose = require('mongoose');
const { errorHandler } = require("./middlewares/error");
const router = require("./routers/router");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log("Hey man...I'm ready to store yout Data"))
      .catch((err) => console.log(err));

app.use('/', router);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`I'm Express🚚 and I'm serving you on port ${process.env.PORT || 3000}`);
})