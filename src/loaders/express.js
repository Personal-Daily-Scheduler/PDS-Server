const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

async function expressLoader(app) {
  app.set("view engine", "pug");
  app.set("views", `${__dirname}/../views`);
  app.use(express.static(path.join(__dirname, "../public")));

  app.use(
    cors({
      origin: "*",
      methods: "GET, POST, PUT, DELETE",
      credentials: true,
      optionsSuccessStatus: 200,
    }),
  );
  app.use(logger('dev'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
}

module.exports = expressLoader;