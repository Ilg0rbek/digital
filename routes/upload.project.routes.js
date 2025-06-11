const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { auth } = require('../middleware/auth.middleware');
const {
    createProjectUpload,
    getAllProjectUploads,
    getProjectUploadById,
    updateProjectUpload,
    deleteProjectUpload,
    getProjectUploadsByProject
} = require('../controllers/upload.project.controller');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Determine destination based on field name
        const dest = file.fieldname === 'images' ? 'public/uploads/images' : 'public/uploads/projects';
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Configure multer upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max file size
    },
    fileFilter: function (req, file, cb) {
        // Allow images and specific document types
        if (file.fieldname === 'images') {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Only image files are allowed for images field'));
            }
        } else if (file.fieldname === 'projectFiles') {
            const allowedTypes = [
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            ];
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Only DOC, DOCX, PDF, and PPTX files are allowed for project files'));
            }
        } else {
            cb(new Error('Invalid field name'));
        }
    }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(process.cwd(), "public", 'uploads');
const imagesDir = path.join(uploadsDir, 'images');
const projectsDir = path.join(uploadsDir, 'projects');

[uploadsDir, imagesDir, projectsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Routes
router.post('/', auth, upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'projectFiles', maxCount: 5 }
]), createProjectUpload);

router.get('/', auth, getAllProjectUploads);
router.get('/:id', auth, getProjectUploadById);
router.put('/:id', auth, upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'projectFiles', maxCount: 5 }
]), updateProjectUpload);
router.delete('/:id', auth, deleteProjectUpload);
router.get('/project/:projectId', auth, getProjectUploadsByProject);

module.exports = router; 