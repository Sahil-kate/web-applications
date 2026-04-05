import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Featured.scss";

const images = [
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=60",
    title: "Team Collaboration"
  },
  {
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&auto=format&fit=crop&q=60",
    title: "Professional Workspace"
  },
  {
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&fit=crop&q=60",
    title: "Digital Solutions"
  },
  {
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=60",
    title: "Modern Office"
  }
];

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSearch = () => {
    if (input.trim() !== "") {
      navigate(`/gigs?search=${input}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategoryClick = (category) => {
    setInput(category);
    navigate(`/gigs?search=${category}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="featured"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="slider-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${image.url})` }}
          />
        ))}
        <div className="background-overlay" />
      </div>
      
      <div className="container">
        {/* Left Section */}
        <motion.div
          className="left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Find the perfect <span>freelance</span> services for your business
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            className="search"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "building a mobile app"'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ color: "black" }}
              />
            </div>
            <motion.button
              onClick={handleSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search
            </motion.button>
          </motion.div>

          {/* Popular Categories */}
          <motion.div
            className="popular"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span>Popular:</span>
            {["Web Design", "WordPress", "Logo Design", "AI Services"].map(
              (category) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9 }}
                >
                  {category}
                </motion.button>
              )
            )}
          </motion.div>
        </motion.div>

        {/* Right Section (Image) */}
        
      </div>
    </motion.div>
  );
}

export default Featured;
