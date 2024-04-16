import React from "react";
import HeaderAdmin from "../Layouts/Header/HeaderAdmin";
import SidebarAdmin from "../Layouts/Sidebar/SidebarAdmin";
import TitleAdmin from "./components/TitleAdmin";
import ListProducts from "./components/ListProducts";

const ManageProduct = () => {
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="mt-7 flex">
        <SidebarAdmin></SidebarAdmin>
        <div className="flex flex-col w-full">
          <div className="flex w-[99%] gap-10">
            <TitleAdmin title="Danh sách sản phẩm"></TitleAdmin>
          </div>
          <div className="w-[99%]">
            <ListProducts></ListProducts>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
