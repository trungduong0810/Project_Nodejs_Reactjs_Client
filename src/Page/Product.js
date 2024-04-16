import React from "react";
import Header from "../Layouts/Header/Header";
import SelectProduct from "../Layouts/Product/SelectProduct";
import AllProduct from "../Layouts/Product/AllProduct";
import Footer from "../Layouts/Footer/Footer";
import { motion } from "framer-motion";
import Search from "../Layouts/Search/Search";
import ModalCoupons from "../components/Modal/ModalCoupons";

const Product = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Header></Header>
      <div className="mt-[100px] screen__container flex items-center justify-center">
        <Search></Search>
      </div>
      <ModalCoupons></ModalCoupons>
      <div className="screen__container laptop:flex laptop:flex-row laptop:gap-10 mobile:flex mobile:flex-col mobile:gap-5  py-12">
        <SelectProduct></SelectProduct>
        <AllProduct></AllProduct>
      </div>
      <Footer></Footer>
    </motion.div>
  );
};

export default Product;
