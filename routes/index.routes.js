const { Router } = require("express");
const viewRouter = require("./view.routes");

const router = Router();

router.use("/", viewRouter);

module.exports = router;
