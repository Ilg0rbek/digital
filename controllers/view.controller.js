const test = require('../config/db')

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
    res.render("pages/project.ejs", {
      title: "Ijodiy loyihalar",
      path: '/projects'
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function testSolutionPage(req, res) {
  try {
      const { type } = req.query;

      const selectedTest = test[type] || {
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
      path: '/login'
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
    res.render("pages/project-submit.ejs", {
      title: "Loyihani yuklash",
      path: '/project-upload'
    })
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
  submitProject
};
