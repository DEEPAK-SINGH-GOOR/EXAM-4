const { Router } = require("express");
const userController = require("../controllers/userController");
const routes = Router();
routes.post("/login", userController.login);
routes.post("/signup", userController.createUser)
routes.get("/", userController.getAllUsers)

module.exports = routes;