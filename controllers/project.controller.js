const Project = require('../models/project.model');
const Category = require('../models/category.model');
const { verifyToken } = require('../utils/jwt');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, categoryId, fileUrl } = req.body;
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const project = new Project({
      title,
      description,
      category: categoryId,
      author: decoded.id,
      fileUrl
    });

    await project.save();
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Error creating project' });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('category', 'name')
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

// Get projects by category
exports.getProjectsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const projects = await Project.find({ category: categoryId })
      .populate('category', 'name')
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Get projects by category error:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id)
      .populate('category', 'name')
      .populate('author', 'firstName lastName');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({ message: 'Error fetching project' });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId, fileUrl } = req.body;
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is author or admin
    if (project.author.toString() !== decoded.id && decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      project.category = categoryId;
    }
    if (fileUrl) project.fileUrl = fileUrl;

    await project.save();
    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Error updating project' });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is author or admin
    if (project.author.toString() !== decoded.id && decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
}; 