import React, { useEffect, useState } from "react";
import Header from "../Layouts/Header/Header";
import Footer from "../Layouts/Footer/Footer";
import ScrollTopButton from "../Layouts/ScrollTopButton/ScrollTopButton";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import ListCart from "../Layouts/Cart/ListCart";
import ListOrderMy from "../Layouts/Order/ListOrderMy";
import { motion } from "framer-motion";

const Cart = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      navigate("/signIn");
    }
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Header></Header>
      <div className="mt-[100px] screen__container h-[100vh]">
        <div>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Giỏ hàng của tôi" value="1" />
                <Tab label="Đơn hàng của tôi" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ListCart></ListCart>
            </TabPanel>
            <TabPanel value="2">
              <ListOrderMy></ListOrderMy>
            </TabPanel>
          </TabContext>
        </div>
      </div>
      <Footer></Footer>
      <ScrollTopButton></ScrollTopButton>
    </motion.div>
  );
};

export default Cart;
