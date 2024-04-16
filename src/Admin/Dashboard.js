import React from "react";
import HeaderAdmin from "../Layouts/Header/HeaderAdmin";
import SidebarAdmin from "../Layouts/Sidebar/SidebarAdmin";
import CountUser from "./components/CountUser";
import CountOrder from "./components/CountOrder";
import CountCategory from "./components/CountCategory";
import CountProduct from "./components/CountProduct";

const Dashboard = () => {
  return (
    <>
      <div>
        <HeaderAdmin></HeaderAdmin>
        <div className="mt-7 flex">
          <SidebarAdmin></SidebarAdmin>
          <div className="flex justify-between gap-7">
            <CountUser title="Khách hàng"></CountUser>
            <CountCategory title="Danh mục sản phẩm"></CountCategory>
            <CountProduct title="Số lượng sản phẩm"></CountProduct>
            <CountOrder title="Tổng đơn hàng"></CountOrder>
            {/* <TotalDashboard title="Sản phẩm bán được"></TotalDashboard>
            <TotalDashboard title="Khách hàng"></TotalDashboard>
            <TotalDashboard title="Nhà cung cấp"></TotalDashboard> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
