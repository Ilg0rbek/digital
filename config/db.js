const data = {
    kreativlik: {
      title: "Kreativ fikrlash bloki testi",
      description: "Boshlang'ich sinf o'qituvchisining kreativ fikrlash qobiliyatini baholash",
      questions: [
        {
          id: 1,
          text: "Dars jarayonida standart yechim yetarli emas deb hisoblasangiz, qanday harakat qilasiz?",
          options: [
            { text: "Mavjud metodikadan aynan shu holat uchun foydalanaman", score: 0 },
            { text: "Ko'rsatmalarni qattiq bajarib, o'zgartirishsiz qo'llayman", score: 1 },
            { text: "Mavjud metodikani qisman modifikatsiya qilaman", score: 3 },
            { text: "To'laqonli yangi yonalish ishlab chiqaman", score: 5 }
          ]
        },
        {
          id: 2,
          text: "O'quv materiali qiziqarsiz bo'lib qolsa, qanday harakat qilasiz?",
          options: [
            { text: "Aynan darslikkdagi matnni o'qib beraman", score: 0 },
            { text: "Qo'shimcha illustratsiyalar qo'shaman", score: 2 },
            { text: "O'quvchilarni faol ishtirokini ta'minlovchi interaktiv usullar qo'llayman", score: 4 },
            { text: "To'laqonli yangi multimedia loyiha ishlab chiqaman", score: 5 }
          ]
        },
        {
          id: 3,
          text: "Murakkab tushunilmaydigan mavzuni qanday tushuntirasiz?",
          options: [
            { text: "Aynan darslikkdagi izohlar bilan", score: 0 },
            { text: "Qo'shimcha ogoh qilish usullarini qo'llayman", score: 2 },
            { text: "O'quvchilar bilan birgalikda modellashtiramsan", score: 4 },
            { text: "Interaktiv interssent texnologiyalardan foydalanaman", score: 5 }
          ]
        },
        {
          id: 4,
          text: "O'quv mashg'ulotida kutilmagan muammo yuz bersa:",
          options: [
            { text: "Darsni bekor qilaman", score: 0 },
            { text: "Aynan plan bo'yicha davom ettiraman", score: 1 },
            { text: "Vaziyatga moslashgan holda plan o'zgartiraman", score: 3 },
            { text: "Muammo asosida yangi pedagogik yechim topaman", score: 5 }
          ]
        },
        {
          id: 5,
          text: "Yangi pedagogik texnologiyalar paydo bo'lganda:",
          options: [
            { text: "Ko'pchilik qo'llayotgan metodikani tanlayman", score: 0 },
            { text: "Ehtiyotkorlik bilan o'rganaman", score: 2 },
            { text: "Sinovdan o'tkazishga tayyorman", score: 4 },
            { text: "Darhal innovatsiyalarni qo'llashga kirishaman", score: 5 }
          ]
        },
        {
          id: 6,
          text: "O'quv material qiyin tushuniladimi?",
          options: [
            { text: "Aynan ko'rsatmalar asosida tushuntiraman", score: 0 },
            { text: "Qo'shimcha misollar keltiraman", score: 2 },
            { text: "Vizual modellar ishlab chiqaman", score: 4 },
            { text: "O'quvchilar bilan birgalikda modellashtiramsan", score: 5 }
          ]
        },
        {
          id: 7,
          text: "Dars jarayonida o'quvchilar qiziqmasa:",
          options: [
            { text: "Aynan plan asosida davom ettiraman", score: 0 },
            { text: "Qo'shimcha motivatsion usullar qo'llayman", score: 2 },
            { text: "Dars strukturasini o'zgartiraman", score: 4 },
            { text: "To'laqonli yangi kreativ yonalish ishlab chiqaman", score: 5 }
          ]
        },
        {
          id: 8,
          text: "Raqamsal texnologiyalar mavjud emas holatda:",
          options: [
            { text: "Darsni bekor qilaman", score: 0 },
            { text: "An'anaviy usullarni qo'llayman", score: 1 },
            { text: "Alternativ yechimlar topaman", score: 3 },
            { text: "Qo'l bilan yaratilgan kreativ resurslar ishlab chiqaman", score: 5 }
          ]
        },
        {
          id: 9,
          text: "O'quv materialini qanday taqdim etasiz?",
          options: [
            { text: "Aynan darslikkdagi tartibda", score: 0 },
            { text: "Qo'shimcha izohlar bilan", score: 2 },
            { text: "Vizual strukturlashtirilgan holda", score: 4 },
            { text: "Multimedia va interaktiv formatda", score: 5 }
          ]
        },
        {
          id: 10,
          text: "Pedagogik eksperiment taklif etilsa:",
          options: [
            { text: "Bats qilaman", score: 0 },
            { text: "Ehtiyotkorlik bilan o'rganaman", score: 2 },
            { text: "Qisman ishtirok etaman", score: 4 },
            { text: "Darhal faol qo'shilaman", score: 5 }
          ]
        }
      ]
    },
    noodatiy: {
      title: "Innovatsion yondashuvlar testi",
      description: "Pedagogik jarayonga innovatsion yondashuvlarni tekshirish",
      questions: [
        {
          id: 1,
          text: "Dars strukturasini innovatsion usulda o'zgartirish kerak bo'lsa:",
          options: [
            { text: "Standart metodikadan foydalanaman", score: 0 },
            { text: "Qisman o'zgartirishlar kiritaman", score: 2 },
            { text: "Yangi pedagogik texnologiyalarni qo'llayman", score: 4 },
            { text: "To'laqonli innovatsion model yarataman", score: 5 }
          ]
        },
        {
          id: 2,
          text: "Yangi pedagogik texnologiyalarni joriy etishda:",
          options: [
            { text: "Ehtiyotkorlik bilan qarayman", score: 0 },
            { text: "Ko'proq o'rganaman", score: 2 },
            { text: "Sinovdan o'tkazishga tayyorman", score: 4 },
            { text: "Darhal joriy etaman", score: 5 }
          ]
        },
        {
          id: 3,
          text: "Pedagogik jarayonda muammo yuz bersa:",
          options: [
            { text: "Standart yechimlarni qo'llayman", score: 0 },
            { text: "Mavjud yechimlarni qo'llayman", score: 1 },
            { text: "Yangi yonalishlar izlayman", score: 3 },
            { text: "Innovatsion model ishlab chiqaman", score: 5 }
          ]
        },
        {
          id: 4,
          text: "O'quv metodikalarni yangilash kerak bo'lsa:",
          options: [
            { text: "Mavjud metodikani aynan o'zgartirmayman", score: 0 },
            { text: "Qisman o'zgartirishlar kiritaman", score: 2 },
            { text: "Zamonaviy metodikalarni qo'llayman", score: 4 },
            { text: "To'laqonli yangi metodika yarataman", score: 5 }
          ]
        },
        {
          id: 5,
          text: "Pedagogik eksperimentga taklif etilsa:",
          options: [
            { text: "Bats qilaman", score: 0 },
            { text: "Ehtiyotkorlik bilan o'rganaman", score: 2 },
            { text: "Qisman ishtirok etaman", score: 4 },
            { text: "Darhal faol qo'shilaman", score: 5 }
          ]
        },
        {
          id: 6,
          text: "Raqamli texnologiyalarni pedagogik jarayonga kiritishda:",
          options: [
            { text: "Ko'pchilik qo'llayotgan metodikani tanlayman", score: 0 },
            { text: "Ehtiyotkorlik bilan o'rganaman", score: 2 },
            { text: "Sinovdan o'tkazishga tayyorman", score: 4 },
            { text: "Darhal innovatsiyalarni qo'llashga kirishaman", score: 5 }
          ]
        },
        {
          id: 7,
          text: "Pedagogik jarayon samaradorligini oshirish kerak bo'lsa:",
          options: [
            { text: "Mavjud metodikani aynan o'zgartirmayman", score: 0 },
            { text: "Qisman o'zgartirishlar kiritaman", score: 2 },
            { text: "Zamonaviy yondashuvlarni qo'llayman", score: 4 },
            { text: "Innovatsion model yarataman", score: 5 }
          ]
        },
        {
          id: 8,
          text: "O'qitish metodikasini yangilash kerak bo'lsa:",
          options: [
            { text: "Standart metodikani qo'llayman", score: 0 },
            { text: "Qisman o'zgartirishlar kiritaman", score: 2 },
            { text: "Zamonaviy metodikalarni qo'llayman", score: 4 },
            { text: "To'laqonli yangi metodika yarataman", score: 5 }
          ]
        },
        {
          id: 9,
          text: "Pedagogik jarayonga yangi texnologiyalarni kiritishda:",
          options: [
            { text: "Ko'pchilik qo'llayotgan metodikani tanlayman", score: 0 },
            { text: "Ehtiyotkorlik bilan o'rganaman", score: 2 },
            { text: "Sinovdan o'tkazishga tayyorman", score: 4 },
            { text: "Darhal innovatsiyalarni qo'llashga kirishaman", score: 5 }
          ]
        },
        {
          id: 10,
          text: "Pedagogik innovatsiyalarni amalga oshirishda:",
          options: [
            { text: "Standart yonalishlarni tanlayman", score: 0 },
            { text: "Qisman yangilanishlarni qo'llayman", score: 2 },
            { text: "Innovatsion yechimlarni izlayman", score: 4 },
            { text: "To'laqonli yangi pedagogik model yarataman", score: 5 }
          ]
        }
      ]
    },
    raqamli: {
      title: "Raqamli kompetensiya testi",
      description: "Boshlang'ich ta'lim o'qituvchilarining raqamli kompetensiyalarini baholash",
      questions: [
        {
          id: 1,
          text: "Dars jarayonida qaysi raqamli vositadan samarali foydalanish mumkin?",
          options: [
            { text: "Facebook saytidan faqat kommunikatsiya uchun", score: 0 },
            { text: "Google Classroom kabi elektron o'quv platformalardan o'quv jarayonini boshqarish uchun", score: 5 },
            { text: "Telegramdan shaxsiy chat sifatida", score: 1 },
            { text: "WhatsApp guruhlaridan mustaqil o'rganish uchun", score: 2 }
          ]
        },
        {
          id: 2,
          text: "Raqamli savodxonlik nima degan ma'noni anglatadi?",
          options: [
            { text: "Kompyuterda yozish va internetdan foydalanish qobiliyati", score: 2 },
            { text: "Axborot texnologiyalarini tanqidiy va yaratuvchi tarzda qo'llash ko'nikmalari", score: 5 },
            { text: "Paynet va Wi-Fi tarmog'ini bilish", score: 1 },
            { text: "Kompyuter texnikasining texnik xususiyatlarini tushunish", score: 1 }
          ]
        },
        {
          id: 3,
          text: "O'qituvchining raqamli kompetensiyalarining asosiy ko'rsatkichlari qaysilarga kiradi?",
          options: [
            { text: "Kompyuterni yoqish va o'chirish", score: 1 },
            { text: "Elektron pochtadan foydalanish", score: 2 },
            { text: "Axborotni saralash, tahlil qilish va pedagogik maqsadlarda innovatsion texnologiyalardan foydalanish", score: 5 },
            { text: "Internetda sozlamalar qo'yish", score: 1 }
          ]
        },
        {
          id: 4,
          text: "Interaktiv o'quv kontentini yaratishda qaysi vositalardan foydalanish mumkin?",
          options: [
            { text: "Paint dasturida rasm chizish", score: 1 },
            { text: "Kahoot, Quizizz kabi interaktiv testlar platformalari", score: 5 },
            { text: "Microsoft Word hujjatlarini ochish", score: 2 },
            { text: "Elektron pochta orqali topshiriq yuborish", score: 2 }
          ]
        },
        {
          id: 5,
          text: "Pedagogik texnologiyalarda ma'lumotlarni himoya qilish va xavfsizlik qanday amalga oshiriladi?",
          options: [
            { text: "Barcha ma'lumotlarni ochiq qilish", score: 0 },
            { text: "Shaxsiy ma'lumotlarni xavfsizlik qoidalariga rioya qilib saqlash va foydalanish", score: 5 },
            { text: "Internetda istalgan ma'lumotni joylash", score: 0 },
            { text: "Maxsus parollarsiz foydalanish", score: 0 }
          ]
        }
      ]
    },
    situation: {
      title: "Vaziyatli masalalar testi",
      description: "Standart vaziyatlarga noyob yechimlar topish qobiliyatini baholash",
      questions: [
        {
          id: 1,
          text: "Darsda o'quvchi mavzuni tushunmay qolsa:",
          options: [
            { text: "Yana bir marta aynan shu usulda tushuntiraman", score: 0 },
            { text: "Qo'shimcha izohlar beraman", score: 2 },
            { text: "Yangi metodika bilan tushuntiraman", score: 4 },
            { text: "O'quvchi bilan individual yechim ishlab chiqaman", score: 5 }
          ]
        },
        {
          id: 2,
          text: "Dars vaqti yetarli emas bo'lsa:",
          options: [
            { text: "Dars rejasidan biror qismni o'tkazib yuboraman", score: 0 },
            { text: "Tezroq gapiraman", score: 2 },
            { text: "Vaqtni optimal taqsimlash usulini topaman", score: 4 },
            { text: "Darsni interaktiv qisqa formatga aylantiranman", score: 5 }
          ]
        },
        {
          id: 3,
          text: "Texnika ishlamay qolsa:",
          options: [
            { text: "Darsni bekor qilaman", score: 0 },
            { text: "Ko'rsatmalar asosida izohlayman", score: 1 },
            { text: "Alternativ vosotalar topaman", score: 3 },
            { text: "Qo'l bilan kreativ resurslar yarataman", score: 5 }
          ]
        },
        {
          id: 4,
          text: "O'quvchilar motivatsiyasiz bo'lsa:",
          options: [
            { text: "Aynan plan asosida davom ettiraman", score: 0 },
            { text: "Qo'shimcha motivatsion usullar qo'llayman", score: 2 },
            { text: "Dars strukturasini o'zgartiraman", score: 4 },
            { text: "To'laqonli yangi kreativ yonalish ishlab chiqaman", score: 5 }
          ]
        },
        {
          id: 5,
          text: "O'quvchilar dars materialini tez o'zlashtirib qo'ysa:",
          options: [
            { text: "Rejadagi keyingi mavzuga o'taman", score: 0 },
            { text: "Qo'shimcha mashqlar beraman", score: 2 },
            { text: "Muammoli vazifalar yarataman", score: 4 },
            { text: "Kreativ loyiha ishlab chiqaman", score: 5 }
          ]
        },
        {
          id: 6,
          text: "O'quvchilar o'rtasida konflikt yuz bersa:",
          options: [
            { text: "Ko'rsatmalar beraman", score: 0 },
            { text: "Muammoli suhbat o'tkazaman", score: 2 },
            { text: "Psixologik yechimlar topaman", score: 4 },
            { text: "Kreativ komanda loyihasi ishlab chiqaman", score: 5 }
          ]
        },
        {
          id: 7,
          text: "Dars materialini qiyinchilik bilan o'zlashtirishayotgan o'quvchi bo'lsa:",
          options: [
            { text: "Qo'shimcha mashqlar beraman", score: 2 },
            { text: "Individual yonalish beraman", score: 3 },
            { text: "Psixologik qo'llab-quvvatlash ko'rsataman", score: 4 },
            { text: "Personal o'quv traektoriyasi yarataman", score: 5 }
          ]
        },
        {
          id: 8,
          text: "O'quvchilar mavzuga qiziqmasa:",
          options: [
            { text: "Aynan plan asosida davom ettiraman", score: 0 },
            { text: "Qo'shimcha motivatsion usullar qo'llayman", score: 2 },
            { text: "Mavzuni interaktiv qilaman", score: 4 },
            { text: "To'laqonli yangi kreativ yonalish ishlab chiqaman", score: 5 }
          ]
        },
        {
          id: 9,
          text: "Darsga tayyorgarlik ko'rishda muammolar bo'lsa:",
          options: [
            { text: "Standart metodikalarni qo'llayman", score: 0 },
            { text: "Qo'shimcha manbalar topaman", score: 2 },
            { text: "Innovatsion yonalishlar izlayman", score: 4 },
            { text: "Yangi pedagogik texnologiya ishlab chiqaman", score: 5 }
          ]
        },
        {
          id: 10,
          text: "O'quvchida mavzuga nisbatan salbiy munosabat bo'lsa:",
          options: [
            { text: "Ko'rsatmalar beraman", score: 0 },
            { text: "Qiziqish uyg'otaman", score: 2 },
            { text: "Muammoli yechimlar topaman", score: 4 },
            { text: "Individual kreativ yonalish ishlab chiqaman", score: 5 }
          ]
        }
      ]
    }
  };

module.exports = data