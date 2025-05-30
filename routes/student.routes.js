const { Router } = require("express");
const { login, register, refreshToken, logout } = require("../controllers/student.controller");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/refresh-token", refreshToken);
router.post("/log-out", logout);

module.exports = router;
