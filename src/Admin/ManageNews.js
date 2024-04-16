import React from "react";
import HeaderAdmin from "../Layouts/Header/HeaderAdmin";
import SidebarAdmin from "../Layouts/Sidebar/SidebarAdmin";
import TitleAdmin from "./components/TitleAdmin";
import ListNews from "./components/ListNews";

const ManageNews = () => {
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="mt-7 flex">
        <SidebarAdmin></SidebarAdmin>
        <div className=" w-full">
          <div className="flex flex-col w-[99%]">
            <TitleAdmin title="Danh sách tin tức"></TitleAdmin>
            <ListNews></ListNews>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageNews;
