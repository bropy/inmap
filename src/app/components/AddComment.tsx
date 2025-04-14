import React, { useEffect, useState } from "react";
import { Place } from "@/data/places";
import { Review } from "@/data/review";
import { Rating } from "react-simple-star-rating";


function AddComment({place, reviews, setReviews}: {place: Place, reviews: Review[], setReviews: React.Dispatch<React.SetStateAction<Review[]>>}) {

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
    const newId = Math.max(...reviews.map((r) => r.id)) + 1;

    var newReview = {
      id: newId,
      location_id: place.id,
      userName: "User",
      user: 0,
      rating: review.rating,
      comment: review.comment,
    };

    setReviews([newReview, ...reviews]);

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
      console.log(
        "Response:",
        JSON.stringify({
          location_id: place.id,
          rating: review.rating,
          comment: review.comment,
        })
      );
      if (!response.ok) {
        console.error("Помилка надсилання відгуку:", await response.text());
      }
    };
    sendReview();

    setReview({
      rating: -1,
      comment: "",
    });
  };

  return (
    <>
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
      </>
    );  
}

export default AddComment;