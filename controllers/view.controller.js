const Test = require('../models/test.model')
const Project = require("../models/project.model")
const ProjectUpload = require("../models/upload.project.model")
const path = require("path")

async function mainPage(req, res) {
  try {
    res.render("pages/home.ejs", {
      title: "Asosiy",
      path: '/'
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function technoPage(req, res) {
  try {
    res.render("pages/techno.ejs", {
      title: "Texnologiya",
      path: '/technology'
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function digitalPage(req, res) {
  try {
    res.render("pages/digital.ejs", {
      title: "Raqamli metodika",
      path: '/digital-method'
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function profPage(req, res) {
  try {
    res.render("pages/prof.ejs", {
      title: "Kasbiy rivojlanish",
      path: '/professional'
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function diagnosPage(req, res) {
  try {
    res.render("pages/diagnos.ejs", {
      title: "Ijodiy diagnostika",
      path: '/diagnos'
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function projectPage(req, res) {
  try {
    let projects = await Project.find()
    
    res.render("pages/project.ejs", {
      title: "Ijodiy loyihalar",
      path: '/projects',
      projects: projects
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function testSolutionPage(req, res) {
  try {
    const { type } = req.query;

    const test = await Test.findOne({ type });

    const selectedTest = test || {
      title: "Test topilmadi",
      description: "Kechirasiz, bu test hozircha mavjud emas",
      questions: []
    };

    res.render('pages/test-solution.ejs', {
      title: selectedTest.title,
      testTitle: selectedTest.title,
      testDescription: selectedTest.description,
      questions: selectedTest.questions,
      testType: type,
      path: '/test-solution'
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function loginPage(req, res) {
  try {
    res.render("pages/login.ejs", {
      title: "Kirish",
      path: '/login',
      message: req.query.message
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function registerPage(req, res) {
  try {
    res.render("pages/register.ejs", {
      title: "Ro'yxatdan o'tish",
      path: '/register'
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function submitProject(req, res) {
  try {
    let projects = await Project.find()

    res.render("pages/project-submit.ejs", {
      title: "Loyihani yuklash",
      path: '/project-upload',
      projects:projects
    })
  } catch (error) {
    console.log(error.message);
  }
}

async function projectDetails(req, res) {
  let {id} = req.params
  try {
    // Get recent project uploads
    const recentUploads = await ProjectUpload.find({project: id })
      .populate('project')
      .populate('submittedBy', 'firstName lastName')
      .sort({ createdAt: -1 })

      // Format project uploads for display
    const formattedUploads = recentUploads.map(upload => ({
      id: upload._id,
      title: upload.projectName,
      category: upload.project.title,
      description: upload.description,
      images: upload.images,
      createdAt: upload.createdAt,
      files: upload.projectFiles.map(filePath => ({
        name: `Loyiha haqida${path.extname(filePath)}`,
        url: filePath
      })),
      author: {
        name: `${upload.submittedBy.firstName} ${upload.submittedBy.lastName}`,
        title: upload.submittedBy.role === 'admin' ? 'Admin' : 'O\'quvchi',
        avatar: `https://ui-avatars.com/api/?name=${upload.submittedBy.firstName}+${upload.submittedBy.lastName}&background=random`
      }
    }));

  
    res.render('pages/project-details.ejs', {
      title: 'Loyihalar ro\'yxati',
      projects: formattedUploads,
      path: '/project-details'
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  mainPage,
  technoPage,
  digitalPage,
  profPage,
  diagnosPage,
  projectPage,
  testSolutionPage,
  loginPage,
  registerPage,
  submitProject,
  projectDetails
};
