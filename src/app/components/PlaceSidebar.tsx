'use client';

import { Place } from '@/data/places';

export default function PlaceSidebar({
  place,
  onClose,
}: {
  place: Place;
  onClose: () => void;
}) {
  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-[1001] p-4 overflow-y-auto transition-transform transform translate-x-0">
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-black absolute top-2 right-2"
      >
        ✖
      </button>

      <h2 className="text-xl font-bold mb-2 text-black">{place.name}</h2>

      <ul className="space-y-1 text-sm text-black">
        <li>
          Пандуси:{' '}
          {place.accessibility.ramps ? '✅ Є' : '❌ Нема'}
        </li>
        <li>
          Адаптовані туалети:{' '}
          {place.accessibility.adaptedToilets ? '✅ Є' : '❌ Нема'}
        </li>
        <li>
          Тактильні елементи:{' '}
          {place.accessibility.tactileElements ? '✅ Є' : '❌ Нема'}
        </li>
        <li>
          Зручний вхід:{' '}
          {place.accessibility.wideEntrance ? '✅ Є' : '❌ Нема'}
        </li>
        <li>
          Підходить для людей із вадами зору:{' '}
          {place.accessibility.visualImpairmentFriendly ? '✅ Так' : '❌ Ні'}
        </li>
        <li>
          Для людей на візку:{' '}
          {place.accessibility.wheelchairAccessible ? '✅ Так' : '❌ Ні'}
        </li>
      </ul>
    </div>
  );
}
