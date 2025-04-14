// BusStopLayer.tsx
"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import busStopData from "@/data/bus-stopes.json";

// Іконка для звичайної зупинки автобуса
const busStopIcon = new L.Icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%230066cc' d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3Cpath fill='%23ffffff' d='M10 7h4v2h-4z'/%3E%3Cpath fill='%23ffffff' d='M12 5.5l2 2.5-2 2.5-2-2.5z'/%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Іконка для доступної зупинки автобуса
const accessibleBusStopIcon = new L.Icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23008800' d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3Cpath fill='%23ffffff' d='M10 7h4v2h-4z'/%3E%3Cpath fill='%23ffffff' d='M12 5.5l2 2.5-2 2.5-2-2.5z'/%3E%3Ccircle cx='12' cy='16' r='6' fill='%23008800' stroke='%23ffffff' stroke-width='1'/%3E%3Cpath fill='%23ffffff' d='M12 13c-0.8 0-1.5 0.7-1.5 1.5s0.7 1.5 1.5 1.5 1.5-0.7 1.5-1.5-0.7-1.5-1.5-1.5zm-2 4h4v1h-4z'/%3E%3Crect x='11' y='11.5' width='2' height='3' fill='%23ffffff'/%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export default function BusStopLayer() {
  return (
    <>
      {busStopData.busStops.map((busStop) => {
        // Перевірка чи зупинка має елементи доступності
        const isAccessible = busStop.facilities.ramp || 
                            busStop.facilities.tactilePaving ||
                            busStop.buses.some(bus => bus.disabilityAccess);
        
        return (
          <Marker
            key={busStop.id}
            position={busStop.position as [number, number]}
            icon={isAccessible ? accessibleBusStopIcon : busStopIcon}
          >
            <Popup>
              <div className="bus-stop-popup">
                <h3 className="font-bold text-lg">{busStop.name}</h3>
                
                <div className="facilities mt-2">
                  <h4 className="font-semibold">Зручності на зупинці:</h4>
                  <ul className="ml-4 list-disc">
                    {busStop.facilities.shelter && <li>Наявний навіс</li>}
                    {busStop.facilities.seating && <li>Наявні сидіння</li>}
                    {busStop.facilities.realTimeInfo && <li>Інформація в реальному часі</li>}
                    {busStop.facilities.tactilePaving && <li>Тактильна плитка</li>}
                    {busStop.facilities.ramp && <li>Пандус</li>}
                  </ul>
                </div>
                
                <div className="buses mt-3">
                  <h4 className="font-semibold">Доступні маршрути:</h4>
                  <ul className="space-y-2 mt-1">
                    {busStop.buses.map((bus) => (
                      <li key={bus.number} className="border-b pb-1">
                        <div className="flex items-center">
                          <span className="bg-blue-500 text-white font-bold px-2 py-1 rounded mr-2">
                            {bus.number}
                          </span>
                          <span>→ {bus.destination}</span>
                        </div>
                        {bus.disabilityAccess && (
                          <div className="text-sm mt-1">
                            <p className="text-green-600 font-semibold">Елементи доступності:</p>
                            <ul className="ml-4 list-disc">
                              {bus.lowFloor && <li>Низькопідлоговий автобус</li>}
                              {bus.visualAnnouncements && <li>Візуальні оголошення</li>}
                              {bus.tactileMarkings && <li>Тактильні позначки</li>}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}