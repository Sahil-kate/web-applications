import React from "react";
import { motion } from "framer-motion";
import "./Footer.scss";

function Footer() {
  return (
    <motion.div 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <hr />
        <div className="bottom">
          <motion.div 
            className="left"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>fiverr</h2>
            <span>© Fiverr International Ltd. {new Date().getFullYear()}</span>
          </motion.div>
          <motion.div 
            className="right"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="social">
              {[
                { icon: "twitter.png", url: "https://twitter.com/" },
                { icon: "facebook.png", url: "https://facebook.com/" },
                { icon: "linkedin.png", url: "https://linkedin.com/" },
                { icon: "pinterest.png", url: "https://pinterest.com/" },
                { icon: "instagram.png", url: "https://instagram.com/" }
              ].map((social, index) => (
                <motion.a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img src={`/img/${social.icon}`} alt={social.icon.split('.')[0]} />
                </motion.a>
              ))}
            </div>
            <motion.div 
              className="link"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src="/img/language.png" alt="language" />
              <span>English</span>
            </motion.div>
            <motion.div 
              className="link"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src="/img/coin.png" alt="currency" />
              <span>USD</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Footer;
