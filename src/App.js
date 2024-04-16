import React from "react";
import "./App.css";
import RouterApp from "./Router/routerApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from "./Layouts/Chat/ChatBox";
import ScrollTopButton from "./Layouts/ScrollTopButton/ScrollTopButton";

function App() {
  return (
    <div>
      <RouterApp></RouterApp>
      <ToastContainer />
      <ChatBox></ChatBox>
      <ScrollTopButton></ScrollTopButton>
    </div>
  );
}

export default App;
