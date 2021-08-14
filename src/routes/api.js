const express = require("express");
const routes = express.Router();
// const verifyJWT = require ("../middlewares/check_jwt");

const Register = require ("../controllers/user_controller/register");
const Login = require("../controllers/user_controller/login");
const valideRegister = require("../validation/regist_validate")


routes.post("/register", Register);
routes.post("/login", Login);


module.exports = routes;
