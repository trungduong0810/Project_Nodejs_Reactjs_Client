import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SignIn from "../Page/SignIn";
import SignUp from "../Page/SignUp";
import Home from "../Page/Home";
import { AnimatePresence } from "framer-motion";
import Introduce from "../Page/Introduce";
import News from "../Page/News";
import Product from "../Page/Product";
import Contact from "../Page/Contact";
import Cart from "../Page/Cart";
import ProductDetails from "../Page/ProductDetails";
import Dashboard from "../Admin/Dashboard";
import AddProduct from "../Admin/AddProduct";
import Category from "../Admin/Category";
import ManageUser from "../Admin/ManageUser";
import ManageProduct from "../Admin/ManageProduct";
import PayMent from "../Page/PayMent";
import ManageOrders from "../Admin/ManageOrders";
import AddNews from "../Admin/AddNews";
import ManageNews from "../Admin/ManageNews";
import NewsDetails from "../Page/NewsDetails";
import ReviewProduct from "../Page/ReviewProduct";
import AddDiscount from "../Admin/AddDiscount";
import ManageDiscount from "../Admin/ManageDiscount";
import ChatBox from "../Admin/ChatBox";
import PolicyWarranty from "../Page/PolicyWarranty";
import PolicyChangeProduct from "../Page/PolicyChangeProduct";
import PolicySecurityInfo from "../Page/PolicySecurityInfo";

const RouterApp = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/introduce" element={<Introduce></Introduce>}></Route>
        <Route path="/product" element={<Product></Product>}></Route>
        <Route
          path="/productDetails/:slug"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="/news" element={<News></News>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/signIn" element={<SignIn></SignIn>}></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route path="/payment" element={<PayMent></PayMent>}></Route>
        <Route
          path="/newsDetails/:slug"
          element={<NewsDetails></NewsDetails>}
        ></Route>

        <Route
          path="/reviews/product/:slug"
          element={<ReviewProduct></ReviewProduct>}
        ></Route>
        <Route path="/policyWarranty" element={<PolicyWarranty></PolicyWarranty>}></Route>
        <Route path="/policyChangeProduct" element={<PolicyChangeProduct></PolicyChangeProduct>}></Route>
        <Route path="/policySecurityInfo" element={<PolicySecurityInfo></PolicySecurityInfo>}></Route>


        {/* Admin  */}
        <Route
          path="/admin/dashboard"
          element={<Dashboard></Dashboard>}
        ></Route>
        <Route
          path="/admin/addProduct"
          element={<AddProduct></AddProduct>}
        ></Route>
        <Route path="/admin/category" element={<Category></Category>}></Route>
        <Route
          path="/admin/manage/user"
          element={<ManageUser></ManageUser>}
        ></Route>
        <Route
          path="/admin/manage/product"
          element={<ManageProduct></ManageProduct>}
        ></Route>
        <Route
          path="/admin/manage/order"
          element={<ManageOrders></ManageOrders>}
        ></Route>
        <Route path="/admin/addNews" element={<AddNews></AddNews>}></Route>
        <Route
          path="/admin/manage/news"
          element={<ManageNews></ManageNews>}
        ></Route>
        <Route
          path="/admin/addDiscount"
          element={<AddDiscount></AddDiscount>}
        ></Route>
        <Route
          path="/admin/manage/discount"
          element={<ManageDiscount></ManageDiscount>}
        ></Route>
        <Route
          path="/admin/manage/message"
          element={<ChatBox></ChatBox>}
        ></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default RouterApp;
