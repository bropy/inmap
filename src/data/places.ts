export type Place = {
  id: number;
  name: string;
  position: [number, number];
  accessibility: {
    ramps: boolean;
    tactileElements: boolean;
    adaptedToilets: boolean;
    wideEntrance: boolean;
    visualImpairmentFriendly: boolean;
    wheelchairAccessible: boolean;
  };
  image: string;
  description: string;
};

export const places: Place[] = [
  {
    id: 1,
    name: 'Holy Moly',
    position: [49.84009711830377, 24.032622815547313],
    accessibility: {
      ramps: false,
      tactileElements: false,
      adaptedToilets: true,
      wideEntrance: true,
      visualImpairmentFriendly: false,
      wheelchairAccessible: true,
    },
    image: 'https://veronica.ua/wp-content/uploads/2018/02/amadeus-5.jpg',
    description: 'Атмосферний бар у центрі Львова з креативним інтер’єром та живою музикою.',
  },
  {
    id: 2,
    name: 'Кінотеатр Планета Кіно (Forum Lviv)',
    position: [49.85000749290983, 24.0223520122525],
    accessibility: {
      ramps: true,
      tactileElements: true,
      adaptedToilets: true,
      wideEntrance: true,
      visualImpairmentFriendly: true,
      wheelchairAccessible: true,
    },
    image: '/images/planetakino.jpg',
    description: 'Сучасний кінотеатр із технологією 4DX у торговому центрі Forum Lviv.',
  },
  {
    id: 3,
    name: 'Ribs Restaurant "At Arsenal"',
    position: [49.84154820968541, 24.035267897124676],
    accessibility: {
      ramps: false,
      tactileElements: false,
      adaptedToilets: false,
      wideEntrance: false,
      visualImpairmentFriendly: false,
      wheelchairAccessible: false,
    },
    image: '/images/ribs.jpg',
    description: 'Популярний ресторан з м’ясними стравами у старовинній будівлі Арсеналу.',
  },
  {
    id: 4,
    name: 'McDonald`s',
    position: [49.8430001825941, 24.026156815915172],
    accessibility: {
      ramps: true,
      tactileElements: true,
      adaptedToilets: false,
      wideEntrance: true,
      visualImpairmentFriendly: true,
      wheelchairAccessible: false,
    },
    image: '/images/mcdonalds.jpg',
    description: 'Мережевий ресторан швидкого харчування з відомим меню та швидким обслуговуванням.',
  },
  {
    id: 5,
    name: 'Good Fried',
    position: [49.84391025591689, 24.030751806141733],
    accessibility: {
      ramps: false,
      tactileElements: true,
      adaptedToilets: false,
      wideEntrance: true,
      visualImpairmentFriendly: true,
      wheelchairAccessible: true,
    },
    image: '/images/goodfried.jpg',
    description: 'Сучасне місце з авторськими стравами на фритюрі та крафтовими напоями.',
  },
  {
    id: 6,
    name: 'Вірменка',
    position: [49.843277005392395, 24.031906235775306],
    accessibility: {
      ramps: true,
      tactileElements: true,
      adaptedToilets: true,
      wideEntrance: true,
      visualImpairmentFriendly: true,
      wheelchairAccessible: true,
    },
    image: '/images/virmenka.jpg',
    description: 'Культове кафе з автентичною кавою у вірменському кварталі Львова.',
  },
  {
    id: 7,
    name: 'Lviv Handmade Chocolate',
    position: [49.84123676738078, 24.03309118513618],
    accessibility: {
      ramps: false,
      tactileElements: false,
      adaptedToilets: false,
      wideEntrance: false,
      visualImpairmentFriendly: true,
      wheelchairAccessible: false,
    },
    image: '/images/chocolate.jpg',
    description: 'Магазин і кафе з ручною шоколадною продукцією та видом на центр міста.',
  },
];
