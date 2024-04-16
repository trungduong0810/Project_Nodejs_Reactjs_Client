import React from "react";
import HeaderAdmin from "../Layouts/Header/HeaderAdmin";
import SidebarAdmin from "../Layouts/Sidebar/SidebarAdmin";
import TitleAdmin from "./components/TitleAdmin";
import ListOrders from "./components/ListOrders";

const ManageOrders = () => {
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="mt-7 flex">
        <SidebarAdmin></SidebarAdmin>
        <div className="flex flex-col w-full">
          <div className="flex w-[99%] gap-10">
            <TitleAdmin title="Danh sách đơn hàng"></TitleAdmin>
          </div>
          <div className="w-[99%]">
            <ListOrders></ListOrders>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
