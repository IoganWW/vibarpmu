// Структура данных для раздела "Как проходит обучение" с HTML-тегами

export const trainingInfoData = {
  ua: {
    title: "Як проходить навчання?",
    introduction: "Навчання доступне у двох форматах: <b>офлайн</b> та <b>онлайн</b>.",
    offline: {
      title: "Офлайн-навчання",
      items: [
        "Проходить в навчальному класі з живим спілкуванням та практикою на моделях.",
        "Включає теоретичну частину, демонстрацію технік та практику.",
        "Контроль виконання завдань і індивідуальний зворотний зв'язок.",
        "Акцент на відпрацювання техніки та розбір складних випадків."
      ]
    },
    online: {
      title: "Онлайн-навчання",
      items: [
        "Заняття проходять наживо за розкладом з можливістю ставити запитання.",
        "Доступ до записів уроків залишається на певний час.",
        "Теорія, демонстрація технік, розбір помилок і робота з пігментами.",
        "Домашні завдання з перевіркою та детальним фідбеком.",
        "Особливу увагу приділяємо <b>колористиці</b> та підбору пігментів."
      ]
    },
    important: "<b>Важливо:</b> активна участь у навчанні — ключ до успішного результату. Якщо щось не виходить — питайте й пробуйте знову!"
  },
  /*ru: {
    title: "Как проходит обучение?",
    introduction: "Обучение доступно в двух форматах: <b>оффлайн</b> и <b>онлайн</b>.",
    offline: {
      title: "Оффлайн-обучение",
      items: [
        "Проходит в учебном классе с живым общением и отработкой на моделях.",
        "Включает теоретическую часть, демонстрацию техник и практику.",
        "Контроль выполнения заданий и индивидуальная обратная связь.",
        "Фокус на отработку техники и разбор сложных случаев."
      ]
    },
    online: {
      title: "Онлайн-обучение",
      items: [
        "Занятия проходят в прямом эфире по расписанию с возможностью задавать вопросы.",
        "Доступ к записям уроков остаётся на определённый срок.",
        "Теория, демонстрация техник, разбор ошибок и работа с пигментами.",
        "Домашние задания с проверкой и подробной обратной связью.",
        "Особое внимание уделяем <b>колористике</b> и подбору пигментов."
      ]
    },
    important: "<b>Важно:</b> активное участие в обучении — ключ к успешному результату. Если что-то не получается, спрашивайте и пробуйте снова!"
  },*/
  en: {
    title: "How does the training work?",
    introduction: "Training is available in two formats: <b>offline</b> and <b>online</b>.",
    offline: {
      title: "Offline training",
      items: [
        "Takes place in a classroom with live communication and practice on models.",
        "Includes theoretical part, demonstration of techniques and practice.",
        "Control of task completion and individual feedback.",
        "Focus on technique development and analysis of complex cases."
      ]
    },
    online: {
      title: "Online training",
      items: [
        "Classes are held live according to schedule with the ability to ask questions.",
        "Access to lesson recordings remains for a certain period.",
        "Theory, demonstration of techniques, error analysis and work with pigments.",
        "Homework with verification and detailed feedback.",
        "Special attention is paid to <b>coloristics</b> and pigment selection."
      ]
    },
    important: "<b>Important:</b> active participation in training is the key to successful results. If something doesn't work, ask questions and try again!"
  },
  bg: {
    title: "Как протича обучението?",
    introduction: "Обучението се предлага в два формата: <b>офлайн</b> и <b>онлайн</b>.",
    offline: {
      title: "Офлайн обучение",
      items: [
        "Провежда се в учебна зала с присъствено общуване и практика върху модели.",
        "Включва теоретична част, демонстрация на техники и практика.",
        "Контрол върху изпълнението на задачите и индивидуална обратна връзка.",
        "Фокус върху усъвършенстване на техниката и анализ на сложни случаи."
      ]
    },
    online: {
      title: "Онлайн обучение",
      items: [
        "Часовете се провеждат на живо по график с възможност за задаване на въпроси.",
        "Достъпът до записите остава за определен период.",
        "Теория, демонстрация на техники, анализ на грешки и работа с пигменти.",
        "Домашни задачи с проверка и подробна обратна връзка.",
        "Специално внимание се обръща на <b>колористиката</b> и избора на пигменти."
      ]
    },
    important: "<b>Важно:</b> активното участие в обучението е ключът към успешни резултати. Ако нещо не се получава — питайте и опитвайте отново!"
  },
  tr: {
    title: "Eğitim nasıl geçiyor?",
    introduction: "Eğitim iki formatta sunulmaktadır: <b>yüz yüze</b> ve <b>çevrim içi</b>.",
    offline: {
      title: "Yüz yüze eğitim",
      items: [
        "Sınıf ortamında canlı iletişim ve model üzerinde uygulama ile gerçekleşir.",
        "Teorik kısmı, tekniklerin gösterimini ve uygulamayı içerir.",
        "Görevlerin takibi ve bireysel geri bildirim sağlanır.",
        "Tekniğin uygulanması ve zor vakaların analizi üzerine odaklanılır."
      ]
    },
    online: {
      title: "Çevrim içi eğitim",
      items: [
        "Dersler, programa göre canlı olarak yapılır ve soru sorma imkanı sunar.",
        "Ders kayıtlarına belirli bir süre erişim sağlanır.",
        "Teori, tekniklerin gösterimi, hata analizi ve pigmentlerle çalışma.",
        "Ödevler kontrol edilir ve ayrıntılı geri bildirim sağlanır.",
        "<b>Renk bilgisi</b> ve pigment seçimine özel önem verilir."
      ]
    },
    important: "<b>Önemli:</b> eğitime aktif katılım, başarılı sonuçların anahtarıdır. Bir şeyler yolunda gitmiyorsa, soru sorun ve tekrar deneyin!"
  }
  // Можно добавить другие языки по аналогии
};

// Объект иконок для разных элементов
export const trainingIcons = {
  title: "bi bi-book",
  introduction: "bi bi-laptop",
  offlineTitle: "bi bi-person-video3",
  onlineTitle: "bi bi-wifi",
  offlineItems: [
    "bi bi-building",
    "bi bi-eye",
    "bi bi-check2-circle",
    "bi bi-palette"
  ],
  onlineItems: [
    "bi bi-broadcast",
    "bi bi-play-circle",
    "bi bi-lightbulb",
    "bi bi-pencil-square",
    "bi bi-palette2"
  ],
  important: "bi bi-exclamation-circle"
};