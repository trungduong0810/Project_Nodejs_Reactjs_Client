import React, { useState } from "react";
import HeaderAdmin from "../Layouts/Header/HeaderAdmin";
import SidebarAdmin from "../Layouts/Sidebar/SidebarAdmin";
import TitleAdmin from "./components/TitleAdmin";
import ListCategory from "./components/ListCategory";
import ModalAddCategory from "./components/ModalAddCategory";

const Category = () => {
  const [dataChanged, setDataChanged] = useState(false);
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="mt-7 flex">
        <SidebarAdmin></SidebarAdmin>
        <div className="flex flex-col w-full">
          <div className="flex w-[99%] gap-10">
            <TitleAdmin title="Danh sách danh mục"></TitleAdmin>
            <ModalAddCategory
              titleButton="Thêm danh mục"
              eventPost={setDataChanged}
            ></ModalAddCategory>
          </div>
          <div className="w-[99%]">
            <ListCategory
              dataChange={dataChanged}
              addData={setDataChanged}
            ></ListCategory>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
