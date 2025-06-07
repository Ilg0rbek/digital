const test = require('../config/db')

async function mainPage(req, res) {
  try {
    res.render("pages/home.ejs", {
      title: "Asosiy",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function technoPage(req, res) {
  try {
    res.render("pages/techno.ejs", {
      title: "Texnologiya",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function digitalPage(req, res) {
  try {
    res.render("pages/digital.ejs", {
      title: "Raqamli metodika",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function profPage(req, res) {
  try {
    res.render("pages/prof.ejs", {
      title: "Kasbiy rivojlanish",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function diagnosPage(req, res) {
  try {
    res.render("pages/diagnos.ejs", {
      title: "Ijodiy diagnostika",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function projectPage(req, res) {
  try {
    res.render("pages/project.ejs", {
      title: "Ijodiy loyihalar",
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
        testType: type
      });
  } catch (error) {
    console.log(error.message);
  }
}

async function loginPage(req, res) {
  try {
    res.render("pages/login.ejs", {
      title: "Kirish",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function registerPage(req, res) {
  try {
    res.render("pages/register.ejs", {
      title: "Ro'yxatdan o'tish",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function submitProject(req, res) {
  try {
    res.render("pages/project-submit.ejs", {
      title: "Loyihani yuklash"
    })
  } catch (error) {
    
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
