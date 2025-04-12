'use client';

import { Place } from '@/data/places';
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";  


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

      <img
        className="w-full h-48 object-cover bg-amber-50 mb-2 rounded-l-lg"
        alt={place.name + " Image"}
      />

      <p className="text-gray-700 mb-2">{"place.description"}</p>

      <ul className="space-y-1 text-sm text-black">
        <li>Пандуси: {place.accessibility.ramps ? "✅ Є" : "❌ Нема"}</li>
        <li>
          Адаптовані туалети:{" "}
          {place.accessibility.adaptedToilets ? "✅ Є" : "❌ Нема"}
        </li>
        <li>
          Тактильні елементи:{" "}
          {place.accessibility.tactileElements ? "✅ Є" : "❌ Нема"}
        </li>
        <li>
          Зручний вхід: {place.accessibility.wideEntrance ? "✅ Є" : "❌ Нема"}
        </li>
        <li>
          Підходить для людей із вадами зору:{" "}
          {place.accessibility.visualImpairmentFriendly ? "✅ Так" : "❌ Ні"}
        </li>
        <li>
          Для людей на візку:{" "}
          {place.accessibility.wheelchairAccessible ? "✅ Так" : "❌ Ні"}
        </li>
      </ul>
      <div className="flex justify-center flex-row gap-1 mt-4 w-full">
        <Rating initialValue={3.5} SVGstyle={{ display: "inline" }} />
      </div>
      <div className="flex justify-center mt-4 h-10 w-full">
        <textarea
 
          placeholder="Напищіть відгук"
          className="border border-gray-300 rounded px-2 py-1 w-full mb-2 h-full mr-1"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded h-full">
          Надіслати
        </button>
      </div>
      <div className="mt-4 w-full bg-gray-100 p-2 rounded mb-2">
        <p className="text-sm">{"Відгук"}</p>
      </div>
    </div>
  );
}
