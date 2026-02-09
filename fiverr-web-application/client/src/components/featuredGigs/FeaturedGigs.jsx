import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FeaturedGigs.scss';
import { Link } from 'react-router-dom';

const featuredGigs = [
  {
    id: 1,
    title: "Professional Website Design",
    seller: "Anna Bell",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    category: "Web Design",
    description: "Custom responsive websites with modern UI/UX",
    rating: 5.0,
    reviews: 182
  },
  {
    id: 2,
    title: "Creative Logo Design",
    seller: "Morton Green",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60",
    category: "Logo Design",
    description: "Unique and memorable brand identity design",
    rating: 4.9,
    reviews: 143
  },
  {
    id: 3,
    title: "Motion Graphics & Animation",
    seller: "Emmett Potter",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60",
    category: "Animation",
    description: "Engaging animated content for your brand",
    rating: 4.8,
    reviews: 97
  },
  {
    id: 4,
    title: "Product Packaging Design",
    seller: "Freddie Johnston",
    image: "https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=800&auto=format&fit=crop&q=60",
    category: "Packaging",
    description: "Eye-catching packaging solutions",
    rating: 4.9,
    reviews: 156
  }
];

const FeaturedGigs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => 
          prevIndex === featuredGigs.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return featuredGigs.length - 1;
      if (nextIndex >= featuredGigs.length) return 0;
      return nextIndex;
    });
  };

  return (
    <motion.div 
      className="featured-gigs"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="featured-header"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Featured Services</h2>
        <p>Handpicked top-rated professionals for your next project</p>
      </motion.div>
      
      <div 
        className="gigs-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false} custom={1} mode="wait">
          <motion.div
            key={currentIndex}
            className="featured-gig-card"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <Link to={`/gig/${featuredGigs[currentIndex].id}`} className="gig-link">
              <div className="gig-image">
                <img src={featuredGigs[currentIndex].image} alt={featuredGigs[currentIndex].title} />
                <div className="category-tag">{featuredGigs[currentIndex].category}</div>
              </div>
              
              <div className="gig-content">
                <div className="seller-info">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${featuredGigs[currentIndex].seller}`} 
                    alt={featuredGigs[currentIndex].seller} 
                    className="seller-avatar"
                  />
                  <span className="seller-name">{featuredGigs[currentIndex].seller}</span>
                </div>
                
                <h3 className="gig-title">{featuredGigs[currentIndex].title}</h3>
                <p className="gig-description">{featuredGigs[currentIndex].description}</p>
                
                <div className="gig-footer">
                  <div className="rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-count">
                      {featuredGigs[currentIndex].rating} ({featuredGigs[currentIndex].reviews})
                    </span>
                  </div>
                  <motion.button 
                    className="view-details"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FeaturedGigs; 