'use client';

import { useState } from 'react';

type Filters = {
  ramps: boolean;
  tactileElements: boolean;
  adaptedToilets: boolean;
  wideEntrance: boolean;
  visualImpairmentFriendly: boolean;
  wheelchairAccessible: boolean;
};

const defaultFilters: Filters = {
  ramps: false,
  tactileElements: false,
  adaptedToilets: false,
  wideEntrance: false,
  visualImpairmentFriendly: false,
  wheelchairAccessible: false,
};

export default function FilterPanel({ onChange }: { onChange: (filters: Filters) => void }) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const handleChange = (key: keyof Filters) => {
    const updated = { ...filters, [key]: !filters[key] };
    setFilters(updated);
    onChange(updated); 
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md absolute top-4 left-80 z-[1000] w-72">
      <h2 className="text-lg font-semibold mb-2 text-black">Фільтри доступності</h2>
      {Object.entries(filters).map(([key, value]) => (
        <label key={key} className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={value}
            onChange={() => handleChange(key as keyof Filters)}
          />
          <span>
            {{
              ramps: 'Пандус',
              tactileElements: 'Тактильні елементи',
              adaptedToilets: 'Адаптовані туалети',
              wideEntrance: 'Зручний вхід',
              visualImpairmentFriendly: 'Для людей із вадами зору',
              wheelchairAccessible: 'Для людей на візку',
            }[key as keyof Filters]}
          </span>
        </label>
      ))}
    </div>
  );
}
