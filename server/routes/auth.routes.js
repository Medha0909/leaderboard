const { Login, Register } = require ("../controllers/auth.controller.js");
const express = require("express");

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);

module.exports=router;