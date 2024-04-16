import React from "react";
import Header from "../Layouts/Header/Header";
import FormContact from "../Layouts/FormContact/FormContact";
import Footer from "../Layouts/Footer/Footer";
import Map from "../Layouts/Map/Map";
import { motion } from "framer-motion";
const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Header></Header>
      <div className="mt-[150px] h-[100vh] screen__container flex flex-col gap-12">
        <FormContact></FormContact>
        <Map></Map>
      </div>
      <div className="mt-[60vh]">
        <Footer></Footer>
      </div>
    </motion.div>
  );
};

export default Contact;
