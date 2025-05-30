const { Router } = require("express");
const {
  mainPage,
  technoPage,
  digitalPage,
  profPage,
  diagnosPage,
  projectPage,
  testSolutionPage,
  loginPage,
  registerPage
} = require("../controllers/view.controller");

const router = Router();

router.get("/", mainPage);
router.get("/technology", technoPage);
router.get("/digital-method", digitalPage);
router.get("/professional", profPage);
router.get("/diagnos", diagnosPage);
router.get("/projects", projectPage);
router.get("/test-solution", testSolutionPage);
router.get("/login", loginPage);
router.get("/register", registerPage);

module.exports = router;
