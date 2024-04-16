import React from "react";
import { motion } from "framer-motion";
import Header from "../Layouts/Header/Header";
import NewsItem from "../Layouts/News/NewsItem";
import Footer from "../Layouts/Footer/Footer";
const News = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Header></Header>
      <div className="mt-[120px] mb-12">
        <NewsItem></NewsItem>
      </div>
      <Footer></Footer>
    </motion.div>
  );
};

export default News;
