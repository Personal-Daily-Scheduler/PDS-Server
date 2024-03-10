const mongooseLoader = require("./mongoose");
const expressLoader = require("./express");
const routerLoader = require("./routers");
const errorLoader = require("./error");

const appLoader = async app => {
  mongooseLoader();
  await expressLoader(app);
  await routerLoader(app);
  await errorLoader(app);
}

module.exports = appLoader;