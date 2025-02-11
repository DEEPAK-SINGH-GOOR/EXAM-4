const { Router } = require("express");
const userRoutes = require("./user");
const routes = Router();
routes.use("/users", userRoutes);
module.exports = routes;

