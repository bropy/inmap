import React, { useEffect } from "react";
import { Rating } from "react-simple-star-rating";

function ReviewsList({
  place,
  setReviews,
    reviews,
}: {
  place: any;
  setReviews: (reviews: any[]) => void;
    reviews: any[];
}) {
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/reviews/?location_id=" + place?.id
      );
      const data = await response.json();
      setReviews(data);
    };
    fetchReviews();
  }, [place]);

  return (
    <>
      {reviews
        .filter((review) => review.location_id === place.id)
        .map((review) => (
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
            <p className="text-sm font-medium text-gray-700">
              {review.comment}
            </p>
          </div>
        ))}
    </>
  );
}


export default ReviewsList;