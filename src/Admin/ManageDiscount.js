import React from "react";
import HeaderAdmin from "../Layouts/Header/HeaderAdmin";
import SidebarAdmin from "../Layouts/Sidebar/SidebarAdmin";
import TitleAdmin from "./components/TitleAdmin";
import ListDiscount from "./components/ListDiscount";
import ButtonGlobal from "../components/button/ButtonGlobal";

const ManageDiscount = () => {
  return (
    <>
      <div>
        <HeaderAdmin></HeaderAdmin>
        <div className="mt-7 flex">
          <SidebarAdmin></SidebarAdmin>
          <div className=" w-full">
            <div className="flex w-[99%] gap-10">
              <TitleAdmin title="Danh sách mã giảm giá"></TitleAdmin>
              <ButtonGlobal
                color="success"
                to="/admin/addDiscount"
                style={{
                  height: "50px",
                  fontSize: "16px",
                  lineHeight: "50px",
                  width: "200px",
                }}
              >
                thêm mã Giảm giá
              </ButtonGlobal>
            </div>
            <div className="w-[99%]">
              <ListDiscount></ListDiscount>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageDiscount;
