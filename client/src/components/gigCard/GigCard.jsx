import React, { useState } from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { motion } from "framer-motion";
import { FiStar, FiHeart, FiClock, FiRefreshCw } from "react-icons/fi";

const GigCard = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  const rating = !isNaN(item.totalStars / item.starNumber)
    ? Math.round((item.totalStars / item.starNumber) * 10) / 10
    : 0;

  const handleLikeClick = (e) => {
    e.preventDefault(); // Prevent navigation
    setIsLiked(!isLiked);
  };

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <motion.div 
        className="gigCard"
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
      >
        <div className="image-container">
          <img src={item.cover} alt={item.title} />
          <div className="overlay">
            <span className="category">{item.cat}</span>
          </div>
        </div>
        <div className="info">
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : error ? (
            <div className="error-message">Error loading seller info</div>
          ) : (
            <div className="user">
              <img 
                src={data.img || "/img/noavatar.jpg"} 
                alt={data.username}
                className="user-avatar" 
              />
              <div className="user-info">
                <span className="username">{data.username}</span>
                <span className="level">{data.level || "New Seller"}</span>
              </div>
            </div>
          )}
          <h3 className="title">{item.title}</h3>
          <p className="description">{item.shortDesc || item.desc}</p>
          <div className="stats">
            <div className="rating">
              <FiStar className={rating > 0 ? "star-icon active" : "star-icon"} />
              <span>{rating > 0 ? rating : "New"}</span>
              <span className="reviews">({item.starNumber || 0})</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="detail">
          <div className="gig-meta">
            <div className="delivery">
              <FiClock className="icon" />
              <span>{item.deliveryTime} Days Delivery</span>
            </div>
            <div className="revisions">
              <FiRefreshCw className="icon" />
              <span>{item.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="bottom">
            <motion.button
              className={`like-button ${isLiked ? 'liked' : ''}`}
              onClick={handleLikeClick}
              whileTap={{ scale: 0.9 }}
            >
              <FiHeart className="heart-icon" />
            </motion.button>
            <div className="price">
              <span>STARTING AT</span>
              <h2>${item.price}</h2>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default GigCard;
