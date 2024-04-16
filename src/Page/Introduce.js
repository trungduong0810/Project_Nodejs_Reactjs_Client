import React from "react";
import Header from "../Layouts/Header/Header";
import IntroduceShop from "../Layouts/Introduce/IntroduceShop";
import Footer from "../Layouts/Footer/Footer";
import { motion } from "framer-motion";

const Introduce = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Header></Header>
      <IntroduceShop></IntroduceShop>
      <Footer></Footer>
    </motion.div>
  );
};

export default Introduce;
