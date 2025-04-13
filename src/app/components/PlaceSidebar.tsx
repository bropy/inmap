'use client';

import { Place } from '@/data/places';
import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";  
import { Review } from "@/data/review";

export default function PlaceSidebar({
  place,
  onClose,
}: {
  place: Place;
  onClose: () => void;
}) {
  var [review, setReview] = useState({
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    setReview({
      rating: 0,
      comment: "",
    });
  }, [place]);

  const SendReview = () => {
    const newId = Math.max(...Review.map((r) => r.id)) + 1;

    Review.unshift({
      id: newId,
      placeId: place.id,
      userName: "User",
      rating: review.rating,
      comment: review.comment,
    });
    

    setReview({
      rating: -1,
      comment: "",
    });
  }

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
        src={place.image}
        className="w-full h-48 object-cover bg-amber-50 mb-4 rounded-lg"
        alt={place.name + " Image"}
      />

      <div className="bg-gray-200 p-2 mb-4 rounded-lg">
        <p className="text-gray-700 ">{place.description}</p>
      </div>

      <ul className="bg-gray-200 p-2 space-y-1 text-sm text-black rounded-lg">
        <li>{place.accessibility.ramps ? "✅ Є " : "❌ Нема "}Пандуси</li>
        <li>
          {place.accessibility.adaptedToilets ? "✅ Є" : "❌ Нема"} Адаптовані
          туалети
        </li>
        <li>
          {place.accessibility.tactileElements ? "✅ Є " : "❌ Нема "}
          Тактильні елементи
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
      {review.rating != -1 && (
          <div className="flex justify-center flex-wrap gap-1 mt-4 w-full rounded-lg bg-gray-200 p-2">
            <textarea
              onInput={(e: any) => {
                e.style.height = "1px";
                e.style.height = e.scrollHeight + "px";
              }}
              placeholder="Напишіть відгук"
              className="border border-gray-300 text-black rounded px-2 py-1 w-full mb-2 h-full mr-1 overflow-hidden resize-none min-h-8"
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
            />

            {review.comment.trim() !== "" && (
              <>
                <Rating
                  initialValue={review.rating}
                  SVGstyle={{ display: "inline" }}
                  onClick={(rate: number) => {
                    setReview({ ...review, rating: rate });
                  }}
                />
                {review.rating > 0 && (
                  <button
                    className="w-full bg-gray-400 hover:bg-gray-500 transition text-black px-4 py-2 rounded h-full cursor-pointer"
                    onClick={SendReview}
                  >
                    Надіслати
                  </button>
                )}
              </>
            )}
          </div>
      )}

      {Review.filter((review) => review.placeId === place.id).map((review) => (
        <div className="mt-4 w-full bg-gray-100 p-2 rounded mb-2">
          <div className="flex items-center mb-2 h-8 justify-between">
            <h3 className="text-sm font-semibold text-gray-800 pr-2">
              {review.userName}
            </h3>
            <Rating
              initialValue={review.rating}
              allowHover={false}
              SVGstyle={{ display: "inline" }}
              size={16}
            />
          </div>
          <p className="text-sm font-medium text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
