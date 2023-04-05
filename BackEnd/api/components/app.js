function app() {
  // init public path for server
  const path = require('path');
  const publicPath = path.join(__dirname, "../public/");
  // init app
  const cors = require("cors");
  const bodyParser = require("body-parser")
  const express = require('express');
  const app = express();

  app.use(express.static(publicPath));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors({
    origin: '*',
  }));

  return app;
}
module.exports = app();