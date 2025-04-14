import { Place } from '@/data/places';

function AccessibilityInfo({place}: {place: Place}) {
    
  return (
    <>
      <table className="w-full bg-gray-200 text-sm text-black rounded-lg">
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="px-2 py-1 w-6">
              {place.accessibility.ramps ? "✅" : "❌"}
            </td>
            <td className="px-2 py-1">Пандуси</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-2 py-1">
              {place.accessibility.adaptedToilets ? "✅" : "❌"}
            </td>
            <td className="px-2 py-1">Адаптовані туалети</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-2 py-1">
              {place.accessibility.tactileElements ? "✅" : "❌"}
            </td>
            <td className="px-2 py-1">Тактильні елементи</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-2 py-1">
              {place.accessibility.wideEntrance ? "✅" : "❌"}
            </td>
            <td className="px-2 py-1">Зручний вхід</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-2 py-1">
              {place.accessibility.visualImpairmentFriendly ? "✅" : "❌"}
            </td>
            <td className="px-2 py-1">Для людей із вадами зору</td>
          </tr>
          <tr>
            <td className="px-2 py-1">
              {place.accessibility.wheelchairAccessible ? "✅" : "❌"}
            </td>
            <td className="px-2 py-1">Для людей на візку</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default AccessibilityInfo;