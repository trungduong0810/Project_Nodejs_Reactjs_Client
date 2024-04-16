import React from "react";
import HeaderAdmin from "../Layouts/Header/HeaderAdmin";
import SidebarAdmin from "../Layouts/Sidebar/SidebarAdmin";
import FormAddDiscount from "./components/FormAddDiscount";

const AddDiscount = () => {
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="mt-7 flex w-full pb-16">
        <SidebarAdmin></SidebarAdmin>
        <FormAddDiscount></FormAddDiscount>
      </div>
    </div>
  );
};

export default AddDiscount;
