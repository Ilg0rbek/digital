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
  registerPage,
  submitProject
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
router.get("/project-upload", submitProject )

module.exports = router;
