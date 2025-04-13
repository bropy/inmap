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

      <div className="relative bg-gray-300 rounded-2xl px-2 py-2 pr-6 mb-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-black">{place.name}</h2>

        <button
          onClick={onClose}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-black text-xl"
          >
            ✖
        </button>
      </div>


      <img
        src="/###.jpg"
        className="w-full h-48 object-cover bg-amber-50 mb-4 rounded-l-lg"
        alt={place.name + " Image"}
      />

      <div className='bg-gray-200 p-2 mb-4'>
        <p className="text-gray-700 ">{"place.description"}</p>
      </div>

      <ul className="bg-gray-200 p-2 space-y-1 text-sm text-black">
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
          className="border border-gray-300 text-black rounded px-2 py-1 w-full mb-2 h-full mr-1"
        />
        <button className="bg-gray-400 hover:bg-gray-500 transition text-black px-4 py-2 rounded h-full cursor-pointer">
          Надіслати
        </button>
      </div>
      <div className="mt-4 w-full bg-gray-100 p-2 rounded mb-2">
        <p className="text-sm font-medium text-gray-700">{"Відгук"}</p>
      </div>
    </div>
  );
}
