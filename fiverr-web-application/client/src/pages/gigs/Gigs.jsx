import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../components/loader/Loader";
import { FiChevronDown } from "react-icons/fi";
import apiService from "../../utils/apiService";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const menuRef = useRef();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const currentCategory = params.get("cat");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", currentCategory, sort],
    queryFn: async () => {
      const queryParams = {
        ...(currentCategory && { cat: currentCategory }),
        ...(minRef.current?.value && { min: minRef.current.value }),
        ...(maxRef.current?.value && { max: maxRef.current.value }),
        ...(sort && { sort }),
      };
      console.log('Fetching gigs with params:', queryParams);
      try {
        const response = await apiService.gigs.getAll(queryParams);
        console.log('API Response:', response);
        return response;
      } catch (err) {
        console.error('Error fetching gigs:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  useEffect(() => {
    console.log('Query results:', { 
      isLoading, 
      error: error ? {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      } : null, 
      dataLength: data?.length,
      data 
    });
  }, [isLoading, error, data]);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    refetch();
  }, [sort, currentCategory]);

  const apply = () => {
    refetch();
  };

  const sortOptions = [
    { value: "createdAt", label: "Newest" },
    { value: "sales", label: "Best Selling" },
    { value: "popular", label: "Popular" }
  ];

  return (
    <motion.div 
      className="gigs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.span className="breadcrumbs" initial={{ x: -50 }} animate={{ x: 0 }}>
          Fiverr &gt; {currentCategory || "All Categories"}
        </motion.span>
        <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }}>
          {currentCategory ? `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Gigs` : "All Gigs"}
        </motion.h1>
        <motion.p initial={{ y: 20 }} animate={{ y: 0 }}>
          Explore the boundaries of art and technology with Fiverr AI artists
        </motion.p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <motion.input 
              ref={minRef} 
              type="number" 
              placeholder="Min" 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileFocus={{ scale: 1.05, borderColor: "#1dbf73" }}
            />
            <motion.input 
              ref={maxRef} 
              type="number" 
              placeholder="Max" 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileFocus={{ scale: 1.05, borderColor: "#1dbf73" }}
            />
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={apply}
            >
              Apply
            </motion.button>
          </div>
          <div className="right" ref={menuRef}>
            <span className="sortBy">Sort by</span>
            <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span className="sortType">
                {sortOptions.find(option => option.value === sort)?.label}
              </span>
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown />
              </motion.div>
            </div>
            <AnimatePresence>
              {open && (
                <motion.div 
                  className="rightMenu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {sortOptions.map((option) => (
                    <span
                      key={option.value}
                      onClick={() => reSort(option.value)}
                      style={{
                        backgroundColor: sort === option.value ? '#f0f0f0' : 'transparent'
                      }}
                    >
                      {option.label}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="cards">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="error-message">
              <h3>Something went wrong!</h3>
              <p>{error.message}</p>
              <button onClick={() => refetch()}>Try Again</button>
            </div>
          ) : data?.length === 0 ? (
            <div className="no-results">
              <h3>No gigs found</h3>
              <p>Try adjusting your search criteria or browse all categories</p>
            </div>
          ) : (
            data?.map((gig) => (
              <motion.div 
                key={gig._id} 
                initial={{ scale: 0.9 }} 
                animate={{ scale: 1 }} 
                whileHover={{ scale: 1.02 }}
              >
                <GigCard item={gig} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Gigs;
