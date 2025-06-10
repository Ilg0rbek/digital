const express = require('express');
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProjectsByCategory,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/project.controller');

// Create a new project
router.post('/', createProject);

// Get all projects
router.get('/', getAllProjects);

// Get projects by category
router.get('/category/:categoryId', getProjectsByCategory);

// Get project by ID
router.get('/:id', getProjectById);

// Update project
router.put('/:id', updateProject);

// Delete project
router.delete('/:id', deleteProject);

module.exports = router; 