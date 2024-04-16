import React from "react";
import HeaderAdmin from "../Layouts/Header/HeaderAdmin";
import SidebarAdmin from "../Layouts/Sidebar/SidebarAdmin";
import FormAddProduct from "./components/FormAddProduct";
const AddProduct = () => {
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="mt-7 flex w-full pb-16">
        <SidebarAdmin></SidebarAdmin>
        <FormAddProduct></FormAddProduct>
      </div>
    </div>
  );
};

export default AddProduct;
