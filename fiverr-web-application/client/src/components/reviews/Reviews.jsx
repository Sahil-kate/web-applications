import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reviews = ({ gigId }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("5");
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        throw new Error("Please login to submit a review");
      }
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      toast.success("Review submitted successfully!");
      setReviewText("");
      setRating("5");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message || "Something went wrong!");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      toast.error("Please write your review before submitting");
      return;
    }
    mutation.mutate({ gigId, desc: reviewText, star: parseInt(rating) });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      <div className="review-list">
        {isLoading ? (
          <div className="loading">Loading reviews...</div>
        ) : error ? (
          <div className="error">Error loading reviews. Please try again later.</div>
        ) : data?.length === 0 ? (
          <div className="no-reviews">No reviews yet. Be the first to review!</div>
        ) : (
          data.map((review) => <Review key={review._id} review={review} />)
        )}
      </div>
      <div className="add">
        <h3>Add a review</h3>
        <form className="addForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <select 
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Submitting..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
