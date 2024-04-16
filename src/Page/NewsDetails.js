import React, { useEffect, useState } from "react";
import Header from "../Layouts/Header/Header";
import { useParams } from "react-router-dom";
import { fetchNewsById } from "../Api/apiNews";
import Footer from "../Layouts/Footer/Footer";
import { motion } from "framer-motion";

const NewsDetails = () => {
  const { slug } = useParams();
  const [dataNews, setDataNews] = useState();
  useEffect(() => {
    fetchNewsById(setDataNews, slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!dataNews) return;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Header></Header>
      <div className="mt-[120px] laptop:w-[70%] mobile:w-[90%] mx-auto news__details pb-12">
        <h1 className="text-center font-bold text-[27px] mb-5">
          {dataNews.NewsTitle}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: dataNews.NewsContent }}></div>
      </div>
      <Footer></Footer>
    </motion.div>
  );
};

export default NewsDetails;
