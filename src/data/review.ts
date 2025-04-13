export type Review = {
    id: number;
    placeId: number;
    userName: string;
    rating: number;
    comment: string;
    };

export const Review: Review[] = [
  // Holy Moly
  {
    id: 1,
    placeId: 1,
    userName: "Олена",
    rating: 4,
    comment: "Заклад дуже атмосферний! Було б ідеально, якби ще зробили пандус.",
  },
  {
    id: 2,
    placeId: 1,
    userName: "Ігор",
    rating: 5,
    comment: "Гарний сервіс, зручно для людей на візку всередині.",
  },
  {
    id: 3,
    placeId: 1,
    userName: "Марина",
    rating: 3,
    comment: "Не вистачає тактильних елементів для орієнтації.",
  },

  // Планета Кіно (Forum Lviv)
  {
    id: 4,
    placeId: 2,
    userName: "Артем",
    rating: 5,
    comment: "Повністю доступне! Респект!",
  },
  {
    id: 5,
    placeId: 2,
    userName: "Софія",
    rating: 4,
    comment: "Все круто, лише трохи слизька підлога в туалеті.",
  },
  {
    id: 6,
    placeId: 2,
    userName: "Дмитро",
    rating: 5,
    comment: "Ідеальний варіант для людей з особливими потребами.",
  },

  // Ribs Restaurant "At Arsenal"
  {
    id: 7,
    placeId: 3,
    userName: "Леся",
    rating: 2,
    comment: "Смачно, але взагалі не адаптовано для маломобільних.",
  },
  {
    id: 8,
    placeId: 3,
    userName: "Богдан",
    rating: 1,
    comment: "Дуже тісно, сходи всюди, не рекомендую.",
  },
  {
    id: 9,
    placeId: 3,
    userName: "Ірина",
    rating: 2,
    comment: "Класний заклад, але не для всіх.",
  },

  // McDonald's
  {
    id: 10,
    placeId: 4,
    userName: "Віталій",
    rating: 4,
    comment: "Доступний вхід і просторий зал.",
  },
  {
    id: 11,
    placeId: 4,
    userName: "Таня",
    rating: 3,
    comment: "Немає адаптованого туалету, це мінус.",
  },
  {
    id: 12,
    placeId: 4,
    userName: "Назар",
    rating: 5,
    comment: "Супер як для фастфуду — і доступно, і швидко!",
  },

  // Good Fried
  {
    id: 13,
    placeId: 5,
    userName: "Оксана",
    rating: 4,
    comment: "Досить доступно, хоч і пандусів нема.",
  },
  {
    id: 14,
    placeId: 5,
    userName: "Роман",
    rating: 3,
    comment: "Можна було б покращити навігацію для незрячих.",
  },
  {
    id: 15,
    placeId: 5,
    userName: "Анна",
    rating: 5,
    comment: "Затишне місце і комфортне для візка!",
  },

  // Вірменка
  {
    id: 16,
    placeId: 6,
    userName: "Андрій",
    rating: 5,
    comment: "Все супер — доступність на висоті!",
  },
  {
    id: 17,
    placeId: 6,
    userName: "Юлія",
    rating: 5,
    comment: "Вразило, як добре все продумано для людей з інвалідністю.",
  },
  {
    id: 18,
    placeId: 6,
    userName: "Олег",
    rating: 4,
    comment: "Місце хороше, але на вході трохи незручно, якщо дощ.",
  },

  // Lviv Handmade Chocolate
  {
    id: 19,
    placeId: 7,
    userName: "Катерина",
    rating: 3,
    comment: "Дуже атмосферно, але важко дістатись для людей з візком.",
  },
  {
    id: 20,
    placeId: 7,
    userName: "Максим",
    rating: 2,
    comment: "Дуже вузький вхід, без пандусів.",
  },
  {
    id: 21,
    placeId: 7,
    userName: "Женя",
    rating: 4,
    comment: "Є підтримка для людей із вадами зору, це плюс.",
  },
];
