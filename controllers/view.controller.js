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
    const projects = [
      {
        id: 1,
        title: "Tafakkur o'stiruvchi topshiriqlar",
        category: "Topshiriq",
        description: "O'quvchilarning tanqidiy tafakkurini rivojlantirishga yo'naltirilgan interaktiv topshiriqlar va mashg'ulotlar.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        link: "/project-details/1"
      },
      {
        id: 2,
        title: "Muammoli vaziyatlar asosidagi topshiriqlar",
        category: "Muammo",
        description: "Real hayotiy muammolarni hal qilishga yo'naltirilgan topshiriqlar va loyihalar.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        link: "/project-details/2"
      },
      {
        id: 3,
        title: "Dizaynga yo'naltirilgan modellashtirish",
        category: "Dizayn",
        description: "Ijodiy dizayn va modellashtirish ishlarini amalga oshirish bo'yicha loyihalar.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        link: "/project-details/3"
      },
      {
        id: 4,
        title: "Texnologiya darslariga oid slaydlar",
        category: "Ta'lim",
        description: "Zamonaviy ta'lim texnologiyalariga oid interaktiv taqdimotlar va slaydlar.",
        image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        link: "/project-details/4"
      },
      {
        id: 5,
        title: "Boshlang'ich ta'limga oid ko'rgazmali qurollar",
        category: "Ta'lim",
        description: "Boshlang'ich sinf o'quvchilari uchun ko'rgazmali o'quv qurollari va materiallar.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        link: "/project-details/5"
      },
      {
        id: 6,
        title: "Texnologiya darslarida zamonaviy metodlar",
        category: "Metodika",
        description: "Zamonaviy ta'lim metodlaridan foydalanish bo'yicha amaliy maslahatlar va loyihalar.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        link: "/project-details/6"
      },
      {
        id: 7,
        title: "Tabiatdan ilhomlangan maket yaratish",
        category: "Tabiat",
        description: "Tabiat elementlaridan ilhomlangan ijodiy maketlar va loyihalar.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        link: "/project-details/7"
      },
      {
        id: 8,
        title: "Bolalar uchun mavzuga doir ertak tuzish",
        category: "Ijod",
        description: "Bolalar uchun o'quv mavzulariga mos ertaklar yaratish va ularni taqdim etish.",
        image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        link: "/project-details/8"
      }
    ];

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

async function projectDetails(req, res) {
  try {
    let projects = [
      {
        id: 1,
        title: "Tafakkur o'stiruvchi topshiriqlar",
        category: "Topshiriq",
        description: "O'quvchilarning tanqidiy tafakkurini rivojlantirishga yo'naltirilgan interaktiv topshiriqlar va mashg'ulotlar. Bu loyiha orqali o'quvchilar murakkab muammolarni hal qilish, tahlil qilish va yechim topish ko'nikmalarini rivojlantirishlari mumkin.",
        images: ["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"],
        createdAt: new Date('2024-03-15'),
        files: [
          {
            name: "Topshiriqlar to'plami.pdf",
            url: "/files/tasks.pdf"
          },
          {
            name: "Metodik qo'llanma.docx",
            url: "/files/guide.docx"
          }
        ],
        author: {
          name: "Aziza Karimova",
          title: "Boshlang'ich sinf o'qituvchisi",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg"
        }
      },
    ];
  
    res.render('pages/project-details.ejs', {
      title: 'Loyihalar ro\'yxati',
      projects: projects,
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
