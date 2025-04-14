'use client';

import { Place } from '@/data/places';
import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";  
import { Review } from "@/data/review";
import AccessibilityInfo  from "./AccessibilityInfo";
import ReviewsList from './ReviewsList';

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

  const [editMode, setEditMode] = useState(false);
  const [suggestedAccessibility, setSuggestedAccessibility] = useState(
    place.accessibility
  );

  const [reviews, setReviews] = useState<Review[]>([]);

  const toggleAccessibility = (key: keyof typeof suggestedAccessibility) => {
    setSuggestedAccessibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const submitAccessibilityChanges = () => {
    //надіслати пропозицію на сервер
  };


  const SendReview = () => { 
    const newId = Math.max(...reviews.map((r) => r.id)) + 1;

    var newReview = {
      id: newId,
      location_id: place.id,
      userName: "User",
      user: 0,
      rating: review.rating,
      comment: review.comment,
    };

    reviews.unshift(newReview);

    const sendReview = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          location_id: place.id,
          rating: review.rating,
          comment: review.comment,
        }),
        
      });
      console.log("Response:", JSON.stringify({
        location_id: place.id,
        rating: review.rating,
        comment: review.comment,
      }));
      if (!response.ok) {
        console.error("Помилка надсилання відгуку:", await response.text());
      }
    };
    sendReview();

      setReview({
        rating: -1,
        comment: "",
      });
  }

  return (
    <div className="pb-16 fixed top-12 right-0 h-full w-80 bg-white shadow-lg z-[1001] p-4 overflow-y-auto transition-transform transform translate-x-0">
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
        src={place.image_url}
        className="w-full h-48 object-cover bg-amber-50 mb-4 rounded-lg"
        alt={place.name + " Image"}
      />
      <div className="bg-gray-200 p-2 mb-4 rounded-lg">
        <p className="text-gray-700 ">{place.description}</p>
      </div>
      <AccessibilityInfo place={place} />
      <div className="bg-gray-100 rounded mt-3">
        <button
          className="w-full bg-gray-400 text-white px-4 py-2 rounded"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Скасувати" : "Запропонувати зміни"}
        </button>

        {editMode && (
          <div className="bg-gray-200 p-2 rounded mt-2">
            <h3 className="text-sm font-semibold mb-2">
              Позначте Доступність:
            </h3>
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
                {key === "visualImpairmentFriendly" &&
                  "Для людей із вадами зору"}
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
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
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

      <ReviewsList place={place} setReviews={setReviews} reviews={reviews} />
    </div>
  );
}
