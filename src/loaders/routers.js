const indexRouter = require("../routers/index");
const usersRouter = require("../routers/users");

async function routerLoader(app) {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
}

module.exports = routerLoader;