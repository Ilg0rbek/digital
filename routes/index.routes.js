const express = require("express");
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');
const viewController = require("../controllers/view.controller");
const { login, register, logout } = require("../controllers/user.controller");
const uploadProjectRoutes = require('./upload.project.routes');

// Public routes
router.get("/", viewController.mainPage);
router.get("/technology", viewController.technoPage);
router.get("/digital-method", viewController.digitalPage);
router.get("/professional", viewController.profPage);
router.get("/diagnos", viewController.diagnosPage);
router.get("/test-solution", viewController.testSolutionPage);
router.get("/projects", viewController.projectPage);
router.get("/login", viewController.loginPage);
router.get("/register", viewController.registerPage);
router.get("/projects/:id", viewController.projectDetails);

// Auth routes
router.post("/auth/login", login);
router.post("/auth/register", register);
router.post("/auth/logout", logout);

// Protected routes
router.get("/project-upload", requireAuth, viewController.submitProject);

// Project upload routes
router.use('/api/project-uploads', uploadProjectRoutes);

module.exports = router;
