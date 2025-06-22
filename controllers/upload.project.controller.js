const ProjectUpload = require('../models/upload.project.model');
const path = require('path');
const fs = require('fs');
const { sendProjectApprovalRequest } = require('../services/telegramBot');

// Create new project upload
exports.createProjectUpload = async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.projectName || !req.body.description || !req.body.project) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                receivedData: req.body
            });
        }

        const { projectName, description, project } = req.body;
        const images = [];
        const projectFiles = [];

        // Handle image uploads
        if (req.files && req.files.images) {
            req.files.images.forEach(file => {
                images.push(file.path);
            });
        }

        // Handle project files uploads
        if (req.files && req.files.projectFiles) {
            req.files.projectFiles.forEach(file => {
                projectFiles.push(file.path);
            });
        }

        // Create project upload
        const projectUpload = new ProjectUpload({
            projectName,
            description,
            project,
            images,
            projectFiles,
            submittedBy: req.user ? req.user._id : null
        });

        // Save to database
        const savedUpload = await projectUpload.save();
        console.log('Project upload saved:', savedUpload);

        // Send Telegram notification for approval
        try {
            await sendProjectApprovalRequest(savedUpload);
            console.log('Telegram notification sent for project approval');
        } catch (telegramError) {
            console.error('Failed to send Telegram notification:', telegramError);
            // Don't fail the request if Telegram fails
        }

        res.status(201).json({ 
            success: true, 
            data: savedUpload,
            message: 'Loyiha muvaffaqiyatli yuklandi. Admin tasdiqlashini kuting.'
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(400).json({ 
            success: false, 
            error: error.message,
            details: error.stack
        });
    }
};

// Get all project uploads (only approved ones for public view)
exports.getAllProjectUploads = async (req, res) => {
    try {
        const query = { isChecked: true, status: 'approved' };
        
        // If admin is requesting, show all projects
        if (req.user && req.user.role === 'admin') {
            delete query.isChecked;
            delete query.status;
        }

        const projectUploads = await ProjectUpload.find(query)
            .populate('project')
            .populate('submittedBy', 'name email')
            .sort({ createdAt: -1 });
            
        res.status(200).json({ success: true, data: projectUploads });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get project upload by ID
exports.getProjectUploadById = async (req, res) => {
    try {
        const projectUpload = await ProjectUpload.findById(req.params.id)
            .populate('project')
            .populate('submittedBy', 'name email');
        
        if (!projectUpload) {
            return res.status(404).json({ success: false, error: 'Project upload not found' });
        }

        res.status(200).json({ success: true, data: projectUpload });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update project upload
exports.updateProjectUpload = async (req, res) => {
    try {
        const { projectName, description, status, feedback } = req.body;
        const updateData = {};

        if (projectName) updateData.projectName = projectName;
        if (description) updateData.description = description;
        if (status) updateData.status = status;
        if (feedback) updateData.feedback = feedback;

        // Handle new image uploads
        if (req.files && req.files.images) {
            const newImages = req.files.images.map(file => file.path);
            updateData.$push = { images: { $each: newImages } };
        }

        // Handle new project files uploads
        if (req.files && req.files.projectFiles) {
            const newFiles = req.files.projectFiles.map(file => file.path);
            updateData.$push = { projectFiles: { $each: newFiles } };
        }

        const projectUpload = await ProjectUpload.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate('project').populate('submittedBy', 'name email');

        if (!projectUpload) {
            return res.status(404).json({ success: false, error: 'Project upload not found' });
        }

        res.status(200).json({ success: true, data: projectUpload });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete project upload
exports.deleteProjectUpload = async (req, res) => {
    try {
        const projectUpload = await ProjectUpload.findById(req.params.id);
        
        if (!projectUpload) {
            return res.status(404).json({ success: false, error: 'Project upload not found' });
        }

        // Delete associated files
        for (const image of projectUpload.images) {
            const imagePath = path.join(process.cwd(), image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        for (const file of projectUpload.projectFiles) {
            const filePath = path.join(process.cwd(), file);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await projectUpload.remove();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get project uploads by project ID
exports.getProjectUploadsByProject = async (req, res) => {
    try {
        const projectUploads = await ProjectUpload.find({ project: req.params.projectId })
            .populate('project')
            .populate('submittedBy', 'name email');
        res.status(200).json({ success: true, data: projectUploads });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}; 