export type Review = {
    id: number;
    location_id: number;
    user: number;
    userName: string;
    rating: number;
    comment: string;
    };

export const reviews: Review[] = [
  // Holy Moly
  {
    id: 1,
    location_id: 1,
    user: 0,
    userName: "Олена",
    rating: 4,
    comment: "Заклад дуже атмосферний! Було б ідеально, якби ще зробили пандус.",
  },
  {
    id: 2,
    location_id: 1,
    user: 1,
    userName: "Ігор",
    rating: 5,
    comment: "Гарний сервіс, зручно для людей на візку всередині.",
  },
  {
    id: 3,
    location_id: 1,
    user: 3,
    userName: "Марина",
    rating: 3,
    comment: "Не вистачає тактильних елементів для орієнтації.",
  },

  // Планета Кіно (Forum Lviv)
  {
    id: 4,
    location_id: 2,
    user: 4,
    userName: "Артем",
    rating: 5,
    comment: "Повністю доступне! Респект!",
  },
  {
    id: 5,
    location_id: 2,
    user: 1,
    userName: "Софія",
    rating: 4,
    comment: "Все круто, лише трохи слизька підлога в туалеті.",
  },
  {
    id: 6,
    location_id: 2,
    user: 2,
    userName: "Дмитро",
    rating: 5,
    comment: "Ідеальний варіант для людей з особливими потребами.",
  },

  // Ribs Restaurant "At Arsenal"
  {
    id: 7,
    location_id: 3,
    user: 3,
    userName: "Леся",
    rating: 2,
    comment: "Смачно, але взагалі не адаптовано для маломобільних.",
  },
  {
    id: 8,
    location_id: 3,
    user: 4,
    userName: "Богдан",
    rating: 1,
    comment: "Дуже тісно, сходи всюди, не рекомендую.",
  },
  {
    id: 9,
    location_id: 3,
    user: 0,
    userName: "Ірина",
    rating: 2,
    comment: "Класний заклад, але не для всіх.",
  },

  // McDonald's
  {
    id: 10,
    location_id: 4,
    user: 0,
    userName: "Віталій",
    rating: 4,
    comment: "Доступний вхід і просторий зал.",
  },
  {
    id: 11,
    location_id: 4,
    user: 0,
    userName: "Таня",
    rating: 3,
    comment: "Немає адаптованого туалету, це мінус.",
  },
  {
    id: 12,
    location_id: 4,
    user: 0,
    userName: "Назар",
    rating: 5,
    comment: "Супер як для фастфуду — і доступно, і швидко!",
  },

  // Good Fried
  {
    id: 13,
    location_id: 5,
    user: 0,
    userName: "Оксана",
    rating: 4,
    comment: "Досить доступно, хоч і пандусів нема.",
  },
  {
    id: 14,
    location_id: 5,
    user: 0,
    userName: "Роман",
    rating: 3,
    comment: "Можна було б покращити навігацію для незрячих.",
  },
  {
    id: 15,
    location_id: 5,
    user: 0,
    userName: "Анна",
    rating: 5,
    comment: "Затишне місце і комфортне для візка!",
  },

  // Вірменка
  {
    id: 16,
    location_id: 6,
    user: 0,
    userName: "Андрій",
    rating: 5,
    comment: "Все супер — доступність на висоті!",
  },
  {
    id: 17,
    location_id: 6,
    user: 0,
    userName: "Юлія",
    rating: 5,
    comment: "Вразило, як добре все продумано для людей з інвалідністю.",
  },
  {
    id: 18,
    location_id: 6,
    user: 0,
    userName: "Олег",
    rating: 4,
    comment: "Місце хороше, але на вході трохи незручно, якщо дощ.",
  },

  // Lviv Handmade Chocolate
  {
    id: 19,
    location_id: 7,
    user: 0,
    userName: "Катерина",
    rating: 3,
    comment: "Дуже атмосферно, але важко дістатись для людей з візком.",
  },
  {
    id: 20,
    location_id: 7,
    user: 0,
    userName: "Максим",
    rating: 2,
    comment: "Дуже вузький вхід, без пандусів.",
  },
  {
    id: 21,
    location_id: 7,
    user: 0,
    userName: "Женя",
    rating: 4,
    comment: "Є підтримка для людей із вадами зору, це плюс.",
  },
];
