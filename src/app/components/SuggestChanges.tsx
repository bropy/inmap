import { useState } from "react";
import { Place } from "@/data/places";

function SuggestChanges({ place }: { place: Place }) {

    const [editMode, setEditMode] = useState(false);
    const [suggestedAccessibility, setSuggestedAccessibility] = useState(
      place.accessibility
    );

    const toggleAccessibility = (key: keyof typeof suggestedAccessibility) => {
      setSuggestedAccessibility((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };

    const submitAccessibilityChanges = () => {
      //надіслати пропозицію на сервер
    };

  return (
    <div className="bg-gray-100 rounded mt-3">
      <button
        className="w-full bg-gray-400 text-white px-4 py-2 rounded"
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? "Скасувати" : "Запропонувати зміни"}
      </button>

      {editMode && (
        <div className="bg-gray-200 p-2 rounded mt-2">
          <h3 className="text-sm font-semibold mb-2">Позначте Доступність:</h3>
          {Object.entries(suggestedAccessibility).map(([key, value]) => (
            <label key={key} className="block text-sm mb-2 ">
              <input
                type="checkbox"
                className="mr-2"
                checked={value}
                onChange={() =>
                  toggleAccessibility(
                    key as keyof typeof suggestedAccessibility
                  )
                }
              />
              {key === "ramps" && "Пандуси"}
              {key === "adaptedToilets" && "Адаптовані туалети"}
              {key === "tactileElements" && "Тактильні елементи"}
              {key === "wideEntrance" && "Зручний вхід"}
              {key === "visualImpairmentFriendly" && "Для людей із вадами зору"}
              {key === "wheelchairAccessible" && "Для людей на візку"}
            </label>
          ))}

          <button
            className=" bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded "
            onClick={submitAccessibilityChanges}
          >
            Надіслати
          </button>
        </div>
      )}
    </div>
  );
}

export default SuggestChanges;