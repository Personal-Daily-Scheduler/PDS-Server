const indexRouter = require("../routers/index");
const authRouter = require("../routers/auth");

async function routerLoader(app) {
  app.use("/", indexRouter);
  app.use("/auth", authRouter);
}

module.exports = routerLoader;
