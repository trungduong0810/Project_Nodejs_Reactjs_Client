import React from "react";
import HeaderAdmin from "../Layouts/Header/HeaderAdmin";
import SidebarAdmin from "../Layouts/Sidebar/SidebarAdmin";
import TitleAdmin from "./components/TitleAdmin";
import ListUser from "./components/ListUser";

const ManageUser = () => {
  return (
    <div>
      <div>
        <HeaderAdmin></HeaderAdmin>
        <div className="mt-7 flex">
          <SidebarAdmin></SidebarAdmin>
          <div className="w-[75%]">
            <TitleAdmin title="Danh sách khách hàng"></TitleAdmin>
            <ListUser></ListUser>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
