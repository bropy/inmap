'use client';

import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

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
  const [visible, setVisible] = useState<boolean>(false);

  const handleChange = (key: keyof Filters) => {
    const updated = { ...filters, [key]: !filters[key] };
    setFilters(updated);
    onChange(updated);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    onChange(defaultFilters);
  };

  return (
    <div className="absolute top-4 left-84 z-[1000] w-58 text-black font-medium">
      <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-4 rounded-t-2xl shadow-inner">
        <div className="w-20 h-1 bg-orange-400 mx-auto rounded-full mb-2"></div>
        <p className="text-center text-lg font-semibold text-orange-800 mb-2">
          Позначення тактильної плитки
        </p>
      </div>
      <div
        onClick={() => setVisible(!visible)}
        className="relative z-10 bg-gray-300 rounded-2xl cursor-pointer shadow px-4 py-2 text-center"
      >
        <span className="block text-center font-medium">Фільтри</span>
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {visible ? <IoChevronUp /> : <IoChevronDown />}
        </div>
      </div>

      {visible && (
        <div className="relative z-0 bg-white shadow rounded-b-lg p-4 py-8 space-y-2 text-sm transition-all duration-300 -mt-4">
          {Object.entries(filters).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
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

          <button
            onClick={handleReset}
            className="w-full mt-2 py-1 bg-gray-400 hover:bg-gray-500 text-black rounded"
          >
            Скинути фільтри
          </button>
        </div>
      )}
    </div>
  );
}
