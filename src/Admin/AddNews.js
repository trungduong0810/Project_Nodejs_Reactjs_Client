import React from "react";
import HeaderAdmin from "../Layouts/Header/HeaderAdmin";
import SidebarAdmin from "../Layouts/Sidebar/SidebarAdmin";
import FormAddNews from "./components/FormAddNew";

const AddNews = () => {
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="mt-7 flex w-full pb-16">
        <SidebarAdmin></SidebarAdmin>
        <FormAddNews></FormAddNews>
      </div>
    </div>
  );
};

export default AddNews;
