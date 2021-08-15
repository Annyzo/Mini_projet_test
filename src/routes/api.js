const express = require("express");
const routes = express.Router();
// const verifyJWT = require ("../middlewares/check_jwt");

const Register = require ("../controllers/user_controller/register");
const Login = require("../controllers/user_controller/login");
const OneUser = require("../controllers/user_controller/get_one");
const AllUser = require("../controllers/user_controller/getAll");
const UpdateUser = require("../controllers/user_controller/update");
const DeconnectUser = require("../controllers/user_controller/deconnexion");



// const valideRegister = require("../validation/regist_validate")


routes.post("/register", Register);
routes.post("/login", Login);
routes.get("/user/:token", OneUser);
routes.get("/users/:token", AllUser);
routes.put("/user/:token", UpdateUser);
routes.delete("/user/:token", DeconnectUser);




module.exports = routes;
