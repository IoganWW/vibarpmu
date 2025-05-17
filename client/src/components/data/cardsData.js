import {
  basicCardImg,
  extendedCardImg,
  lipsCardImg,
  browsCardImg,
} from "../../assets/images";

export const cards = [
  {
    id: "card1",
    img: basicCardImg,
    title: "START",
    text: {
      ua: {
        description:
          "Перший крок до нової професії! Опануйте базові техніки перманентного макіяжу та починайте впевнено працювати з клієнтами.",
        headerText: "Базовий курс",
        details: "Детальніше",
      },
      en: {
        description:
          "The first step to a new profession! Learn the basic techniques of permanent makeup and start working confidently with clients.",
        headerText: "Basic course",
        details: "More",
      },
      bg: {
        description:
          "Първата стъпка към нова професия! Научете основните техники на перманентния грим и започнете уверено да работите с клиенти.",
        headerText: "Основен курс",
        details: "Повече",
      },
      tr: {
        description:
          "Yeni bir mesleğe ilk adım! Kalıcı makyajın temel tekniklerini öğrenin ve müşterilerle güvenle çalışmaya başlayın.",
        headerText: "Temel kurs",
        details: "Detaylar",
      },
    },
    headerIcon: "award",
    headerClass: "bg-secondary",
    type: "basic",
  },
  {
    id: "card2",
    img: extendedCardImg,
    title: "START Extended",
    text: {
      ua: {
        description:
          "Станьте майстром усіх технік! Повне навчання з розбором ключових методик для створення ідеального результату.",
        headerText: "Базовий курс",
        details: "Детальніше",
      },
      en: {
        description:
          "Become a master of all techniques! Full training with key methods to create perfect results.",
        headerText: "Basic course",
        details: "More",
      },
      bg: {
        description:
          "Станете майстор на всички техники! Пълно обучение с ключови методики за постигане на идеални резултати.",
        headerText: "Основен курс",
        details: "Повече",
      },
      tr: {
        description:
          "Tüm tekniklerin ustası olun! Mükemmel sonuçlar için ana yöntemlerle kapsamlı eğitim.",
        headerText: "Temel kurs",
        details: "Detaylar",
      },
    },
    headerIcon: "mortarboard",
    headerClass: "bg-secondary",
    type: "basic",
  },
  {
    id: "card3",
    img: lipsCardImg,
    title: "LEVEL UP LIPS",
    text: {
      ua: {
        description:
          "Вдосконалюйте техніку, створюйте ідеальні губи з першого разу! Навчіться працювати без корекцій, вкладати пігмент за 1,5 проходу і досягати приживлення до 70%.",
        headerText: "Підвищення рівня",
        details: "Детальніше",
      },
      en: {
        description:
          "Perfect your technique and create flawless lips on the first try! Work without corrections, lay pigment in 1.5 passes, and achieve up to 70% retention.",
        headerText: "Level Up",
        details: "More",
      },
      bg: {
        description:
          "Усъвършенствайте техниката си и създавайте идеални устни от първия път! Без корекции, с пигмент за 1,5 преминавания и до 70% задържане.",
        headerText: "Надграждане",
        details: "Повече",
      },
      tr: {
        description:
          "Tekniğinizi geliştirin, dudakları ilk seferde mükemmel hale getirin! Düzeltme olmadan, 1,5 geçişte pigment yerleştirme ve %70'e kadar tutunma oranı.",
        headerText: "Seviye Artışı",
        details: "Detaylar",
      },
    },
    headerIcon: "brush",
    headerClass: "bg-danger",
    type: "advanced",
  },
  {
    id: "card4",
    img: browsCardImg,
    title: "LEVEL UP BROWS",
    text: {
      ua: {
        description:
          "Мінеральні пігменти без зайвих проходів — ідеальні брови з першого разу! Освойте авторську техніку укладки пігменту, створюючи стійкий і природний результат.",
        headerText: "Підвищення рівня",
        details: "Детальніше",
      },
      en: {
        description:
          "Mineral pigments with fewer passes — perfect brows the first time! Master a unique pigment layering technique for long-lasting and natural results.",
        headerText: "Level Up",
        details: "More",
      },
      bg: {
        description:
          "Минерални пигменти без излишни преминавания — идеални вежди от първия път! Научете авторска техника за полагане на пигмент с естествен резултат.",
        headerText: "Надграждане",
        details: "Повече",
      },
      tr: {
        description:
          "Fazla geçiş yapmadan mineral pigmentlerle mükemmel kaşlar! Doğal ve kalıcı sonuçlar için özel pigment yerleştirme tekniğini öğrenin.",
        headerText: "Seviye Artışı",
        details: "Detaylar",
      },
    },
    headerIcon: "eye",
    headerClass: "bg-danger",
    type: "advanced",
  },
  {
    id: "card5",
    img: basicCardImg,
    title: "ONLINE BROWS",
    text: {
      ua: {
        description:
          "Клієнтська графіка — ідеальні брови в кожній роботі! Авторський онлайн-курс зі створення чітких та натуральних брів.",
        headerText: "Тематичний",
        details: "Детальніше",
      },
      en: {
        description:
          "Client graphics — perfect brows in every work! An original online course on creating precise and natural brows.",
        headerText: "Thematic",
        details: "More",
      },
      bg: {
        description:
          "Клиентска графика — перфектни вежди във всяка работа! Авторски онлайн курс за създаване на точни и естествени вежди.",
        headerText: "Тематичен",
        details: "Повече",
      },
      tr: {
        description:
          "Müşteri grafiği — her çalışmada kusursuz kaşlar! Doğal ve net kaş oluşturma üzerine özgün bir online kurs.",
        headerText: "Tematik",
        details: "Detaylar",
      },
    },
    headerIcon: "award",
    headerClass: "bg-secondary",
    type: "thematic",
  },
  {
    id: "card6",
    img: extendedCardImg,
    title: "ONLINE LIPS",
    text: {
      ua: {
        description:
          "Текстуровані губи без набряків і зайвих проходів! 15 онлайн-уроків з авторської техніки укладання пігменту без корекції.",
        headerText: "Тематичний",
        details: "Детальніше",
      },
      en: {
        description:
          "Textured lips with no swelling or extra passes! 15 online lessons on an original pigment technique without correction.",
        headerText: "Thematic",
        details: "More",
      },
      bg: {
        description:
          "Текстурирани устни без подуване и излишни преминавания! 15 онлайн урока по авторска техника без корекции.",
        headerText: "Тематичен",
        details: "Повече",
      },
      tr: {
        description:
          "Şişlik ve fazla geçiş olmadan dokulu dudaklar! Düzeltmesiz pigment yerleştirme üzerine 15 online ders.",
        headerText: "Tematik",
        details: "Detaylar",
      },
    },
    headerIcon: "mortarboard",
    headerClass: "bg-secondary",
    type: "thematic",
  },
  {
    id: "card7",
    img: lipsCardImg,
    title: "FULL",
    text: {
      ua: {
        description:
          "Повний курс з персональним супроводом! 12 модулів, 15 детальних відеоуроків і індивідуальна консультація для глибокого освоєння технік перманентного макіяжу.",
        headerText: "Персональний",
        details: "Детальніше",
      },
      en: {
        description:
          "Full course with personal guidance! 12 modules, 15 detailed video lessons, and an individual consultation for deep mastery of PMU techniques.",
        headerText: "Personal",
        details: "More",
      },
      bg: {
        description:
          "Пълен курс с персонално обучение! 12 модула, 15 подробни видео урока и индивидуална консултация за дълбоко усвояване на техники за перманентен грим.",
        headerText: "Персонален",
        details: "Повече",
      },
      tr: {
        description:
          "Kişisel rehberlikle tam kurs! 12 modül, 15 detaylı video dersi ve kalıcı makyaj tekniklerini derinlemesine öğrenmek için bireysel danışmanlık.",
        headerText: "Kişisel",
        details: "Detaylar",
      },
    },
    headerIcon: "brush",
    headerClass: "bg-danger",
    type: "personal",
  },
  {
    id: "card8",
    img: browsCardImg,
    title: "PREMIUM",
    text: {
      ua: {
        description:
          "Персональне навчання та підтримка 24/7! 3 тижні індивідуального ведення, детальний розбір усіх питань і постійний зворотний зв’язок.",
        headerText: "Персональний",
        details: "Детальніше",
      },
      en: {
        description:
          "Personal training and 24/7 support! 3 weeks of individual mentoring, thorough analysis of all questions, and constant feedback.",
        headerText: "Personal",
        details: "More",
      },
      bg: {
        description:
          "Персонално обучение и поддръжка 24/7! 3 седмици индивидуално наставничество, подробен анализ на всички въпроси и постоянна обратна връзка.",
        headerText: "Персонален",
        details: "Повече",
      },
      tr: {
        description:
          "Kişisel eğitim ve 7/24 destek! 3 hafta birebir mentorluk, tüm soruların detaylı analizi ve sürekli geri bildirim.",
        headerText: "Kişisel",
        details: "Detaylar",
      },
    },
    headerIcon: "eye",
    headerClass: "bg-danger",
    type: "personal",
  },
];

export const courseName = {
  ua: {
    offline: "Офлайн навчання",
    basic: "Базовий курс",
    levelUp: "ПІДВИЩЕННЯ РІВНЯ",
    online: "Онлайн навчання",
    thematic: "Тематичний курс",
    personal: "ІНДИВІДУАЛЬНИЙ",
  },
  en: {
    offline: "Offline courses",
    basic: "Basic",
    levelUp: "LEVEL UP",
    online: "Online courses",
    thematic: "Thematic",
    personal: "PERSONAL",
  },
  bg: {
    offline: "Офлайн курсове",
    basic: "Основен",
    levelUp: "НАДГРАЖДАНЕ",
    online: "Онлайн курсове",
    thematic: "Тематичен",
    personal: "ПЕРСОНАЛЕН",
  },
  tr: {
    offline: "Çevrimdışı kurslar",
    basic: "Temel",
    levelUp: "SEVIYE ATLA",
    online: "Çevrimiçi kurslar",
    thematic: "Tematik",
    personal: "KİŞİSEL",
  },
};
