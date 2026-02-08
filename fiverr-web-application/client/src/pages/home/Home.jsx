import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

function Home() {
  return (
    <motion.div 
      className="home"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Featured />
      <TrustedBy />
      
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>

      <motion.div 
        className="features"
        variants={itemVariants}
      >
        <div className="container">
          <motion.div 
            className="item"
            variants={itemVariants}
          >
            <h1>A whole world of freelance talent at your fingertips</h1>
            {[
              {
                title: "The best for every budget",
                description: "Find high-quality services at every price point. No hourly rates, just project-based pricing."
              },
              {
                title: "Quality work done quickly",
                description: "Find the right freelancer to begin working on your project within minutes."
              },
              {
                title: "Protected payments, every time",
                description: "Always know what you will pay upfront. Your payment is not released until you approve the work."
              },
              {
                title: "24/7 support",
                description: "Find high-quality services at every price point. No hourly rates, just project-based pricing."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover={{ x: 10 }}
              >
                <div className="title">
                  <img src="./img/check.png" alt="" />
                  {item.title}
                </div>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="item"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <video 
              src="./img/video.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="explore"
        variants={itemVariants}
      >
        <div className="container">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Explore the marketplace
          </motion.h1>
          <div className="items">
            {[
              {
                icon: "graphics-design.d32a2f8.svg",
                title: "Graphics & Design"
              },
              {
                icon: "online-marketing.74e221b.svg",
                title: "Digital Marketing"
              },
              {
                icon: "writing-translation.32ebe2e.svg",
                title: "Writing & Translation"
              },
              {
                icon: "video-animation.f0d9d71.svg",
                title: "Video & Animation"
              },
              {
                icon: "music-audio.320af20.svg",
                title: "Music & Audio"
              },
              {
                icon: "programming.9362366.svg",
                title: "Programming & Tech"
              },
              {
                icon: "business.bbdf319.svg",
                title: "Business"
              },
              {
                icon: "lifestyle.745b575.svg",
                title: "Lifestyle"
              },
              {
                icon: "data.718910f.svg",
                title: "Data"
              },
              {
                icon: "photography.01cf943.svg",
                title: "Photography"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="item"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <img
                  src={`https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/${item.icon}`}
                  alt={item.title}
                />
                <div className="line"></div>
                <span>{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="features dark"
        variants={itemVariants}
      >
        <div className="container">
          <motion.div 
            className="item"
            variants={itemVariants}
          >
            <h1>
              fiverr <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            {[
              "Connect to freelancers with proven business experience",
              "Get matched with the perfect talent by a customer success manager",
              "Manage teamwork and boost productivity with one powerful workspace"
            ].map((text, index) => (
              <motion.div 
                key={index}
                className="title"
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <img src="./img/check.png" alt="" />
                {text}
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Fiverr Business
            </motion.button>
          </motion.div>
          <motion.div 
            className="item"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt="Fiverr Business"
            />
          </motion.div>
        </div>
      </motion.div>

      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </motion.div>
  );
}

export default Home;
