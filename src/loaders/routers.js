const indexRouter = require("../routers/index");
const authRouter = require("../routers/auth");
const usersRouter = require("../routers/users");

async function routerLoader(app) {
  app.use("/", indexRouter);
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
}

module.exports = routerLoader;
