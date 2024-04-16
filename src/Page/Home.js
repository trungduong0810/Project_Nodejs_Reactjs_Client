import React from "react";
import Header from "../Layouts/Header/Header";
import { Banner } from "../Layouts/Banner/Banner";
import ProductOutstanding from "../Layouts/Product/ProductOutstanding";
import { BannerDiscount } from "../Layouts/Banner/BannerDiscount";
import News from "../Layouts/News/NewsScroll";
import Footer from "../Layouts/Footer/Footer";
import { motion } from "framer-motion";
import ProductShirtMen from "../Layouts/Product/ProductShirtMen";
import ProductPantsMen from "../Layouts/Product/ProductPantsMen";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Header></Header>
      <Banner></Banner>
      <ProductOutstanding></ProductOutstanding>
      <ProductShirtMen></ProductShirtMen>
      <ProductPantsMen></ProductPantsMen>
      <BannerDiscount></BannerDiscount>
      <News></News>
      <Footer></Footer>
    </motion.div>
  );
};

export default Home;
