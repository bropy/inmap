'use client';

import { Place } from '@/data/places';
import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";  
import { Review } from "@/data/review";
import AccessibilityInfo  from "./AccessibilityInfo";
import ReviewsList from './ReviewsList';
import SuggestChanges from './SuggestChanges';
import AddComment from './AddComment';

export default function PlaceSidebar({
  place,
  onClose,
}: {
  place: Place;
  onClose: () => void;
}) {

  const [reviews, setReviews] = useState<Review[]>([]);

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
      <SuggestChanges place={place} />
      <AddComment place={place} setReviews={setReviews} reviews={reviews}  />
      <ReviewsList place={place} setReviews={setReviews} reviews={reviews} />
    </div>
  );
}
