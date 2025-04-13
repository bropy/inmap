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

export default function FilterPanelMobile({ onChange }: { onChange: (filters: Filters) => void }) {
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
    <div className="block md:hidden fixed top-32 left-1/2 transform -translate-x-1/2 w-[90%] z-[1000]">
      <div
        onClick={() => setVisible(!visible)}
        className="relative z-10 bg-gray-300 rounded-xl cursor-pointer shadow px-4 py-2 text-center"
      >
        <span className="block text-center font-medium text-black">Фільтри</span>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-black">
          {visible ? <IoChevronUp /> : <IoChevronDown />}
        </div>
      </div>

      {visible && (
        <div className="bg-white shadow rounded-b-lg p-4 space-y-2 text-sm text-black transition-all duration-300 -mt-2">
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
