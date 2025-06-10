const { Router } = require("express");
const viewRouter = require("./view.routes");
const authRouter = require("./auth.routes");

const router = Router();

router.use("/", viewRouter);
router.use("/auth", authRouter);

module.exports = router;
