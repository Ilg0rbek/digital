const mongoose = require('mongoose');

const projectUploadSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: [{
        type: String, // Store image paths/URLs
        required: true
    }],
    projectFiles: [{
        type: String, // Store file paths/URLs
        required: true
    }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    feedback: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const ProjectUpload = mongoose.model('ProjectUpload', projectUploadSchema);

module.exports = ProjectUpload; 